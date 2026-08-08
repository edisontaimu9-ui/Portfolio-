import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import Reveal from '../components/Reveal'
import { getPost } from '../lib/api'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getPost(slug)
      .then((data) => setPost(data.post))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    const prev = document.title
    if (post) document.title = `${post.title} — Edison Taimu`
    return () => { document.title = prev }
  }, [post])

  if (loading) {
    return (
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container"><p className="lead">Loading…</p></div>
      </section>
    )
  }

  if (error || !post) {
    return (
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <p className="lead">Post not found.</p>
          <Link to="/blog" className="text-link" style={{ marginTop: 16 }}>
            Back to blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section" style={{ borderTop: 'none' }}>
      <div className="container container-narrow">
        <Reveal>
          <Link to="/blog" className="page-back-link" style={{ marginBottom: 32, display: 'inline-flex' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
            </svg>
            Back to blog
          </Link>

          <span className="blog-card-date">
            {new Date(post.published_at).toLocaleDateString(undefined, {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </span>
          <h1 className="display" style={{ marginTop: 8, marginBottom: 24 }}>{post.title}</h1>

          {post.tags && (
            <div className="chip-row" style={{ marginBottom: 32 }}>
              {post.tags.split(',').filter(Boolean).map((tag) => (
                <span className="chip" key={tag}>{tag.trim()}</span>
              ))}
            </div>
          )}
        </Reveal>

        {post.cover_image && (
          <Reveal delay={60}>
            <div className="blog-post-cover">
              <img src={post.cover_image} alt={post.title} loading="lazy" decoding="async" />
            </div>
          </Reveal>
        )}

        <Reveal delay={100}>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
          />
        </Reveal>
      </div>
    </section>
  )
}
