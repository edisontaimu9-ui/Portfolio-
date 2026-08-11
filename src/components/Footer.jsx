import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer container">
      <div className="footer-lead">
        <Link to="/" className="logo" style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}>
          <img src={logo} alt="" style={{
            width: '26px', height: '26px', borderRadius: '6px', objectFit: 'cover',
          }} />
          <span style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>Edison Taimu</span>
        </Link>
      </div>
      <p className="footer-copy">
        © {year} · All rights reserved
      </p>
      <p className="footer-copy" style={{ fontSize: '.75rem', opacity: .7 }}>
        Illustration: <em>Aesculapius and Telesphorus</em>, etching by Nicolas Dorigny —{' '}
        <a
          href="https://commons.wikimedia.org/wiki/File:Aesculapius._Etching_by_N._Dorigny._Wellcome_V0035844.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wellcome Collection
        </a>, licensed under{' '}
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
          CC BY 4.0
        </a>.
      </p>
    </footer>
  )
}
