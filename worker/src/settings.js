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

// ---------- Profile photo ----------
// Same generic `settings` table, key 'profile_photo', value is just the
// image URL (from ImageKit) as a plain string.

export async function getProfilePhotoSetting(request, env) {
  const row = await env.DB.prepare('SELECT value FROM settings WHERE key = ?')
    .bind('profile_photo')
    .first()

  return json({ url: row ? row.value : null }, env)
}

export async function updateProfilePhotoSetting(request, env) {
  const body = await request.json().catch(() => ({}))
  const { url } = body

  if (typeof url !== 'string' || !url.trim()) {
    return json({ error: 'url (string) is required' }, env, 400)
  }

  const trimmed = url.trim()
  await env.DB.prepare(
    `INSERT INTO settings (key, value, updated_at) VALUES ('profile_photo', ?, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
  ).bind(trimmed).run()

  return json({ url: trimmed }, env)
}

export async function deleteProfilePhotoSetting(request, env) {
  await env.DB.prepare('DELETE FROM settings WHERE key = ?').bind('profile_photo').run()
  return json({ url: null }, env)
}
