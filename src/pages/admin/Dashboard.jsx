import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminGetPosts, adminDeletePost } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const { logout } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    try {
      const data = await adminGetPosts()
      setPosts(data.posts)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await adminDeletePost(id)
    load()
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Posts</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/admin/new">
            <button>New Post</button>
          </Link>
          <button onClick={logout}>Sign out</button>
        </div>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #eee',
              padding: '0.75rem 0',
            }}
          >
            <div>
              <strong>{post.title}</strong>{' '}
              <span style={{ fontSize: '0.8em', opacity: 0.7 }}>({post.status})</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to={`/admin/edit/${post.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {!loading && posts.length === 0 && <p>No posts yet.</p>}
    </div>
  )
}
