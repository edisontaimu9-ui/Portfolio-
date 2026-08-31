import { auth } from '../firebase'

const API_BASE = import.meta.env.VITE_CMS_API_URL

/**
 * Uploads a File to Cloudinary using a short-lived signature issued by
 * the Worker (admin-only). Returns the resulting secure_url.
 */
export async function uploadToCloudinary(file, folder = 'portfolio') {
  const user = auth.currentUser
  if (!user) throw new Error('Not signed in')
  const token = await user.getIdToken()

  const sigRes = await fetch(`${API_BASE}/api/admin/cloudinary-signature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ folder }),
  })
  const sigData = await sigRes.json().catch(() => ({}))
  if (!sigRes.ok) throw new Error(sigData.error || 'Could not get upload signature')

  const { signature, timestamp, apiKey, cloudName, folder: signedFolder } = sigData

  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp)
  formData.append('signature', signature)
  formData.append('folder', signedFolder)

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })
  const uploadData = await uploadRes.json().catch(() => ({}))
  if (!uploadRes.ok) throw new Error(uploadData.error?.message || 'Upload failed')

  return uploadData.secure_url
}
