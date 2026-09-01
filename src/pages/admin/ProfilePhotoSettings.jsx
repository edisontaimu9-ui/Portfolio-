import { useEffect, useRef, useState } from 'react'
import {
  getProfilePhotoSetting,
  adminUpdateProfilePhotoSetting,
  adminDeleteProfilePhotoSetting,
} from '../../lib/api'
import { uploadImage } from '../../lib/upload'

// Lets the site owner swap the hero profile photo from the admin UI
// instead of replacing src/assets/profile-photo.jpg and redeploying.
// Selecting a file only previews it locally — nothing is uploaded or
// saved until "Save" is pressed.
export default function ProfilePhotoSettings() {
  const [saved, setSaved] = useState(null) // currently live on the site
  const [file, setFile] = useState(null) // pending selection, not yet saved
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('idle') // idle | saving | removing
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    getProfilePhotoSetting()
      .then((data) => setSaved(data.url))
      .catch(() => { /* non-fatal — falls back to the bundled default photo */ })
  }, [])

  // Clean up the object URL when it's replaced or the component unmounts.
  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }
  }, [previewUrl])

  function handleSelect(e) {
    const picked = e.target.files?.[0]
    e.target.value = ''
    if (!picked) return
    setError('')
    setFile(picked)
    setPreviewUrl(URL.createObjectURL(picked))
  }

  function handleCancel() {
    setFile(null)
    setPreviewUrl(null)
    setError('')
  }

  async function handleSave() {
    if (!file) return
    setStatus('saving')
    setError('')
    try {
      const url = await uploadImage(file, 'profile')
      await adminUpdateProfilePhotoSetting(url)
      setSaved(url)
      setFile(null)
      setPreviewUrl(null)
    } catch (err) {
      setError(err.message || 'Something went wrong saving the photo.')
    } finally {
      setStatus('idle')
    }
  }

  async function handleRemove() {
    setStatus('removing')
    setError('')
    try {
      await adminDeleteProfilePhotoSetting()
      setSaved(null)
    } catch (err) {
      setError(err.message || 'Something went wrong removing the photo.')
    } finally {
      setStatus('idle')
    }
  }

  const busy = status === 'saving' || status === 'removing'

  return (
    <div className="admin-card" style={{ marginBottom: 24 }}>
      <div className="admin-card-main" style={{ marginBottom: 12 }}>
        <strong className="admin-card-title">Profile photo</strong>
      </div>
      <p style={{ fontSize: '.85rem', color: 'var(--text-subtle)', marginTop: 0, marginBottom: 12 }}>
        The portrait shown in the home page hero section.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '.75rem', color: 'var(--text-subtle)', marginBottom: 4 }}>
            {previewUrl ? 'New (unsaved)' : 'Current'}
          </div>
          {(previewUrl || saved) ? (
            <img
              src={previewUrl || saved}
              alt="Profile"
              style={{
                height: 72, width: 72, borderRadius: '50%', objectFit: 'cover',
                border: previewUrl ? '2px solid var(--accent, #4a90d9)' : 'none',
              }}
            />
          ) : (
            <div style={{
              height: 72, width: 72, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '.7rem', color: 'var(--text-subtle)', border: '1px dashed var(--text-subtle)',
            }}>
              default
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {!file ? (
            <>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleSelect} disabled={busy} />
              {saved && (
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handleRemove}
                  disabled={busy}
                >
                  {status === 'removing' ? 'Removing…' : 'Remove (use default)'}
                </button>
              )}
            </>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleSave} disabled={busy}>
                {status === 'saving' ? 'Saving…' : 'Save'}
              </button>
              <button type="button" className="btn btn-sm" onClick={handleCancel} disabled={busy}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {error && <p className="admin-error" style={{ marginTop: 10 }}>{error}</p>}
    </div>
  )
}
