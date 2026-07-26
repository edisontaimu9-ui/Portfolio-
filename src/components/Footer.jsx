import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer container">
      <div className="footer-lead">
        <Link to="/" className="logo" style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}>
          <img src={logo} alt="Edison Taimu" style={{
            width: '26px', height: '26px', borderRadius: '6px', objectFit: 'cover',
          }} />
          <span style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>Edison Taimu</span>
        </Link>
      </div>
      <p className="footer-copy">
        © {year} · All rights reserved
      </p>
    </footer>
  )
}
