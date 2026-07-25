import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '', variant = 'icon' }) {
  const { theme, toggleTheme } = useTheme()
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  const icons = (
    <>
      <svg className="icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/><path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/><path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
      </svg>
      <svg className="icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
    </>
  )

  if (variant === 'mobile') {
    return (
      <button
        className="theme-toggle-row"
        onClick={toggleTheme}
        aria-label={label}
      >
        <span className="theme-toggle-mobile" aria-hidden="true">{icons}</span>
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </button>
    )
  }

  return (
    <button
      className={`theme-toggle${className ? ` ${className}` : ''}`}
      onClick={toggleTheme}
      aria-label={label}
    >
      {icons}
    </button>
  )
}
