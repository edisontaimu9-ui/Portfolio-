import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#about',      label: 'About',       id: 'about'      },
  { href: '#projects',   label: 'Work',         id: 'projects'   },
  { href: '#skills',     label: 'Skills',       id: 'skills'     },
  { href: '#experience', label: 'Experience',   id: 'experience' },
  { href: '#internship', label: 'Opportunities',id: 'internship' },
]

export default function Nav() {
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [activeSection,  setActiveSection]  = useState('')
  const [scrollPct,      setScrollPct]      = useState(0)

  /* scroll state */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
      const docH   = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* active section */
  useEffect(() => {
    const ids  = ['home', ...links.map(l => l.id), 'contact']
    const els  = ids.map(id => document.getElementById(id)).filter(Boolean)

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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
          <a href="#home" className="logo">
            <span className="logo-mark">ET</span>
            Edison Taimu
          </a>

          <ul className="nav-links" role="list">
            {links.map(({ href, label, id }) => (
              <li key={id}>
                <a
                  href={href}
                  className={`nav-link${activeSection === id ? ' active' : ''}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn btn-primary btn-sm nav-cta">
            Get in touch
          </a>

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

        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-link"
          style={{ color: 'var(--accent)' }}
          onClick={() => setMenuOpen(false)}
        >
          Get in touch →
        </a>

        <ThemeToggle variant="mobile" />
      </div>
    </>
  )
}
