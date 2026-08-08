import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { logEvent } from 'firebase/analytics'
import { analyticsReady } from '../firebase'

// Firebase Analytics only auto-logs a page_view on the initial script load.
// Since this is a client-side-routed SPA, every subsequent route change
// needs its own manual page_view event or the console will only ever see
// one "page" no matter how the person navigates the site.
export default function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    let cancelled = false
    analyticsReady.then((analytics) => {
      if (cancelled || !analytics) return
      logEvent(analytics, 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      })
    })
    return () => { cancelled = true }
  }, [location.pathname, location.search])

  return null
}
