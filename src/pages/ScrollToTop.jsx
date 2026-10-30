import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Deep link (e.g. /projects#chakudya): wait for the routed page to mount,
    // then scroll to the matching element. Falls back to the top if not found.
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let timer
    const go = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ block: 'start' })
      } else if (tries++ < 10) {
        timer = setTimeout(go, 50)
      } else {
        window.scrollTo(0, 0)
      }
    }
    timer = setTimeout(go, 0)
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}
