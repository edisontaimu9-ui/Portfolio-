// Interpolates a satellite-view "atmosphere" sky gradient from the current
// day/night arc position: deep space blue-black at night, a warm horizon
// glow around sunrise/sunset, and a hazy midday blue in between.

function lerp(a, b, t) {
  return a + (b - a) * t
}
function lerpColor(c1, c2, t) {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t)),
  ]
}
function toRgb([r, g, b], a = 1) {
  return a === 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`
}
function clamp01(x) {
  return Math.max(0, Math.min(1, x))
}

// Anchor palettes: [top, mid, horizon] atmosphere bands.
const DAY_DEEP   = [[7, 34, 66],   [47, 143, 209], [191, 228, 245]]
const DAY_GOLDEN = [[32, 46, 92],  [255, 150, 92], [255, 214, 158]]
const NIGHT_DEEP   = [[2, 4, 16],   [6, 13, 34],   [11, 21, 46]]
const NIGHT_GOLDEN = [[9, 12, 34],  [72, 48, 88],  [255, 154, 110]]

/**
 * Ground/terrain palette for the satellite-map base layer — vivid,
 * sunlit vegetation & farmland colors by day; dark, low-visibility
 * terrain with glowing settlement lights by night (mirrors how real
 * low-light satellite imagery looks, e.g. NASA Black Marble).
 */
export function getTerrainPalette(isDay, fraction) {
  const EDGE = 0.18
  const glow = clamp01(Math.max(1 - fraction / EDGE, 1 - (1 - fraction) / EDGE))
  const terrainOpacity = isDay ? lerp(0.72, 1, 1 - glow) : 0.14
  const settlementOpacity = isDay ? 0.14 : clamp01(1 - glow * 1.3)
  const tint = isDay
    ? `rgba(255,178,108,${(glow * 0.32).toFixed(2)})`
    : `rgba(3,8,22,${(0.6 + (1 - glow) * 0.12).toFixed(2)})`
  return { terrainOpacity, settlementOpacity, tint }
}

/**
 * @param isDay boolean from getArcProgress
 * @param fraction 0→1 position within the current day/night phase
 * @returns { gradient, horizonRgb, starOpacity, hazeOpacity }
 */
export function getSkyPalette(isDay, fraction) {
  // Golden-hour glow peaks right at sunrise/sunset (fraction 0 or 1) and
  // fades out over ~18% of the phase.
  const EDGE = 0.18
  const glow = clamp01(Math.max(1 - fraction / EDGE, 1 - (1 - fraction) / EDGE))

  const [top, mid, horizon] = isDay
    ? [0, 1, 2].map((i) => lerpColor(DAY_DEEP[i], DAY_GOLDEN[i], glow))
    : [0, 1, 2].map((i) => lerpColor(NIGHT_DEEP[i], NIGHT_GOLDEN[i], glow))

  const gradient = `linear-gradient(180deg, ${toRgb(top)} 0%, ${toRgb(mid)} 58%, ${toRgb(horizon)} 100%)`

  // Stars fade in once the golden glow has faded, and only at night.
  const starOpacity = isDay ? 0 : clamp01(1 - glow * 1.4)
  // Daytime haze/cloud bands fade out near the horizon glow (dawn/dusk).
  const hazeOpacity = isDay ? clamp01(1 - glow * 0.5) : 0

  return { gradient, horizonRgb: horizon, starOpacity, hazeOpacity, glow }
}
