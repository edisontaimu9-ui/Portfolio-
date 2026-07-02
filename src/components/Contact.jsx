import { useState } from 'react'
import Reveal from './Reveal'

/*
 * Web3Forms — free, no backend needed.
 * 1. Go to https://web3forms.com
 * 2. Enter your email → they send you an Access Key
 * 3. Paste it below. That's it.
 */
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE'

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57
        0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695
        -.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99
        .105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225
        -.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405
        c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225
        0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3
        0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136
        2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267
        5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782
        13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24
        1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746
        l7.737-8.857L1.258 2.25H8.08l4.259 5.633 5.905-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key:   WEB3FORMS_KEY,
          name:         form.name,
          email:        form.email,
          message:      form.message,
          subject:      `Portfolio message from ${form.name}`,
          from_name:    'Edison Taimu Portfolio',
          /* Redirect spam to a honeypot so you don't get bot mail */
          botcheck:     '',
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        console.error('Web3Forms error:', data)
        setStatus('error')
      }
    } catch (err) {
      console.error('Network error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Contact</span>
            <h2 className="display">Let's build something <br />that matters.</h2>
          </div>
        </Reveal>

        <div className="contact-grid">

          {/* Left */}
          <Reveal delay={80}>
            <div className="contact-text">
              <p>
                Whether you're running a global health innovation programme, building
                health tech for underserved populations, or just curious about what
                I'm making — reach out. I respond to every message.
              </p>
              <p>
                For internship enquiries, collaboration proposals, or if you're a
                researcher or clinician who sees a gap Oasis CNST could fill, I'd
                especially love to hear from you.
              </p>

              <a href="mailto:edisontaimu@gmail.com" className="contact-email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                edisontaimu@gmail.com
              </a>

              <div className="contact-links">
                <a href="https://github.com/edisontaimu9-ui" target="_blank"
                  rel="noopener noreferrer" className="icon-link" aria-label="GitHub">
                  <GitHubIcon/>
                </a>
                <a href="https://linkedin.com/in/edison-taimu" target="_blank"
                  rel="noopener noreferrer" className="icon-link" aria-label="LinkedIn">
                  <LinkedInIcon/>
                </a>
                <a href="https://x.com/edisontaimu" target="_blank"
                  rel="noopener noreferrer" className="icon-link" aria-label="X / Twitter">
                  <XIcon/>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={160}>
            <form onSubmit={handleSubmit} noValidate>
              {status === 'sent' ? (
                <div style={{
                  padding: '32px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✓</div>
                  <p style={{ color: 'var(--accent)', fontWeight: 600 }}>Message sent!</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '.875rem', marginTop: '8px' }}>
                    I'll get back to you as soon as I can.
                  </p>
                </div>
              ) : (
                <>
                  {/* Honeypot — keeps bots out, must stay hidden */}
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" readOnly />

                  {status === 'error' && (
                    <div style={{
                      padding: '12px 16px',
                      marginBottom: '16px',
                      background: 'rgba(239,68,68,.08)',
                      border: '1px solid rgba(239,68,68,.2)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '.85rem',
                      color: '#f87171',
                    }}>
                      Something went wrong. Try emailing me directly at{' '}
                      <a href="mailto:edisontaimu@gmail.com"
                        style={{ color: 'inherit', textDecoration: 'underline' }}>
                        edisontaimu@gmail.com
                      </a>
                    </div>
                  )}
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email" name="email" type="email" required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message" name="message" rows={5} required
                      placeholder="Tell me what you're working on…"
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-foot">
                    <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again' : 'Send message'}
                    </button>
                    <span className="form-note">Usually responds within 48 hours.</span>
                  </div>
                </>
              )}
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
