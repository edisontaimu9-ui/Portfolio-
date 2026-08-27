import { json } from './cors.js'

// Used until a location has ever been saved — matches the original
// hardcoded default that used to live in the frontend.
const DEFAULT_LOCATION = {
  city: 'Zomba',
  lat: -15.386,
  lon: 35.319,
  timeZone: 'Africa/Blantyre',
}

// ---------- Public ----------

export async function getLocationSetting(request, env) {
  const row = await env.DB.prepare('SELECT value FROM settings WHERE key = ?')
    .bind('location')
    .first()

  const location = row ? JSON.parse(row.value) : DEFAULT_LOCATION
  return json({ location }, env)
}

// ---------- Admin ----------

export async function updateLocationSetting(request, env) {
  const body = await request.json().catch(() => ({}))
  const { city, lat, lon, timeZone } = body

  if (
    typeof city !== 'string' || !city.trim() ||
    typeof lat !== 'number' || Number.isNaN(lat) ||
    typeof lon !== 'number' || Number.isNaN(lon) ||
    typeof timeZone !== 'string' || !timeZone.trim()
  ) {
    return json({ error: 'city (string), lat/lon (numbers), and timeZone (string) are required' }, env, 400)
  }

  const value = JSON.stringify({ city: city.trim(), lat, lon, timeZone: timeZone.trim() })
  await env.DB.prepare(
    `INSERT INTO settings (key, value, updated_at) VALUES ('location', ?, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
  ).bind(value).run()

  return json({ location: JSON.parse(value) }, env)
}
