import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminGetPosts, adminDeletePost } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const { logout } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

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
    setDeletingId(id)
    try {
      await adminDeletePost(id)
      await load()
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="admin-page">
      <div className="container container-narrow">
        {/* Utility bar — kept apart from the primary action below */}
        <div className="admin-utility-bar">
          <Link to="/" className="admin-utility-link">← Back to site</Link>
          <button className="admin-utility-link admin-signout" onClick={logout}>
            Sign out
          </button>
        </div>

        <div className="admin-header">
          <div>
            <h1 className="display admin-title">Posts</h1>
            <p className="admin-subtitle">
              {loading ? 'Loading…' : `${posts.length} post${posts.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <Link to="/admin/new" className="btn btn-primary admin-new-post">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New Post
          </Link>
        </div>

        {error && <p className="admin-error">{error}</p>}

        {loading && (
          <div className="admin-list">
            {[0, 1, 2].map((i) => <div className="admin-card admin-skeleton" key={i} />)}
          </div>
        )}

        {!loading && posts.length === 0 && !error && (
          <div className="admin-empty">
            <p>No posts yet.</p>
            <Link to="/admin/new" className="btn btn-ghost btn-sm" style={{ marginTop: 16 }}>
              Write your first post
            </Link>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <ul className="admin-list">
            {posts.map((post) => (
              <li className="admin-card" key={post.id}>
                <div className="admin-card-main">
                  <span className={`chip admin-status-chip ${post.status === 'published' ? '' : 'is-draft'}`}>
                    {post.status}
                  </span>
                  <strong className="admin-card-title">{post.title}</strong>
                </div>
                <div className="admin-card-actions">
                  <Link to={`/admin/edit/${post.id}`} className="btn btn-ghost btn-sm">
                    Edit
                  </Link>
                  <button
                    className="btn btn-ghost btn-sm admin-delete-btn"
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                  >
                    {deletingId === post.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
