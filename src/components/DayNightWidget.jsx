import { useEffect, useMemo, useRef, useState } from 'react'
import { getArcProgress } from '../lib/sunTimes'
import { getSkyPalette, getTerrainPalette } from '../lib/skyColors'

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

// Vegetation & farmland patches making up the ground texture, clipped to
// the ridge silhouette — a stylised satellite-imagery mosaic rather than a
// flat silhouette fill. [cx, cy, rx, ry, color]
const TERRAIN_PATCHES = [
  [30, 132, 34, 17, '#3f6b3a'], [95, 141, 46, 15, '#557a3d'],
  [150, 129, 30, 15, '#6b8f45'], [193, 145, 52, 13, '#8a7a44'],
  [250, 133, 38, 16, '#3f6b3a'], [300, 143, 46, 14, '#6b8f45'],
  [346, 129, 34, 15, '#557a3d'], [378, 146, 32, 11, '#8a7a44'],
  [60, 146, 40, 10, '#6b8f45'], [225, 122, 26, 12, '#557a3d'],
]
const TERRAIN_BASE = '#33502f'

// A river/road line winding through the ground.
const RIVER_PATH = 'M0,138 C60,131 90,148 140,140 C190,132 222,150 270,142 C320,134 352,148 400,140'

// Settlement points — glow warm at night (town lights), read as faint
// rooftops by day. [x, y, r]
const SETTLEMENTS = [
  [70, 134, 1.1], [128, 143, 0.9], [172, 130, 1], [216, 147, 0.8],
  [263, 136, 1.2], [308, 145, 0.9], [352, 132, 1], [44, 141, 0.8],
]

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
  const terrain = useMemo(() => getTerrainPalette(isDay, fraction), [isDay, fraction])

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

  // Lens-flare artifacts: a few faint circles strung along the line from the
  // sun, through the frame center, to the far side — classic flare rig.
  // Fades in once past golden hour (sky.glow low) and only during the day.
  const flareOpacity = isDay ? Math.max(0, Math.min(1, 1 - sky.glow * 1.6)) : 0
  const centerX = VIEW_W / 2, centerY = 60
  const dx = centerX - point.x, dy = centerY - point.y
  const FLARE_ARTIFACTS = [
    { t: 0.45, r: 3, o: 0.5 }, { t: 0.75, r: 5, o: 0.35 }, { t: 1.25, r: 2, o: 0.4 },
  ]

  return (
    <div className="daynight-widget" data-phase={isDay ? 'day' : 'night'} style={{ backgroundImage: sky.gradient }}>
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
        <defs>
          <clipPath id="groundClip">
            <path d={RIDGE} />
          </clipPath>
          <clipPath id="moonClip">
            <circle cx={point.x} cy={point.y} r="5.5" />
          </clipPath>
          <radialGradient id="sunBloom">
            <stop offset="0%" stopColor="#fff6de" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fff6de" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sunOrb" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#fffbe8" />
            <stop offset="55%" stopColor="#ffd873" />
            <stop offset="100%" stopColor="#ffb44d" />
          </radialGradient>
          <radialGradient id="moonOrb" cx="38%" cy="35%">
            <stop offset="0%" stopColor="#fdfdfa" />
            <stop offset="60%" stopColor="#e4e4de" />
            <stop offset="100%" stopColor="#b9bab6" />
          </radialGradient>
        </defs>

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
        {isDay && (
          <circle
            cx={point.x} cy={point.y} r="26"
            fill="url(#sunBloom)"
            opacity={flareOpacity}
          />
        )}
        <circle cx={point.x} cy={point.y} r={isDay ? 15 : 11} className="daynight-orb-halo" />
        <circle
          cx={point.x} cy={point.y} r={isDay ? 7 : 5.5}
          fill={isDay ? 'url(#sunOrb)' : 'url(#moonOrb)'}
          className="daynight-orb"
        />
        {!isDay && (
          /* subtle craters, clipped to the moon disc so they never spill over the edge */
          <g clipPath="url(#moonClip)" opacity="0.5">
            <circle cx={point.x - 1.6} cy={point.y - 1.2} r="1.3" fill="#9a9b96" />
            <circle cx={point.x + 1.8} cy={point.y + 0.6} r="1.7" fill="#a7a8a2" />
            <circle cx={point.x + 0.3} cy={point.y + 2.1} r="0.9" fill="#9a9b96" />
            <circle cx={point.x - 2} cy={point.y + 1.6} r="0.6" fill="#a7a8a2" />
          </g>
        )}
        {isDay && FLARE_ARTIFACTS.map(({ t, r, o }, i) => (
          <circle
            key={i}
            cx={point.x + dx * t} cy={point.y + dy * t}
            r={r} fill="#ffe9c2"
            opacity={flareOpacity * o}
          />
        ))}

        {/* satellite-map ground: vegetation/farmland mosaic, river, and
            settlement lights, clipped to the ridge silhouette */}
        <g clipPath="url(#groundClip)" style={{ opacity: terrain.terrainOpacity, transition: 'opacity 1.2s ease' }}>
          <rect x="0" y="100" width={VIEW_W} height="50" fill={TERRAIN_BASE} />
          {TERRAIN_PATCHES.map(([cx, cy, rx, ry, color], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity="0.85" />
          ))}
          <path d={RIVER_PATH} stroke="#bcd7e0" strokeWidth="1.2" fill="none" opacity="0.55" />
        </g>
        <g clipPath="url(#groundClip)">
          {SETTLEMENTS.map(([x, y, r], i) => (
            <circle
              key={i} cx={x} cy={y} r={r}
              fill={isDay ? '#fff' : '#ffd873'}
              opacity={terrain.settlementOpacity}
              style={{ transition: 'opacity 1s ease' }}
            />
          ))}
        </g>
        <rect
          x="0" y="100" width={VIEW_W} height="50"
          clipPath="url(#groundClip)"
          fill={terrain.tint}
          style={{ transition: 'fill 1.2s ease' }}
        />

        {/* horizon ridge outline (plateau silhouette) */}
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
