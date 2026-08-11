import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import MobileTabBar from './MobileTabBar'
import logo from '../assets/logo.png'

// Primary links stay visible at all times. The rest live under "More" on
// desktop to keep the bar from feeling crowded — the mobile drawer still
// lists everything flat, since that's not a space-constrained layout.
const primaryLinks = [
  { to: '/about',      label: 'About'      },
  { to: '/projects',   label: 'Work'       },
  { to: '/skills',     label: 'Skills'     },
  { to: '/experience', label: 'Experience' },
]
const moreLinks = [
  { to: '/impact',        label: 'Impact'        },
  { to: '/blog',           label: 'Blog'          },
  { to: '/opportunities', label: 'Opportunities' },
  { to: '/support',       label: 'Support'       },
]
const links = [...primaryLinks, ...moreLinks]

export default function Nav() {
  const location = useLocation()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [moreOpen,  setMoreOpen]  = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const moreRef = useRef(null)

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
  useEffect(() => { setMenuOpen(false); setMoreOpen(false) }, [location.pathname])

  /* close the "More" dropdown on outside click or Escape */
  useEffect(() => {
    if (!moreOpen) return
    function onClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setMoreOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [moreOpen])

  function isActive(to) {
    return location.pathname === to
  }
  const moreActive = moreLinks.some(l => isActive(l.to))

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
            {primaryLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`nav-link${isActive(to) ? ' active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}

            <li className="nav-more" ref={moreRef}>
              <button
                type="button"
                className={`nav-link nav-more-trigger${moreActive ? ' active' : ''}`}
                aria-haspopup="true"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen(o => !o)}
              >
                More
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="nav-more-chevron">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              <div className={`nav-more-menu${moreOpen ? ' open' : ''}`} role="menu">
                {moreLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    role="menuitem"
                    className={`nav-more-item${isActive(to) ? ' active' : ''}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </li>
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
          <Link
            key={to}
            to={to}
            className={`mobile-link${isActive(to) ? ' active' : ''}`}
          >
            {label}
          </Link>
        ))}
        <Link to="/contact" className="mobile-link mobile-cta">
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

      <MobileTabBar />
    </>
  )
}
