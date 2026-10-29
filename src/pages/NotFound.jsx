import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from './PageLayout'

// Unknown URLs used to render the home page (a "soft 404"). This shows a
// real not-found message and tells search engines not to index the URL.
export default function NotFound() {
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]')
    const created = !meta
    const prev = meta ? meta.getAttribute('content') : null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'robots')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', 'noindex, follow')
    return () => {
      if (created) meta.remove()
      else meta.setAttribute('content', prev)
    }
  }, [])

  return (
    <PageLayout title="Page not found">
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <h1 className="display">Page not found</h1>
          <p className="lead">That page doesn’t exist or has moved.</p>
          <Link to="/" className="text-link" style={{ marginTop: 16 }}>
            Back to home
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
