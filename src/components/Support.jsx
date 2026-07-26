import { useState, useEffect } from 'react'
import Reveal from './Reveal'

/*
 * PayChangu "Support me" button.
 *
 * The secret key never lives here — this component only talks to a small
 * Cloudflare Worker (see /paychangu-worker in the project root) that holds
 * PAYCHANGU_SECRET_KEY and forwards requests to PayChangu's Standard
 * Checkout API. Set WORKER_URL below to your deployed worker's URL.
 */
const WORKER_URL = 'https://paychangu-support-worker.<your-subdomain>.workers.dev'

const PRESET_AMOUNTS = [2000, 5000, 10000] // MWK

export default function Support() {
  const [amount, setAmount]   = useState(5000)
  const [custom, setCustom]   = useState('')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState('idle') // idle | redirecting | error
  const [error, setError]     = useState('')
  const [verified, setVerified] = useState(null) // null | 'success' | 'failed'

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
    const finalAmount = custom ? Number(custom) : amount
    if (!finalAmount || finalAmount <= 0) {
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
          amount: finalAmount,
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
      setError('Network error — please try again.')
      setStatus('idle')
    }
  }

  return (
    <section id="support" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Support</span>
            <h2 className="display">Support the work.</h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          {verified === 'success' && (
            <div style={{
              padding: '16px 20px', marginBottom: '24px',
              background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.25)',
              borderRadius: 'var(--radius-sm)', color: '#22c55e', fontSize: '.9rem',
            }}>
              ✓ Payment received — thank you so much for the support!
            </div>
          )}
          {verified === 'failed' && (
            <div style={{
              padding: '16px 20px', marginBottom: '24px',
              background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.2)',
              borderRadius: 'var(--radius-sm)', color: '#f87171', fontSize: '.9rem',
            }}>
              We couldn't confirm that payment. If money left your account, email{' '}
              <a href="mailto:edisontaimu9@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>
                edisontaimu9@gmail.com
              </a>.
            </div>
          )}

          <form onSubmit={handleSupport} noValidate className="contact-form" style={{ maxWidth: 420 }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
              If Oasis CNST, Chakudya API, or Thanzi has been useful to you, a small
              contribution helps keep them running. Payments are processed securely by
              PayChangu (mobile money, bank transfer, or card).
            </p>

            <div className="field">
              <label>Amount (MWK)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                {PRESET_AMOUNTS.map(a => (
                  <button
                    type="button" key={a}
                    onClick={() => { setAmount(a); setCustom('') }}
                    className="btn"
                    style={{
                      border: '1px solid var(--border)',
                      background: amount === a && !custom ? 'var(--accent)' : 'transparent',
                      color: amount === a && !custom ? '#fff' : 'inherit',
                    }}
                  >
                    {a.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number" min="100" placeholder="Or enter a custom amount"
                value={custom}
                onChange={e => setCustom(e.target.value)}
                style={{ marginTop: '10px' }}
              />
            </div>

            <div className="field">
              <label htmlFor="support-name">Name (optional)</label>
              <input id="support-name" type="text" placeholder="Your name"
                value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="field">
              <label htmlFor="support-email">Email (optional)</label>
              <input id="support-email" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            {error && (
              <div style={{ color: '#f87171', fontSize: '.85rem', marginBottom: '12px' }}>
                {error}
              </div>
            )}

            <div className="form-foot">
              <button type="submit" className="btn btn-primary" disabled={status === 'redirecting'}>
                {status === 'redirecting' ? 'Redirecting…' : 'Support with PayChangu'}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
