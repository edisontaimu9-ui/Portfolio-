import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Live demo of the real Chakudya Nutrition Registry RAG orchestrator —
// intent detection -> fan-out search -> rerank -> grounded LLM answer with
// citations. Public + IP rate-limited server-side (see chakudya-api), but we
// also cap it client-side so a single visitor can't eat the whole daily
// budget on their own: 5 questions per rolling 24h, tracked in localStorage.
const ASK_ENDPOINT = 'https://chakudya-api.edisontaimu9.workers.dev/rag/ask'
const DAILY_LIMIT = 5
const WINDOW_MS = 24 * 60 * 60 * 1000
const USAGE_KEY = 'cnr_ask_usage'

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

export default function AskCNR() {
  const [usage, setUsage] = useState(loadUsage)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const logRef = useRef(null)

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, loading])

  const remaining = Math.max(0, DAILY_LIMIT - usage.count)
  const limitReached = remaining <= 0

  async function handleSend(e) {
    e.preventDefault()
    const query = input.trim()
    if (!query || loading || limitReached) return

    setMessages((m) => [...m, { role: 'user', text: query }])
    setInput('')
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
            sources: json.data.sources || [],
          }])
        } else {
          setMessages((m) => [...m, {
            role: 'assistant',
            text: json.error || "Couldn't get an answer from CNR just now.",
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
      <div className="ask-cnr-head">
        <span className="ask-cnr-title">Ask CNR</span>
        <span className="ask-cnr-sub">Live query against the real registry — retrieval, reranking, and a grounded answer with citations, running right now.</span>
      </div>

      {messages.length > 0 && (
        <div className="ask-cnr-log" ref={logRef}>
          {messages.map((m, i) => (
            <div key={i} className={`ask-cnr-msg ask-cnr-msg-${m.role}`}>
              <p>{m.text}</p>
              {m.sources && m.sources.length > 0 && (
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
          />
          <button type="submit" disabled={loading || !input.trim()} aria-label="Ask">
            {loading ? '···' : 'Ask'}
          </button>
        </form>
      )}

      {!limitReached && (
        <span className="ask-cnr-remaining">{remaining} of {DAILY_LIMIT} questions left today</span>
      )}
    </div>
  )
}
