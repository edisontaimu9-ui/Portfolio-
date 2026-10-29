import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { seoForPath } from '../data/seo'

export default function PageLayout({ title, children }) {
  const { pathname } = useLocation()
  // Keyword-rich title shared with the prerendered HTML (src/data/seo.js);
  // falls back to the plain "<title> | Edison Taimu" for unlisted pages.
  const seoTitle = seoForPath(pathname)?.title

  useEffect(() => {
    const prev = document.title
    if (seoTitle) document.title = seoTitle
    else if (title) document.title = `${title} | Edison Taimu`
    return () => { document.title = prev }
  }, [title, seoTitle])

  return (
    <div className="page-enter">
      <div className="container page-back-row">
        <Link to="/" className="page-back-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
          </svg>
          Back to overview
        </Link>
      </div>
      {children}
    </div>
  )
}
