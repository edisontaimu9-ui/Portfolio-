import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminGetPost, adminCreatePost, adminUpdatePost } from '../../lib/api'

const EMPTY = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  tags: '',
  status: 'draft',
  author: '',
  category: '',
  featured: false,
  drop_cap: false,
}

export default function PostEditor() {
  const { id } = useParams() // undefined => new post
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(!!id)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    adminGetPost(id)
      .then((data) => setForm(data.post))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function updateChecked(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.checked }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (id) {
        await adminUpdatePost(id, form)
      } else {
        await adminCreatePost(form)
      }
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p style={{ padding: '2rem' }}>Loading…</p>

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>{id ? 'Edit Post' : 'New Post'}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label>
          Title
          <input value={form.title} onChange={update('title')} required style={{ display: 'block', width: '100%' }} />
        </label>
        <label>
          Slug (leave blank to auto-generate from title)
          <input value={form.slug || ''} onChange={update('slug')} style={{ display: 'block', width: '100%' }} />
        </label>
        <label>
          Excerpt
          <textarea value={form.excerpt} onChange={update('excerpt')} rows={2} style={{ display: 'block', width: '100%' }} />
        </label>
        <label>
          Content (Markdown)
          <textarea
            value={form.content}
            onChange={update('content')}
            rows={16}
            required
            style={{ display: 'block', width: '100%', fontFamily: 'monospace' }}
          />
        </label>
        <label>
          Cover image URL
          <input value={form.cover_image || ''} onChange={update('cover_image')} style={{ display: 'block', width: '100%' }} />
        </label>
        <label>
          Tags (comma-separated)
          <input value={form.tags || ''} onChange={update('tags')} style={{ display: 'block', width: '100%' }} />
        </label>
        <label>
          Author (leave blank to use the site default)
          <input value={form.author || ''} onChange={update('author')} style={{ display: 'block', width: '100%' }} />
        </label>
        <label>
          Category
          <input value={form.category || ''} onChange={update('category')} style={{ display: 'block', width: '100%' }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" checked={!!form.featured} onChange={updateChecked('featured')} />
          Featured
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" checked={!!form.drop_cap} onChange={updateChecked('drop_cap')} />
          Drop cap on opening paragraph
        </label>
        <label>
          Status
          <select value={form.status} onChange={update('status')} style={{ display: 'block' }}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>

        {error && <p style={{ color: 'crimson' }}>{error}</p>}

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button type="button" onClick={() => navigate('/admin')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
