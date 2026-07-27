import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import logo from '../assets/logo.png'

const links = [
  { to: '/about',         label: 'About'        },
  { to: '/projects',      label: 'Work'          },
  { to: '/skills',        label: 'Skills'        },
  { to: '/experience',    label: 'Experience'    },
  { to: '/impact',        label: 'Impact'        },
  { to: '/opportunities', label: 'Opportunities' },
  { to: '/support',       label: 'Support'       },
]

export default function Nav() {
  const location = useLocation()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [scrollPct, setScrollPct] = useState(0)

  /* scroll state — recomputed per page since each route has its own length */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* close the mobile menu automatically on navigation */
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  function isActive(to) {
    return location.pathname === to
  }

  return (
    <>
      {/* Progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollPct}%` }}
        aria-hidden="true"
      />

      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link to="/" className="logo">
            <img src={logo} alt="" className="logo-mark" />
            Edison Taimu
          </Link>

          <ul className="nav-links" role="list">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`nav-link${isActive(to) ? ' active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="btn btn-primary btn-sm nav-cta">
            Get in touch
          </Link>

          <ThemeToggle className="nav-theme-toggle" />

          <button
            className="menu-toggle"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="6"  y2="6"/>
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="16" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          className="close-btn"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>

        <span className="menu-section-label">Navigate</span>
        {links.map(({ to, label }) => (
          <Link key={to} to={to} className="mobile-link">
            {label}
          </Link>
        ))}
        <Link to="/contact" className="mobile-link" style={{ color: 'var(--accent)' }}>
          Get in touch →
        </Link>

        <span className="menu-section-label menu-section-label-spaced">Elsewhere</span>
        <div className="menu-elsewhere">
          <a href="https://github.com/edisontaimu9-ui" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/edison-taimu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://x.com/edisontaimu" target="_blank" rel="noopener noreferrer">X</a>
        </div>

        <ThemeToggle variant="mobile" />

        <div className="menu-footer">
          <span>&copy; {new Date().getFullYear()} Edison Taimu</span>
          <span>Zomba, Malawi</span>
        </div>
      </div>
    </>
  )
}
