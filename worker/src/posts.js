import { json } from './cors.js'

const PUBLIC_COLUMNS =
  'id, slug, title, excerpt, content, cover_image, tags, status, published_at, created_at, updated_at'

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// ---------- Public ----------

export async function listPublishedPosts(request, env) {
  const url = new URL(request.url)
  const tag = url.searchParams.get('tag')
  const limit = Math.min(Number(url.searchParams.get('limit')) || 20, 50)
  const offset = Number(url.searchParams.get('offset')) || 0

  let query = `SELECT ${PUBLIC_COLUMNS} FROM posts WHERE status = 'published'`
  const params = []
  if (tag) {
    query += ` AND (',' || tags || ',') LIKE ?`
    params.push(`%,${tag},%`)
  }
  query += ' ORDER BY published_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)

  const { results } = await env.DB.prepare(query).bind(...params).all()
  return json({ posts: results }, env)
}

export async function getPublishedPost(request, env, slug) {
  const post = await env.DB.prepare(
    `SELECT ${PUBLIC_COLUMNS} FROM posts WHERE slug = ? AND status = 'published'`
  )
    .bind(slug)
    .first()

  if (!post) return json({ error: 'Not found' }, env, 404)
  return json({ post }, env)
}

// ---------- Admin ----------

export async function adminListPosts(request, env) {
  const { results } = await env.DB.prepare(
    `SELECT ${PUBLIC_COLUMNS} FROM posts ORDER BY updated_at DESC`
  ).all()
  return json({ posts: results }, env)
}

export async function adminGetPost(request, env, id) {
  const post = await env.DB.prepare(`SELECT ${PUBLIC_COLUMNS} FROM posts WHERE id = ?`)
    .bind(id)
    .first()
  if (!post) return json({ error: 'Not found' }, env, 404)
  return json({ post }, env)
}

export async function adminCreatePost(request, env) {
  const body = await request.json()
  const { title, excerpt = '', content, cover_image = '', tags = '', status = 'draft' } = body

  if (!title || !content) {
    return json({ error: 'title and content are required' }, env, 400)
  }

  const slug = body.slug ? slugify(body.slug) : slugify(title)
  const now = new Date().toISOString()
  const published_at = status === 'published' ? now : null

  try {
    const result = await env.DB.prepare(
      `INSERT INTO posts (slug, title, excerpt, content, cover_image, tags, status, published_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(slug, title, excerpt, content, cover_image, tags, status, published_at, now, now)
      .run()

    const post = await env.DB.prepare(`SELECT ${PUBLIC_COLUMNS} FROM posts WHERE id = ?`)
      .bind(result.meta.last_row_id)
      .first()
    return json({ post }, env, 201)
  } catch (err) {
    if (String(err.message).includes('UNIQUE')) {
      return json({ error: 'A post with that slug already exists' }, env, 409)
    }
    return json({ error: 'Failed to create post' }, env, 500)
  }
}

export async function adminUpdatePost(request, env, id) {
  const existing = await env.DB.prepare('SELECT * FROM posts WHERE id = ?').bind(id).first()
  if (!existing) return json({ error: 'Not found' }, env, 404)

  const body = await request.json()
  const title = body.title ?? existing.title
  const excerpt = body.excerpt ?? existing.excerpt
  const content = body.content ?? existing.content
  const cover_image = body.cover_image ?? existing.cover_image
  const tags = body.tags ?? existing.tags
  const status = body.status ?? existing.status
  const slug = body.slug ? slugify(body.slug) : existing.slug

  const now = new Date().toISOString()
  let published_at = existing.published_at
  if (status === 'published' && existing.status !== 'published') {
    published_at = now // first time being published
  } else if (status === 'draft') {
    published_at = null
  }

  try {
    await env.DB.prepare(
      `UPDATE posts SET slug=?, title=?, excerpt=?, content=?, cover_image=?, tags=?, status=?, published_at=?, updated_at=?
       WHERE id = ?`
    )
      .bind(slug, title, excerpt, content, cover_image, tags, status, published_at, now, id)
      .run()

    const post = await env.DB.prepare(`SELECT ${PUBLIC_COLUMNS} FROM posts WHERE id = ?`)
      .bind(id)
      .first()
    return json({ post }, env)
  } catch (err) {
    if (String(err.message).includes('UNIQUE')) {
      return json({ error: 'A post with that slug already exists' }, env, 409)
    }
    return json({ error: 'Failed to update post' }, env, 500)
  }
}

export async function adminDeletePost(request, env, id) {
  const existing = await env.DB.prepare('SELECT id FROM posts WHERE id = ?').bind(id).first()
  if (!existing) return json({ error: 'Not found' }, env, 404)

  await env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(id).run()
  return json({ ok: true }, env)
}
