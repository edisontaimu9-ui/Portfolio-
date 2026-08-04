import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../lib/api'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data.posts))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ padding: '2rem' }}>Loading…</p>
  if (error) return <p style={{ padding: '2rem', color: 'crimson' }}>{error}</p>

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Blog</h1>
      {posts.length === 0 && <p>No posts yet — check back soon.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {posts.map((post) => (
          <article key={post.id}>
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                style={{ width: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: 8 }}
              />
            )}
            <h2>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p style={{ opacity: 0.7, fontSize: '0.85em' }}>
              {new Date(post.published_at).toLocaleDateString()}
            </p>
            {post.excerpt && <p>{post.excerpt}</p>}
          </article>
        ))}
      </div>
    </div>
  )
}
