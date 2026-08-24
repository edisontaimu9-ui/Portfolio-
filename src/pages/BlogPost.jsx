import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import Reveal from '../components/Reveal'
import { getPost, getPosts, trackView, likePost } from '../lib/api'
import { readingTime } from '../lib/readingTime'

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}

function ArrowLeft() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
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
  // Used only to compute Older/Newer navigation and Related articles —
  // a personal-blog-scale post count makes fetching the recent set and
  // deriving these client-side simpler than adding dedicated endpoints.
  const [allPosts, setAllPosts] = useState([])

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

  useEffect(() => {
    getPosts({ limit: 50 })
      .then((data) => setAllPosts(data.posts || []))
      .catch(() => setAllPosts([]))
  }, [])

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

  // allPosts is already ordered newest-first by the API.
  const { olderPost, newerPost } = useMemo(() => {
    const idx = allPosts.findIndex((p) => p.slug === slug)
    if (idx === -1) return { olderPost: null, newerPost: null }
    return {
      newerPost: idx > 0 ? allPosts[idx - 1] : null,
      olderPost: idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
    }
  }, [allPosts, slug])

  const relatedPosts = useMemo(() => {
    if (!post) return []
    const currentTags = new Set((post.tags || '').split(',').map((t) => t.trim()).filter(Boolean))
    return allPosts
      .filter((p) => p.slug !== slug)
      .filter((p) => {
        if (post.category && p.category === post.category) return true
        const tags = (p.tags || '').split(',').map((t) => t.trim()).filter(Boolean)
        return tags.some((t) => currentTags.has(t))
      })
      .slice(0, 3)
  }, [allPosts, post, slug])

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
    <>
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container container-narrow">
          <Reveal>
            <Link to="/blog" className="page-back-link" style={{ marginBottom: 32, display: 'flex' }}>
              <ArrowLeft/>
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

            <h1 className="display" style={{ marginTop: 8, marginBottom: post.excerpt ? 12 : 24 }}>{post.title}</h1>

            {post.excerpt && (
              <p className="lead blog-post-subtitle" style={{ marginBottom: 24 }}>{post.excerpt}</p>
            )}

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

          {(olderPost || newerPost) && (
            <Reveal delay={140}>
              <nav className="blog-post-adjacent-nav" aria-label="More posts">
                {newerPost ? (
                  <Link to={`/blog/${newerPost.slug}`} className="blog-post-adjacent-link is-newer">
                    <span className="blog-post-adjacent-label"><ArrowLeft/> Newer</span>
                    <span className="blog-post-adjacent-title">{newerPost.title}</span>
                  </Link>
                ) : <span />}
                {olderPost && (
                  <Link to={`/blog/${olderPost.slug}`} className="blog-post-adjacent-link is-older">
                    <span className="blog-post-adjacent-label">Older <ArrowRight/></span>
                    <span className="blog-post-adjacent-title">{olderPost.title}</span>
                  </Link>
                )}
              </nav>
            </Reveal>
          )}
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section blog-related-section">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">Related</span>
                <h2 className="display">Keep reading.</h2>
              </div>
            </Reveal>
            <div className="blog-preview-grid">
              {relatedPosts.map((rp, i) => (
                <Reveal key={rp.id} delay={i * 60}>
                  <Link to={`/blog/${rp.slug}`} className="blog-preview-card">
                    {rp.cover_image && (
                      <div className="blog-preview-media">
                        <img src={rp.cover_image} alt={rp.title} loading="lazy" decoding="async" />
                      </div>
                    )}
                    <span className="blog-card-date">
                      {new Date(rp.published_at).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </span>
                    <h3 className="blog-preview-title">{rp.title}</h3>
                    {rp.excerpt && <p className="blog-card-excerpt">{rp.excerpt}</p>}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
