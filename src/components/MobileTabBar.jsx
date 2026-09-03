import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

// Floating pill tab bar for small screens — quick access to the three
// pages people jump to most, plus a one-tap theme switch. The rest of
// the site is still reachable through the hamburger drawer up top.
const tabs = [
  {
    to: '/',
    label: 'Home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7" />
        <path d="M4 10v10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V10" />
      </svg>
    ),
  },
  {
    to: '/projects',
    label: 'Work',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    to: '/blog',
    label: 'Blog',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7v14" />
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
      </svg>
    ),
  },
]

export default function MobileTabBar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  /* Hides on scroll-down past the top of the page, reappears on any
     scroll-up — same pattern as the nav bar, so it's out of the way
     while reading but always one swipe away. */
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (y < 80) {
        setHidden(false)
      } else if (y > lastY.current + 4) {
        setHidden(true)
      } else if (y < lastY.current - 4) {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  function isActive(to) {
    return to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
  }

  return (
    <nav className={`mobile-tabbar${hidden ? ' tabbar-hidden' : ''}`} aria-label="Quick navigation">
      {tabs.map(({ to, label, icon }) => (
        <Link
          key={to}
          to={to}
          className={`mobile-tabbar-item${isActive(to) ? ' active' : ''}`}
        >
          <span className="mobile-tabbar-icon" aria-hidden="true">{icon}</span>
          <span className="mobile-tabbar-label">{label}</span>
        </Link>
      ))}

      <button
        type="button"
        className="mobile-tabbar-item mobile-tabbar-theme"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className="mobile-tabbar-icon" aria-hidden="true">
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" /><path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" /><path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
            </svg>
          )}
        </span>
        <span className="mobile-tabbar-label">Theme</span>
      </button>
    </nav>
  )
}
