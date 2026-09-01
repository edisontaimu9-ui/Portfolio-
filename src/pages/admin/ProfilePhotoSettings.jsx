import { useEffect, useState } from 'react'
import {
  getProfilePhotoSetting,
  adminUpdateProfilePhotoSetting,
  adminDeleteProfilePhotoSetting,
} from '../../lib/api'
import { uploadImage } from '../../lib/upload'
import ImageCropper from '../../components/ImageCropper'

// Lets the site owner swap the hero profile photo from the admin UI.
// Selecting a file opens a WhatsApp-style crop/zoom/pan step; the result
// is only previewed until "Save" is pressed — nothing uploads until then.
export default function ProfilePhotoSettings() {
  const [saved, setSaved] = useState(null) // currently live on the site
  const [originalFile, setOriginalFile] = useState(null) // kept so "Adjust" can re-open the cropper
  const [croppedBlob, setCroppedBlob] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [showCropper, setShowCropper] = useState(false)
  const [status, setStatus] = useState('idle') // idle | saving | removing
  const [error, setError] = useState('')

  useEffect(() => {
    getProfilePhotoSetting()
      .then((data) => setSaved(data.url))
      .catch(() => { /* non-fatal — falls back to the bundled default photo */ })
  }, [])

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }
  }, [previewUrl])

  function handleSelect(e) {
    const picked = e.target.files?.[0]
    e.target.value = ''
    if (!picked) return
    setError('')
    setOriginalFile(picked)
    setShowCropper(true)
  }

  function handleCropCancel() {
    setShowCropper(false)
    // Only clear the pending selection if this was the first crop —
    // re-opening via "Adjust" should leave the existing preview intact.
    if (!croppedBlob) setOriginalFile(null)
  }

  function handleCropConfirm(blob) {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setCroppedBlob(blob)
    setPreviewUrl(URL.createObjectURL(blob))
    setShowCropper(false)
  }

  function handleDiscardPending() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setOriginalFile(null)
    setCroppedBlob(null)
    setPreviewUrl(null)
    setError('')
  }

  async function handleSave() {
    if (!croppedBlob) return
    setStatus('saving')
    setError('')
    try {
      const file = new File([croppedBlob], `profile-${Date.now()}.jpg`, { type: 'image/jpeg' })
      const url = await uploadImage(file, 'profile')
      await adminUpdateProfilePhotoSetting(url)
      setSaved(url)
      handleDiscardPending()
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
                border: previewUrl ? '2px solid var(--accent)' : 'none',
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
          {!previewUrl ? (
            <>
              <input type="file" accept="image/*" onChange={handleSelect} disabled={busy} />
              {saved && (
                <button type="button" className="btn btn-sm" onClick={handleRemove} disabled={busy}>
                  {status === 'removing' ? 'Removing…' : 'Remove (use default)'}
                </button>
              )}
            </>
          ) : (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleSave} disabled={busy}>
                {status === 'saving' ? 'Saving…' : 'Save'}
              </button>
              <button type="button" className="btn btn-sm" onClick={() => setShowCropper(true)} disabled={busy}>
                Adjust
              </button>
              <button type="button" className="btn btn-sm" onClick={handleDiscardPending} disabled={busy}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {error && <p className="admin-error" style={{ marginTop: 10 }}>{error}</p>}

      {showCropper && originalFile && (
        <ImageCropper file={originalFile} onCancel={handleCropCancel} onConfirm={handleCropConfirm} />
      )}
    </div>
  )
}
