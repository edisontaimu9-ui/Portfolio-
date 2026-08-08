import { useEffect, useRef, useState } from 'react'
import { getArcProgress } from '../lib/sunTimes'

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

const ARC_PATH = 'M20,108 C 90,-4 310,-4 380,108'

export default function DayNightWidget() {
  const location = LOCATIONS[CURRENT_LOCATION]
  const [now, setNow] = useState(() => new Date())
  const pathRef = useRef(null)
  const [point, setPoint] = useState({ x: 20, y: 108 })

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const { isDay, fraction } = getArcProgress(now, location.lat, location.lon)

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

  return (
    <div className={`daynight-widget ${isDay ? 'is-day' : 'is-night'}`}>
      <svg
        className="daynight-svg"
        viewBox="0 0 400 140"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={ARC_PATH}
          className="daynight-arc"
          fill="none"
          strokeWidth="2"
          strokeDasharray="1 9"
          strokeLinecap="round"
        />
        <circle
          cx={point.x}
          cy={point.y}
          r={isDay ? 9 : 7}
          className="daynight-orb"
        />
      </svg>

      <div className="daynight-info">
        <span className="daynight-label">
          {isDay ? 'Daytime' : 'Nighttime'} in {location.city}
        </span>
        <span className="daynight-clock">{timeLabel}</span>
      </div>
    </div>
  )
}
