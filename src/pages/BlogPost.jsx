import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import Reveal from '../components/Reveal'
import { getPost, trackView, likePost } from '../lib/api'
import { readingTime } from '../lib/readingTime'

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>
    </svg>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    setLoading(true)
    getPost(slug)
      .then((data) => {
        setPost(data.post)
        setLikeCount(data.post.likes || 0)
        setLiked(localStorage.getItem(`liked:${slug}`) === '1')
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  // Track a view once per browser session per post — avoids inflating
  // the count on refresh or when the reader navigates back and forth.
  useEffect(() => {
    if (!post) return
    const key = `viewed:${slug}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
    trackView(slug).catch(() => {}) // best-effort, never block the reader on this
  }, [post, slug])

  useEffect(() => {
    const prev = document.title
    if (post) document.title = `${post.title} — Edison Taimu`
    return () => { document.title = prev }
  }, [post])

  async function handleLike() {
    if (liked) return
    setLiked(true)
    setLikeCount((n) => n + 1)
    localStorage.setItem(`liked:${slug}`, '1')
    try {
      const data = await likePost(slug)
      setLikeCount(data.likes)
    } catch {
      // keep the optimistic UI even if the request failed — worst case
      // the count is off by one until the reader's next visit
    }
  }

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
          <Link to="/blog" className="page-back-link" style={{ marginBottom: 32, display: 'flex' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
            </svg>
            Back to blog
          </Link>

          {post.category && <span className="eyebrow">{post.category}</span>}

          <div className="blog-post-meta">
            {post.author && (
              <>
                <span className="blog-card-date">{post.author}</span>
                <span className="blog-post-meta-dot">·</span>
              </>
            )}
            <span className="blog-card-date">
              {new Date(post.published_at).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
            <span className="blog-post-meta-dot">·</span>
            <span className="blog-card-date">{readingTime(post.content)} min read</span>
          </div>

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
            className={`blog-post-content${post.drop_cap ? ' has-drop-cap' : ''}`}
            dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="blog-post-footer">
            <button
              className={`like-btn ${liked ? 'is-liked' : ''}`}
              onClick={handleLike}
              disabled={liked}
              aria-pressed={liked}
            >
              <HeartIcon filled={liked} />
              {likeCount > 0 ? likeCount : ''} {liked ? 'Liked' : 'Like this post'}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
