import { json } from './cors.js'

/**
 * Issues a signed Cloudinary upload payload so the browser can upload
 * directly to Cloudinary without ever seeing the API secret. The secret
 * only ever touches this Worker (set via `wrangler secret put`).
 */
export async function getCloudinarySignature(request, env) {
  const body = await request.json().catch(() => ({}))
  const folder = (body.folder || 'portfolio').replace(/[^a-zA-Z0-9/_-]/g, '')
  const timestamp = Math.floor(Date.now() / 1000)

  // Cloudinary requires every param that will be sent to /image/upload
  // (except file, api_key, cloud_name, resource_type, signature) to be
  // included here, sorted alphabetically as key=value pairs.
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${env.CLOUDINARY_API_SECRET}`
  const signature = await sha256Hex(paramsToSign)

  return json(
    {
      signature,
      timestamp,
      folder,
      apiKey: env.CLOUDINARY_API_KEY,
      cloudName: env.CLOUDINARY_CLOUD_NAME,
    },
    env
  )
}

async function sha256Hex(message) {
  const data = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(hashBuffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}
