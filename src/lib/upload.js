import { auth } from '../firebase'

const API_BASE = import.meta.env.VITE_CMS_API_URL

/**
 * Uploads a File directly to ImageKit using a short-lived
 * token/expire/signature triple issued by the Worker (admin-only).
 * Returns the resulting public URL.
 */
export async function uploadImage(file, folder = 'blog') {
  const user = auth.currentUser
  if (!user) throw new Error('Not signed in')
  const idToken = await user.getIdToken()

  const authRes = await fetch(`${API_BASE}/api/admin/imagekit-auth`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${idToken}` },
  })
  const auth_ = await authRes.json().catch(() => ({}))
  if (!authRes.ok) throw new Error(auth_.error || 'Could not get upload authorization')

  const { token, expire, signature, publicKey } = auth_

  const formData = new FormData()
  formData.append('file', file)
  formData.append('fileName', file.name || `upload-${Date.now()}`)
  formData.append('publicKey', publicKey)
  formData.append('signature', signature)
  formData.append('expire', expire)
  formData.append('token', token)
  formData.append('folder', `/${folder}`)
  formData.append('useUniqueFileName', 'true')

  const uploadRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    body: formData,
  })
  const uploadData = await uploadRes.json().catch(() => ({}))
  if (!uploadRes.ok) throw new Error(uploadData.message || 'Upload failed')

  return uploadData.url
}
