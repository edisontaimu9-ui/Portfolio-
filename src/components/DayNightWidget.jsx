import { useEffect, useMemo, useRef, useState } from 'react'
import { getArcProgress } from '../lib/sunTimes'
import { getSkyPalette } from '../lib/skyColors'

// ─── Work location ────────────────────────────────────────────────────────
// Update CURRENT_LOCATION when your work area changes (e.g. moving between
// campus in Zomba and clinical rotations at QECH in Blantyre). Everything
// else — sun position, day/night state, the live clock — recalculates
// automatically from this.
const LOCATIONS = {
  zomba: { city: 'Zomba', lat: -15.386, lon: 35.319, timeZone: 'Africa/Blantyre' },
  blantyre: { city: 'Blantyre', lat: -15.7861, lon: 35.0058, timeZone: 'Africa/Blantyre' },
}
const CURRENT_LOCATION = 'zomba'
// ────────────────────────────────────────────────────────────────────────

const VIEW_W = 400
const VIEW_H = 150
const ARC_PATH = 'M16,104 C 90,-10 310,-10 384,104'

// Fixed "starfield" so it doesn't reshuffle every render.
const STARS = [
  [24, 18, 1.2], [58, 34, 0.9], [95, 14, 1], [130, 40, 1.3], [168, 20, 0.8],
  [205, 12, 1.1], [238, 36, 0.9], [270, 22, 1.4], [302, 44, 1], [335, 16, 1.2],
  [362, 30, 0.9], [46, 56, 0.8], [112, 62, 1], [178, 58, 0.8], [252, 60, 1.1],
  [318, 54, 0.9], [80, 8, 0.7], [148, 6, 1], [220, 8, 0.8], [286, 10, 0.9],
  [352, 8, 1.1], [12, 42, 0.9], [390, 46, 1],
]

// A low ridge line — a stand-in for the Zomba Plateau escarpment — so the
// sun/moon rises and sets behind a horizon rather than a flat edge.
const RIDGE = `M0,${VIEW_H} L0,128 L22,118 L48,124 L70,108 L96,120 L120,112
  L150,122 L182,104 L210,118 L240,110 L268,120 L300,113 L330,123 L358,112
  L${VIEW_W},121 L${VIEW_W},${VIEW_H} Z`

export default function DayNightWidget() {
  const location = LOCATIONS[CURRENT_LOCATION]
  const [now, setNow] = useState(() => new Date())
  const pathRef = useRef(null)
  const [point, setPoint] = useState({ x: 16, y: 104 })

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const { isDay, fraction } = getArcProgress(now, location.lat, location.lon)
  const sky = useMemo(() => getSkyPalette(isDay, fraction), [isDay, fraction])

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const length = path.getTotalLength()
    const p = path.getPointAtLength(length * fraction)
    setPoint({ x: p.x, y: p.y })
  }, [fraction])

  const timeLabel = new Intl.DateTimeFormat('en-GB', {
    timeZone: location.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now)

  const glowX = (point.x / VIEW_W) * 100
  const [hr, hg, hb] = sky.horizonRgb

  return (
    <div className="daynight-widget" style={{ backgroundImage: sky.gradient }}>
      {/* atmospheric glow around the sun/moon's position on the horizon */}
      <div
        className="daynight-horizon-glow"
        style={{
          left: `${glowX}%`,
          background: `radial-gradient(circle, rgba(${hr},${hg},${hb},.55) 0%, rgba(${hr},${hg},${hb},0) 70%)`,
        }}
      />

      <svg
        className="daynight-svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* stars */}
        <g style={{ opacity: sky.starOpacity, transition: 'opacity 1s ease' }}>
          {STARS.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#fff" />
          ))}
        </g>

        {/* haze / cloud bands, daytime only */}
        <g style={{ opacity: sky.hazeOpacity, transition: 'opacity 1s ease' }} className="daynight-haze">
          <ellipse cx="90" cy="46" rx="70" ry="7" fill="#fff" opacity="0.16" />
          <ellipse cx="270" cy="30" rx="90" ry="6" fill="#fff" opacity="0.12" />
          <ellipse cx="200" cy="66" rx="110" ry="5" fill="#fff" opacity="0.08" />
        </g>

        {/* orbit arc */}
        <path
          ref={pathRef}
          d={ARC_PATH}
          className="daynight-arc"
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="1 8"
          strokeLinecap="round"
        />

        {/* sun / moon */}
        <circle cx={point.x} cy={point.y} r={isDay ? 15 : 11} className="daynight-orb-halo" />
        <circle cx={point.x} cy={point.y} r={isDay ? 7 : 5.5} className="daynight-orb" />

        {/* horizon ridge (plateau silhouette) */}
        <path d={RIDGE} className="daynight-ridge" />
      </svg>

      <div className="daynight-info">
        <span className="daynight-label">
          <span className="daynight-dot" />
          {isDay ? 'Daytime' : 'Nighttime'} in {location.city}
        </span>
        <span className="daynight-clock">{timeLabel}</span>
      </div>
    </div>
  )
}
