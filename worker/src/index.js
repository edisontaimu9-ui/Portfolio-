import { corsHeaders, json } from './cors.js'
import { requireAdmin, AuthError } from './auth.js'
import {
  listPublishedPosts,
  getPublishedPost,
  trackPostView,
  likePost,
  adminListPosts,
  adminGetPost,
  adminCreatePost,
  adminUpdatePost,
  adminDeletePost,
} from './posts.js'
import { getLocationSetting, updateLocationSetting } from './settings.js'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/+$/, '') || '/'
    const method = request.method

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env) })
    }

    try {
      // ---- Public blog endpoints ----
      if (path === '/api/posts' && method === 'GET') {
        return await listPublishedPosts(request, env)
      }
      const slugMatch = path.match(/^\/api\/posts\/([^/]+)$/)
      if (slugMatch && method === 'GET') {
        return await getPublishedPost(request, env, slugMatch[1])
      }
      const viewMatch = path.match(/^\/api\/posts\/([^/]+)\/view$/)
      if (viewMatch && method === 'POST') {
        return await trackPostView(request, env, viewMatch[1])
      }
      const likeMatch = path.match(/^\/api\/posts\/([^/]+)\/like$/)
      if (likeMatch && method === 'POST') {
        return await likePost(request, env, likeMatch[1])
      }
      if (path === '/api/settings/location' && method === 'GET') {
        return await getLocationSetting(request, env)
      }

      // ---- Admin endpoints (Firebase-authenticated) ----
      if (path.startsWith('/api/admin/')) {
        await requireAdmin(request, env)

        if (path === '/api/admin/posts' && method === 'GET') {
          return await adminListPosts(request, env)
        }
        if (path === '/api/admin/posts' && method === 'POST') {
          return await adminCreatePost(request, env)
        }
        const idMatch = path.match(/^\/api\/admin\/posts\/(\d+)$/)
        if (idMatch && method === 'GET') {
          return await adminGetPost(request, env, idMatch[1])
        }
        if (idMatch && method === 'PUT') {
          return await adminUpdatePost(request, env, idMatch[1])
        }
        if (idMatch && method === 'DELETE') {
          return await adminDeletePost(request, env, idMatch[1])
        }
        if (path === '/api/admin/settings/location' && method === 'PUT') {
          return await updateLocationSetting(request, env)
        }
      }

      return json({ error: 'Not found' }, env, 404)
    } catch (err) {
      if (err instanceof AuthError) {
        return json({ error: err.message }, env, err.status)
      }
      console.error(err)
      return json({ error: 'Internal server error' }, env, 500)
    }
  },
}
