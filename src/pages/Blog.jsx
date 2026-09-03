import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { getPosts } from '../lib/api'
import { readingTime } from '../lib/readingTime'

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  // Filter state lives in the URL (?category=…) rather than component
  // state, so a filtered view can be shared, bookmarked, or reached via
  // the browser back/forward buttons — not just reachable by clicking.
  const activeCategory = searchParams.get('category') || 'All'

  function setActiveCategory(cat) {
    const next = new URLSearchParams(searchParams)
    if (cat === 'All') next.delete('category')
    else next.set('category', cat)
    setSearchParams(next)
  }

  useEffect(() => {
    // A slightly larger limit than the homepage preview so the category
    // filter below has the full recent set to work with client-side.
    getPosts({ limit: 50 })
      .then((data) => setPosts(data.posts))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [posts])

  const visiblePosts = useMemo(() => {
    if (activeCategory === 'All') return posts
    return posts.filter((p) => p.category === activeCategory)
  }, [posts, activeCategory])

  return (
    <>
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Writing</span>
              <h2 className="display">Notes on nutrition <br />and building software.</h2>
              <a href="/rss.xml" className="text-link blog-rss-link">RSS feed</a>
            </div>
          </Reveal>

          {loading && <p className="lead">Loading posts…</p>}
          {error && <p className="lead" style={{ color: '#e5484d' }}>{error}</p>}

          {!loading && !error && posts.length === 0 && (
            <Reveal delay={80}>
              <div className="blog-empty">
                <p className="lead">No posts yet — check back soon.</p>
              </div>
            </Reveal>
          )}

          {!loading && !error && categories.length > 2 && (
            <Reveal delay={40}>
              <div className="blog-filter-row" role="group" aria-label="Filter posts by category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={activeCategory === cat}
                    className={`blog-filter-chip${activeCategory === cat ? ' is-active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          <div className="blog-list">
            {visiblePosts.map((post, i) => (
              <Reveal key={post.id} delay={80 + i * 60}>
                <Link to={`/blog/${post.slug}`} className="blog-card">
                  {post.cover_image && (
                    <div className="blog-card-media">
                      <img src={post.cover_image} alt={post.title} loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="blog-card-body">
                    <span className="blog-card-date">
                      {post.featured && <span className="blog-card-featured">Featured</span>}
                      {post.category && <>{post.featured ? ' · ' : ''}{post.category}{' · '}</>}
                      {new Date(post.published_at).toLocaleDateString('en-GB', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                      {' · '}{readingTime(post.content)} min read
                    </span>
                    <h3 className="blog-card-title">{post.title}</h3>
                    {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                    {post.tags && (
                      <div className="chip-row">
                        {post.tags.split(',').filter(Boolean).map((tag) => (
                          <span className="chip" key={tag}>{tag.trim()}</span>
                        ))}
                      </div>
                    )}
                    <span className="text-link blog-card-cta">
                      Read post <ArrowRight/>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {!loading && !error && posts.length > 0 && visiblePosts.length === 0 && (
            <Reveal delay={80}>
              <div className="blog-empty">
                <p className="lead">No posts in this category yet.</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
