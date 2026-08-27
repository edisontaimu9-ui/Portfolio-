import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// "Ask Chakudya" — a floating chat widget that queries the real Chakudya
// Nutrition Registry RAG orchestrator (POST /rag/ask): intent detection ->
// fan-out search -> rerank -> grounded LLM answer with citations. Public +
// IP rate-limited server-side, but also capped client-side so a single
// visitor can't burn the whole daily budget alone: 5 real questions per
// rolling 24h, tracked in localStorage. Small talk (greetings, thanks, etc.)
// is answered locally and doesn't touch the API or the quota.
const ASK_ENDPOINT = 'https://chakudya-api.edisontaimu9.workers.dev/rag/ask'
const DAILY_LIMIT = 5
const WINDOW_MS = 24 * 60 * 60 * 1000
const USAGE_KEY = 'cnr_ask_usage'

const GREETING_RE = /^(hi+|hello+|hey+|yo|hiya|howdy|sup|good\s?(morning|afternoon|evening|day))[\s!.,]*$/i
const THANKS_RE = /^(thanks?( you)?|thx|ty|cheers|appreciate it|nice one|cool|great|awesome)[\s!.,]*$/i
const BYE_RE = /^(bye|goodbye|see\s?ya|later|good\s?night)[\s!.,]*$/i

function canned(query) {
  if (GREETING_RE.test(query)) {
    return "Hey! I'm Ask Chakudya — ask me a real nutrition question (foods, exchange lists, renal diets, formulas, packaged products) and I'll pull a live, cited answer straight from the registry."
  }
  if (THANKS_RE.test(query)) {
    return "You're welcome! Anything else you'd like to look up in the registry?"
  }
  if (BYE_RE.test(query)) {
    return 'Take care — come back anytime you have a nutrition question for the registry.'
  }
  return null
}

function loadUsage() {
  try {
    const raw = JSON.parse(localStorage.getItem(USAGE_KEY) || 'null')
    if (raw && typeof raw.count === 'number' && typeof raw.resetAt === 'number') {
      if (Date.now() >= raw.resetAt) return { count: 0, resetAt: Date.now() + WINDOW_MS }
      return raw
    }
  } catch { /* corrupt/missing — fall through to a fresh window */ }
  return { count: 0, resetAt: Date.now() + WINDOW_MS }
}

function saveUsage(usage) {
  try { localStorage.setItem(USAGE_KEY, JSON.stringify(usage)) } catch { /* storage unavailable — degrade to unlimited for this session */ }
}

// Minimal markdown: **bold**, *italic*, `code`, and "- " bullet lists.
// The LLM answer is plain-ish markdown; this avoids pulling in a full
// markdown dependency for a handful of inline styles.
function inlineFormat(str, keyPrefix) {
  const parts = []
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g
  let lastIndex = 0, match, i = 0
  while ((match = re.exec(str))) {
    if (match.index > lastIndex) parts.push(str.slice(lastIndex, match.index))
    if (match[2] !== undefined) parts.push(<strong key={`${keyPrefix}-b-${i++}`}>{match[2]}</strong>)
    else if (match[3] !== undefined) parts.push(<em key={`${keyPrefix}-i-${i++}`}>{match[3]}</em>)
    else if (match[4] !== undefined) parts.push(<code key={`${keyPrefix}-c-${i++}`}>{match[4]}</code>)
    lastIndex = re.lastIndex
  }
  if (lastIndex < str.length) parts.push(str.slice(lastIndex))
  return parts
}

function renderFormatted(text) {
  const lines = String(text || '').split('\n')
  const blocks = []
  let listBuffer = []
  const flushList = () => {
    if (listBuffer.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`}>
          {listBuffer.map((li, idx) => <li key={idx}>{inlineFormat(li, `li-${blocks.length}-${idx}`)}</li>)}
        </ul>
      )
      listBuffer = []
    }
  }
  lines.forEach((line, idx) => {
    const trimmed = line.trim()
    if (/^[-*]\s+/.test(trimmed)) {
      listBuffer.push(trimmed.replace(/^[-*]\s+/, ''))
    } else {
      flushList()
      if (trimmed) blocks.push(<p key={`p-${idx}`}>{inlineFormat(trimmed, `p-${idx}`)}</p>)
    }
  })
  flushList()
  return blocks
}

export default function AskCNR() {
  const [open, setOpen] = useState(false)
  const [usage, setUsage] = useState(loadUsage)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const logRef = useRef(null)

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, loading, open])

  const remaining = Math.max(0, DAILY_LIMIT - usage.count)
  const limitReached = remaining <= 0

  async function handleSend(e) {
    e.preventDefault()
    const query = input.trim()
    if (!query || loading) return

    setMessages((m) => [...m, { role: 'user', text: query }])
    setInput('')

    // Small talk never touches the API or the daily quota.
    const cannedReply = canned(query)
    if (cannedReply) {
      setMessages((m) => [...m, { role: 'assistant', text: cannedReply }])
      return
    }

    if (limitReached) return
    setLoading(true)

    const nextUsage = { ...usage, count: usage.count + 1 }
    setUsage(nextUsage)
    saveUsage(nextUsage)

    try {
      const res = await fetch(ASK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, context: 'both', top_k: 3 }),
      })

      if (res.status === 429) {
        setMessages((m) => [...m, {
          role: 'assistant',
          text: "The registry's own request cap kicked in — try again in a minute.",
        }])
      } else {
        const json = await res.json()
        if (json.status === 'success' && json.data) {
          setMessages((m) => [...m, {
            role: 'assistant',
            text: json.data.answer,
            // Only show citations when the answer actually drew on the
            // registry — an empty-candidate response already comes back
            // with sources: [] server-side, so this just mirrors that.
            sources: json.data.sources && json.data.sources.length > 0 ? json.data.sources : null,
          }])
        } else {
          setMessages((m) => [...m, {
            role: 'assistant',
            text: json.error || "Couldn't get an answer from the registry just now.",
          }])
        }
      }
    } catch {
      setMessages((m) => [...m, {
        role: 'assistant',
        text: "Couldn't reach the registry — check your connection and try again.",
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ask-cnr">
      <button
        type="button"
        className="ask-cnr-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close Ask Chakudya' : 'Open Ask Chakudya'}
        aria-expanded={open}
      >
        {open ? '✕' : '💬'}
        {!open && <span className="ask-cnr-fab-label">Ask Chakudya</span>}
      </button>

      {open && (
        <div className="ask-cnr-panel">
          <div className="ask-cnr-head">
            <span className="ask-cnr-title">Ask Chakudya</span>
            <span className="ask-cnr-sub">
              Live Q&amp;A against the Chakudya Nutrition Registry (CNR) — retrieval, reranking,
              and a grounded, cited answer, running right now.
            </span>
          </div>

          {messages.length > 0 && (
            <div className="ask-cnr-log" ref={logRef}>
              {messages.map((m, i) => (
                <div key={i} className={`ask-cnr-msg ask-cnr-msg-${m.role}`}>
                  {renderFormatted(m.text)}
                  {m.sources && (
                    <div className="ask-cnr-sources">
                      {m.sources.map((s) => (
                        <span key={s.id} className="ask-cnr-source-chip" title={s.source}>
                          [{s.id}] {s.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="ask-cnr-msg ask-cnr-msg-assistant ask-cnr-msg-loading">
                  <span className="ask-cnr-dot" /><span className="ask-cnr-dot" /><span className="ask-cnr-dot" />
                </div>
              )}
            </div>
          )}

          {limitReached ? (
            <p className="ask-cnr-limit">
              You've used today's {DAILY_LIMIT} free questions. <Link to="/contact">Get in touch</Link> for full access or a walkthrough.
            </p>
          ) : (
            <form className="ask-cnr-form" onSubmit={handleSend}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. What are good low-potassium foods for a renal diet?"
                disabled={loading}
                maxLength={200}
                autoFocus
              />
              <button type="submit" disabled={loading || !input.trim()} aria-label="Ask">
                {loading ? '···' : 'Ask'}
              </button>
            </form>
          )}

          {!limitReached && (
            <span className="ask-cnr-remaining">{remaining} of {DAILY_LIMIT} registry questions left today</span>
          )}
        </div>
      )}
    </div>
  )
}
