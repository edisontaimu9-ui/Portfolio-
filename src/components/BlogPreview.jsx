import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { getPosts } from '../lib/api'

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}

export default function BlogPreview() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts({ limit: 3 })
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]))
  }, [])

  if (posts.length === 0) return null

  return (
    <section className="section blog-preview-section">
      <div className="container">
        <Reveal>
          <div className="section-head blog-preview-head">
            <div>
              <span className="eyebrow">Writing</span>
              <h2 className="display">From the blog.</h2>
            </div>
            <Link to="/blog" className="text-link">
              View all posts <ArrowRight/>
            </Link>
          </div>
        </Reveal>

        <div className="blog-preview-grid">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 60}>
              <Link to={`/blog/${post.slug}`} className="blog-preview-card">
                {post.cover_image && (
                  <div className="blog-preview-media">
                    <img src={post.cover_image} alt={post.title} loading="lazy" decoding="async" />
                  </div>
                )}
                <span className="blog-card-date">
                  {post.featured && <span className="blog-card-featured">Featured</span>}
                  {post.category && <>{post.featured ? ' · ' : ''}{post.category}{' · '}</>}
                  {new Date(post.published_at).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
                <h3 className="blog-preview-title">{post.title}</h3>
                {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
