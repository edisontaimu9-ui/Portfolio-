import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Basic front-end deterrents against casual copying of site content
// (text selection, right-click save, image dragging). This is NOT real
// security — anyone can still view page source, open dev tools, or take
// a screenshot. It just removes the easy one-tap "select all / copy" and
// "save image" path for casual visitors.
//
// Skipped entirely on /admin routes so editing/dev work isn't affected.
export default function ContentProtection() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.remove('content-protected')
      return
    }

    const blockContextMenu = (e) => e.preventDefault()
    const blockDragStart = (e) => {
      if (e.target.tagName === 'IMG') e.preventDefault()
    }
    const blockCopy = (e) => e.preventDefault()

    document.addEventListener('contextmenu', blockContextMenu)
    document.addEventListener('dragstart', blockDragStart)
    document.addEventListener('copy', blockCopy)
    document.body.classList.add('content-protected')

    return () => {
      document.removeEventListener('contextmenu', blockContextMenu)
      document.removeEventListener('dragstart', blockDragStart)
      document.removeEventListener('copy', blockCopy)
      document.body.classList.remove('content-protected')
    }
  }, [isAdmin])

  return null
}
