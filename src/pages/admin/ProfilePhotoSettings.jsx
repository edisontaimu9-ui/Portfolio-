import { useEffect, useState } from 'react'
import { getProfilePhotoSetting, adminUpdateProfilePhotoSetting } from '../../lib/api'
import { uploadImage } from '../../lib/upload'

// Lets the site owner swap the hero profile photo from the admin UI
// instead of replacing src/assets/profile-photo.jpg and redeploying.
export default function ProfilePhotoSettings() {
  const [current, setCurrent] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getProfilePhotoSetting()
      .then((data) => setCurrent(data.url))
      .catch(() => { /* non-fatal — falls back to the bundled default photo */ })
  }, [])

  async function handleUpload(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const url = await uploadImage(file, 'profile')
      await adminUpdateProfilePhotoSetting(url)
      setCurrent(url)
    } catch (err) {
      setError(err.message || 'Something went wrong uploading the photo.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="admin-card" style={{ marginBottom: 24 }}>
      <div className="admin-card-main" style={{ marginBottom: 12 }}>
        <strong className="admin-card-title">Profile photo</strong>
      </div>
      <p style={{ fontSize: '.85rem', color: 'var(--text-subtle)', marginTop: 0, marginBottom: 12 }}>
        The portrait shown in the home page hero section.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {current && (
          <img
            src={current}
            alt="Current profile"
            style={{ height: 56, width: 56, borderRadius: '50%', objectFit: 'cover' }}
          />
        )}
        <div>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
          {uploading && <div style={{ fontSize: '.85rem', opacity: 0.7, marginTop: 4 }}>Uploading…</div>}
        </div>
      </div>

      {error && <p className="admin-error" style={{ marginTop: 10 }}>{error}</p>}
    </div>
  )
}
