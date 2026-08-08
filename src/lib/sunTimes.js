// Low-precision solar position calculations (based on standard NOAA solar
// geometry formulas). Good enough to place a sunrise/sunset marker on a
// day-arc; not meant for navigation-grade accuracy.

const RAD = Math.PI / 180
const DAY_MS = 86400000
const J1970 = 2440588
const J2000 = 2451545
const OBLIQUITY = RAD * 23.4397 // obliquity of the Earth

function toJulian(date) {
  return date.getTime() / DAY_MS - 0.5 + J1970
}
function fromJulian(j) {
  return new Date((j + 0.5 - J1970) * DAY_MS)
}
function toDays(date) {
  return toJulian(date) - J2000
}

function solarMeanAnomaly(d) {
  return RAD * (357.5291 + 0.98560028 * d)
}
function eclipticLongitude(M) {
  const C = RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M))
  const P = RAD * 102.9372
  return M + C + P + Math.PI
}
function declination(l) {
  return Math.asin(Math.sin(l) * Math.sin(OBLIQUITY))
}
function julianCycle(d, lw) {
  return Math.round(d - 0.0009 - lw / (2 * Math.PI))
}
function approxTransit(Ht, lw, n) {
  return 0.0009 + (Ht + lw) / (2 * Math.PI) + n
}
function solarTransitJ(ds, M, L) {
  return J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L)
}
function hourAngle(h, phi, d) {
  return Math.acos((Math.sin(h) - Math.sin(phi) * Math.sin(d)) / (Math.cos(phi) * Math.cos(d)))
}
function getSetJ(h, lw, phi, dec, n, M, L) {
  const w = hourAngle(h, phi, dec)
  const a = approxTransit(w, lw, n)
  return solarTransitJ(a, M, L)
}

// The standard "sunrise/sunset" solar elevation angle, corrected for
// atmospheric refraction and the sun's apparent radius.
const SUNRISE_ANGLE = -0.833 * RAD

/**
 * Returns { sunrise, sunset, solarNoon } as Date objects (UTC-correct,
 * render them in whatever timezone you like) for the given calendar date
 * and location.
 */
export function getSunTimes(date, lat, lon) {
  const lw = RAD * -lon
  const phi = RAD * lat
  const d = toDays(date)
  const n = julianCycle(d, lw)
  const ds = approxTransit(0, lw, n)
  const M = solarMeanAnomaly(ds)
  const L = eclipticLongitude(M)
  const dec = declination(L)
  const Jnoon = solarTransitJ(ds, M, L)

  const Jset = getSetJ(SUNRISE_ANGLE, lw, phi, dec, n, M, L)
  const Jrise = Jnoon - (Jset - Jnoon)

  return {
    sunrise: fromJulian(Jrise),
    sunset: fromJulian(Jset),
    solarNoon: fromJulian(Jnoon),
  }
}

/**
 * Given the current time and a location, returns where "now" sits on the
 * day/night arc as a 0→1 fraction, plus whether it's currently day.
 *
 * During the day: 0 = sunrise, 1 = sunset.
 * During the night: 0 = sunset, 1 = next sunrise.
 */
export function getArcProgress(now, lat, lon) {
  const today = getSunTimes(now, lat, lon)

  if (now >= today.sunrise && now < today.sunset) {
    const total = today.sunset - today.sunrise
    const elapsed = now - today.sunrise
    return { isDay: true, fraction: clamp01(elapsed / total) }
  }

  // Nighttime: figure out which sunset→sunrise window we're in.
  let prevSunset, nextSunrise
  if (now < today.sunrise) {
    const yesterday = new Date(now.getTime() - DAY_MS)
    prevSunset = getSunTimes(yesterday, lat, lon).sunset
    nextSunrise = today.sunrise
  } else {
    const tomorrow = new Date(now.getTime() + DAY_MS)
    prevSunset = today.sunset
    nextSunrise = getSunTimes(tomorrow, lat, lon).sunrise
  }
  const total = nextSunrise - prevSunset
  const elapsed = now - prevSunset
  return { isDay: false, fraction: clamp01(elapsed / total) }
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x))
}
