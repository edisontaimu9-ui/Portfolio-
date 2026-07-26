import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer container">
      <div className="footer-lead">
        <Link to="/" className="logo" style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}>
          <span className="logo-mark" style={{
            width: '26px', height: '26px', borderRadius: '6px',
            background: 'var(--accent)', color: 'var(--on-accent)',
            fontSize: '.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>ET</span>
          <span style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>Edison Taimu</span>
        </Link>
      </div>
      <p className="footer-copy">
        © {year} · All rights reserved
      </p>
    </footer>
  )
}
