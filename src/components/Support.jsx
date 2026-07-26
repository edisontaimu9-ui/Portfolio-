import { useState, useEffect, useMemo } from 'react'
import Reveal from './Reveal'

/*
 * PayChangu "Support" section.
 *
 * The secret key never lives here — this component only talks to a small
 * Cloudflare Worker (see the Paychangu-payment-gateway- repo) that holds
 * PAYCHANGU_SECRET_KEY and forwards requests to PayChangu's Standard
 * Checkout API. Set WORKER_URL below to your deployed worker's URL.
 */
const WORKER_URL = 'https://paychangu-payment-gateway.edisontaimu9.workers.dev'

const MIN_AMOUNT = 500
const MAX_AMOUNT = 100000        // slider ceiling — typed amounts below have no hard cap
const STOPS = [2000, 5000, 10000]
const RANGE_STEPS = 1000          // internal slider resolution, log-mapped to amount

const MIN_LOG = Math.log(MIN_AMOUNT)
const MAX_LOG = Math.log(MAX_AMOUNT)

// 0–100 position along the (log-scaled) dosage line for a given amount.
function pct(value) {
  const clamped = Math.min(Math.max(value, MIN_AMOUNT), MAX_AMOUNT)
  return ((Math.log(clamped) - MIN_LOG) / (MAX_LOG - MIN_LOG)) * 100
}

// Amount -> the range input's own linear 0..RANGE_STEPS value.
function amountToRange(value) {
  return Math.round((pct(value) / 100) * RANGE_STEPS)
}

// The range input's linear value -> a real MWK amount, rounded to the nearest 100.
function rangeToAmount(raw) {
  const ratio = raw / RANGE_STEPS
  const value = Math.exp(MIN_LOG + ratio * (MAX_LOG - MIN_LOG))
  return Math.round(value / 100) * 100
}

export default function Support() {
  const [amount, setAmount]     = useState(5000)
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [status, setStatus]     = useState('idle') // idle | redirecting | error
  const [error, setError]       = useState('')
  const [verified, setVerified] = useState(null) // null | 'success' | 'failed'

  const fillPct = useMemo(() => pct(Math.min(Math.max(amount, MIN_AMOUNT), MAX_AMOUNT)), [amount])

  // On return from PayChangu, verify the transaction via the worker.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const txRef = params.get('tx_ref')
    if (!txRef) return

    fetch(`${WORKER_URL}/api/support/verify/${encodeURIComponent(txRef)}`)
      .then(res => res.json())
      .then(data => {
        const ok = data?.status === 'success' && data?.data?.status === 'success'
        setVerified(ok ? 'success' : 'failed')
      })
      .catch(() => setVerified('failed'))
      .finally(() => {
        params.delete('tx_ref')
        params.delete('status')
        const clean = window.location.pathname + (params.toString() ? `?${params}` : '') + '#support'
        window.history.replaceState({}, '', clean)
      })
  }, [])

  async function handleSupport(e) {
    e.preventDefault()
    if (!amount || amount <= 0) {
      setError('Enter a valid amount.')
      return
    }

    setStatus('redirecting')
    setError('')

    try {
      const res = await fetch(`${WORKER_URL}/api/support/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'MWK',
          first_name: name || undefined,
          email: email || undefined,
          return_url: window.location.origin + window.location.pathname,
        }),
      })
      const data = await res.json()

      if (data.status === 'success' && data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        setError(data.message || 'Could not start the payment. Try again.')
        setStatus('idle')
      }
    } catch (err) {
      console.error('PayChangu initiate error:', err)
      setError('Network error. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <section id="support" className="section support-section">
      <div className="container support-grid">

        {/* Left: the case */}
        <Reveal>
          <div className="support-copy">
            <span className="eyebrow">Support</span>
            <h2 className="display support-heading">
              Help nutrition care in Malawi reach further.
            </h2>
            <p className="support-body">
              I build free clinical nutrition tools for Malawi, from hospital
              dietetics software to a public food database, one line of code
              at a time. Whether or not you've used them, if the work
              resonates, a small gift helps it reach more people.
            </p>
            <div className="support-channels">
              <span>Mobile money</span>
              <span className="support-channels-dot">·</span>
              <span>Bank transfer</span>
              <span className="support-channels-dot">·</span>
              <span>Card</span>
            </div>
          </div>
        </Reveal>

        {/* Right: the requisition card */}
        <Reveal delay={120}>
          <div className="support-card">

            {verified === 'success' && (
              <div className="support-banner support-banner-success">
                <span className="support-banner-mark">✓</span>
                Payment received. Thank you for the support.
              </div>
            )}
            {verified === 'failed' && (
              <div className="support-banner support-banner-failed">
                <span className="support-banner-mark">!</span>
                We couldn't confirm that payment. If money left your account,
                email{' '}
                <a href="mailto:edisontaimu9@gmail.com">edisontaimu9@gmail.com</a>.
              </div>
            )}

            <form onSubmit={handleSupport} noValidate>
              <div className="support-card-head">
                <span className="support-card-icon" aria-hidden="true">+</span>
                <span className="support-card-label">Contribution</span>
              </div>

              <div className="support-amount-row">
                <span className="support-amount-currency">MWK</span>
                <input
                  type="number"
                  className="support-amount-input"
                  min={MIN_AMOUNT}
                  step={100}
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value) || 0)}
                  aria-label="Amount in Malawi Kwacha"
                />
              </div>

              <div className="support-scale-wrap">
                <input
                  type="range"
                  className="support-scale"
                  min={0}
                  max={RANGE_STEPS}
                  step={1}
                  value={amountToRange(amount)}
                  onChange={e => setAmount(rangeToAmount(Number(e.target.value)))}
                  style={{ '--support-fill': `${fillPct}%` }}
                />
                <div className="support-scale-stops">
                  {STOPS.map(stop => (
                    <button
                      type="button"
                      key={stop}
                      className={`support-stop${amount === stop ? ' is-active' : ''}`}
                      style={{ left: `${pct(stop)}%` }}
                      onClick={() => setAmount(stop)}
                    >
                      <span className="support-stop-tick" />
                      <span className="support-stop-label">{stop.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="support-fields">
                <label className="support-line-field">
                  <span>Name</span>
                  <input
                    type="text" placeholder="Optional"
                    value={name} onChange={e => setName(e.target.value)}
                  />
                </label>
                <label className="support-line-field">
                  <span>Email</span>
                  <input
                    type="email" placeholder="Optional"
                    value={email} onChange={e => setEmail(e.target.value)}
                  />
                </label>
              </div>

              {error && <div className="support-error">{error}</div>}

              <button type="submit" className="support-submit" disabled={status === 'redirecting'}>
                {status === 'redirecting' ? 'Redirecting…' : 'Support this work'}
              </button>
              <p className="support-trust">
                Secured by PayChangu. Mobile money, bank transfer, or card.
              </p>
            </form>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
