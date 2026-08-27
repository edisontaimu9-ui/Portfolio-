import { useEffect, useState } from 'react'
import { getLocationSetting, adminUpdateLocationSetting } from '../../lib/api'

// Lets the site owner change their work location (used by the home-page
// day/night widget) from the admin UI instead of editing and redeploying
// frontend code every time they travel. City name goes in; lat/lon/timezone
// come back from Open-Meteo's free geocoding API (no key needed), then get
// saved to the CMS API's settings table.
export default function LocationSettings() {
  const [current, setCurrent] = useState(null)
  const [cityInput, setCityInput] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | saving | error
  const [error, setError] = useState('')

  useEffect(() => {
    getLocationSetting()
      .then((data) => setCurrent(data.location))
      .catch(() => { /* non-fatal — the form still works without a current value shown */ })
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    const city = cityInput.trim()
    if (!city) return

    setStatus('loading')
    setError('')

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      )
      const geoJson = await geoRes.json()
      const match = geoJson.results?.[0]
      if (!match) {
        setError(`Couldn't find "${city}" — try a more specific name (e.g. add the country).`)
        setStatus('error')
        return
      }

      setStatus('saving')
      const location = {
        city: match.name,
        lat: match.latitude,
        lon: match.longitude,
        timeZone: match.timezone,
      }
      await adminUpdateLocationSetting(location)
      setCurrent(location)
      setCityInput('')
      setStatus('idle')
    } catch (err) {
      setError(err.message || 'Something went wrong saving the location.')
      setStatus('error')
    }
  }

  return (
    <div className="admin-card" style={{ marginBottom: 24 }}>
      <div className="admin-card-main" style={{ marginBottom: 12 }}>
        <strong className="admin-card-title">Location</strong>
      </div>
      <p style={{ fontSize: '.85rem', color: 'var(--text-subtle)', marginTop: 0, marginBottom: 12 }}>
        Drives the day/night widget on the home page — sunrise/sunset, live weather, and the clock.
        {current && (
          <> Currently set to <strong>{current.city}</strong> ({current.timeZone}).</>
        )}
      </p>

      <form onSubmit={handleSave} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="e.g. Blantyre, Malawi"
          disabled={status === 'loading' || status === 'saving'}
          style={{ flex: '1 1 220px' }}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={!cityInput.trim() || status === 'loading' || status === 'saving'}
        >
          {status === 'loading' ? 'Looking up…' : status === 'saving' ? 'Saving…' : 'Update location'}
        </button>
      </form>

      {error && <p className="admin-error" style={{ marginTop: 10 }}>{error}</p>}
    </div>
  )
}
