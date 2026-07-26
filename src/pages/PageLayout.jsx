import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function PageLayout({ title, children }) {
  useEffect(() => {
    const prev = document.title
    if (title) document.title = `${title} — Edison Taimu`
    return () => { document.title = prev }
  }, [title])

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
