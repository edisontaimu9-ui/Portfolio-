import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { getPosts } from '../lib/api'

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

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data.posts))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Writing</span>
              <h2 className="display">Notes on nutrition <br />and building software.</h2>
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

          <div className="blog-list">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={80 + i * 60}>
                <Link to={`/blog/${post.slug}`} className="blog-card">
                  {post.cover_image && (
                    <div className="blog-card-media">
                      <img src={post.cover_image} alt="" loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="blog-card-body">
                    <span className="blog-card-date">
                      {new Date(post.published_at).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
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
        </div>
      </section>
    </>
  )
}
