import { json } from './cors.js'

/**
 * ImageKit's signed-upload scheme: the client uploads directly to
 * ImageKit with a token + expire + signature triple. The signature is
 * HMAC-SHA1(token + expire, privateKey), computed here so the private
 * key never leaves the Worker.
 * https://imagekit.io/docs/api-reference/upload-file/upload-file#Request-signature
 */
export async function getImageKitAuth(request, env) {
  const token = crypto.randomUUID()
  const expire = Math.floor(Date.now() / 1000) + 60 * 10 // 10 minutes

  const signature = await hmacSha1Hex(token + expire, env.IMAGEKIT_PRIVATE_KEY)

  return json(
    {
      token,
      expire,
      signature,
      publicKey: env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
    },
    env
  )
}

async function hmacSha1Hex(message, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  )
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  return [...new Uint8Array(signatureBuffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}
