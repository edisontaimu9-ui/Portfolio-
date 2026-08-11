// A ring of hand-lettered personality words around the hero portrait,
// each with a tiny line-icon and a thin curved arrow pointing back at
// the photo. Positions are computed from an angle around the circle
// (0° = top, clockwise) so the layout stays mathematically balanced
// instead of hand-tuned pixel values. On small screens this collapses
// into a wrapped row of chips below the photo — see .doodle-ring in
// index.css for the breakpoint.

const RADIUS = 50 // percent from center — sits just outside the photo's edge

function posFor(angle) {
  const rad = (angle * Math.PI) / 180
  return {
    top: `${(50 - RADIUS * Math.cos(rad)).toFixed(2)}%`,
    left: `${(50 + RADIUS * Math.sin(rad)).toFixed(2)}%`,
  }
}

const icons = {
  smile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  ),
  help: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.3" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  ),
  utensils: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v6a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M19 3a4 4 0 0 0-4 4v5a2 2 0 0 0 2 2h2Zm0 0v17" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  ),
  bulb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.3-1 .8-1.7 1.6-2.5C17.6 10.5 18 9.2 18 8a6 6 0 0 0-12 0c0 1.2.4 2.5 1.4 3.5.8.8 1.3 1.5 1.6 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.2" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
      <path d="M16 3.1a4 4 0 0 1 0 7.8" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.7 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 3v3M11 15v3M4 9h3M15 9h3M6.5 5.5l2 2M13.5 10.5l2 2M15.5 5.5l-2 2M8.5 10.5l-2 2" />
      <circle cx="11" cy="9" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
}

const words = [
  { label: 'Playful Nerd',      angle: -60, icon: 'smile',    accent: true,  tilt: -5 },
  { label: 'Curious Mind',      angle: -18, icon: 'help',     accent: false, tilt: 4 },
  { label: 'Dietitian',         angle: 24,  icon: 'utensils', accent: true,  tilt: -4 },
  { label: 'Lifelong Learner',  angle: 62,  icon: 'book',     accent: false, tilt: 5 },
  { label: 'Problem Solver',    angle: 100, icon: 'bulb',     accent: false, tilt: -3 },
  { label: 'Dreamer',           angle: 138, icon: 'cloud',    accent: true,  tilt: 4 },
  { label: 'Purpose Driven',    angle: 178, icon: 'target',   accent: false, tilt: -5 },
  { label: 'People Person',     angle: 218, icon: 'users',    accent: false, tilt: 3 },
  { label: 'Health Advocate',   angle: 254, icon: 'heart',    accent: true,  tilt: -4 },
  { label: 'Creative Thinker',  angle: 290, icon: 'sparkle',  accent: false, tilt: 5 },
]

export default function PortraitDoodles() {
  return (
    <div className="doodle-ring-wrap" aria-hidden="false">
      {words.map(({ label, angle, icon, accent, tilt }, i) => {
        const pos = posFor(angle)
        return (
          <svg
            key={`arrow-${label}`}
            className="doodle-arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              top: pos.top,
              left: pos.left,
              transform: `translate(-50%,-50%) rotate(${angle + 180}deg) translateY(-24px)`,
              animationDelay: `${0.5 + i * 0.06}s`,
            }}
            aria-hidden="true"
          >
            <path d="M8 20C8 10 10 6 12 4" />
            <path d="M9 7l3-3 3 3" />
          </svg>
        )
      })}

      <ul className="doodle-ring" role="list" aria-label="A few words that describe me">
        {words.map(({ label, angle, icon, accent, tilt }, i) => {
          const pos = posFor(angle)
          return (
            <li
              key={label}
              className={`doodle-item${accent ? ' doodle-item-accent' : ''}`}
              style={{
                top: pos.top,
                left: pos.left,
                animationDelay: `${0.5 + i * 0.06}s`,
              }}
            >
              <span className="doodle-item-inner" style={{ transform: `rotate(${tilt}deg)` }}>
                <span className="doodle-icon">{icons[icon]}</span>
                <span className="doodle-label">{label}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
