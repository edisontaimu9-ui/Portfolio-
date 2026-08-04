import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { getPost } from '../lib/api'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPost(slug)
      .then((data) => setPost(data.post))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <p style={{ padding: '2rem' }}>Loading…</p>
  if (error || !post) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Post not found.</p>
        <Link to="/blog">Back to blog</Link>
      </div>
    )
  }

  return (
    <article style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
      <Link to="/blog">&larr; Back to blog</Link>
      <h1>{post.title}</h1>
      <p style={{ opacity: 0.7, fontSize: '0.85em' }}>
        {new Date(post.published_at).toLocaleDateString()}
      </p>
      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} style={{ width: '100%', borderRadius: 8 }} />
      )}
      <div dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }} />
    </article>
  )
}
