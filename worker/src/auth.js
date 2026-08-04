import { createRemoteJWKSet, jwtVerify } from 'jose'

// Google's public JWK set for Firebase ID tokens. `jose` caches this
// remotely and re-fetches automatically when keys rotate.
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
)

/**
 * Verifies a Firebase Auth ID token sent from the frontend and confirms
 * it belongs to the single allow-listed admin UID. Throws on any failure.
 * Returns the decoded token payload if valid.
 */
export async function requireAdmin(request, env) {
  const authHeader = request.headers.get('Authorization') || ''
  const match = authHeader.match(/^Bearer (.+)$/)
  if (!match) {
    throw new AuthError('Missing Authorization header', 401)
  }
  const token = match[1]

  let payload
  try {
    const result = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${env.FIREBASE_PROJECT_ID}`,
      audience: env.FIREBASE_PROJECT_ID,
    })
    payload = result.payload
  } catch {
    throw new AuthError('Invalid or expired token', 401)
  }

  // Firebase-specific sanity checks jose doesn't do for you
  if (!payload.sub || payload.auth_time > Math.floor(Date.now() / 1000)) {
    throw new AuthError('Invalid token claims', 401)
  }

  if (payload.sub !== env.ADMIN_UID) {
    throw new AuthError('Not authorized', 403)
  }

  return payload
}

export class AuthError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}
