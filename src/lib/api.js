import { auth } from '../firebase'

const API_BASE = import.meta.env.VITE_CMS_API_URL // e.g. https://portfolio-cms-api.<subdomain>.workers.dev

async function request(path, { method = 'GET', body, auth: needsAuth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (needsAuth) {
    const user = auth.currentUser
    if (!user) throw new Error('Not signed in')
    const token = await user.getIdToken()
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

// Public
export const getPosts = (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  return request(`/api/posts${qs ? `?${qs}` : ''}`)
}
export const getPost = (slug) => request(`/api/posts/${slug}`)
export const trackView = (slug) => request(`/api/posts/${slug}/view`, { method: 'POST' })
export const likePost = (slug) => request(`/api/posts/${slug}/like`, { method: 'POST' })

// Admin
export const adminGetPosts = () => request('/api/admin/posts', { auth: true })
export const adminGetPost = (id) => request(`/api/admin/posts/${id}`, { auth: true })
export const adminCreatePost = (post) =>
  request('/api/admin/posts', { method: 'POST', body: post, auth: true })
export const adminUpdatePost = (id, post) =>
  request(`/api/admin/posts/${id}`, { method: 'PUT', body: post, auth: true })
export const adminDeletePost = (id) =>
  request(`/api/admin/posts/${id}`, { method: 'DELETE', auth: true })
