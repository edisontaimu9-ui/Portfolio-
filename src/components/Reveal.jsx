import { useEffect, useRef } from 'react'

export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = () => el.classList.add('is-visible')

    // Safety net: some embedded/in-app browsers (e.g. Custom Tabs bottom-sheet
    // previews) report an unreliable viewport size before the sheet is fully
    // expanded, which can make IntersectionObserver never fire — leaving
    // content stuck at opacity:0. Force-reveal after a short timeout so
    // content is never permanently invisible.
    const fallback = setTimeout(reveal, 1200)

    if (typeof IntersectionObserver === 'undefined') {
      reveal()
      return () => clearTimeout(fallback)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          obs.unobserve(el)
          clearTimeout(fallback)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px 200px 0px' }
    )

    obs.observe(el)
    return () => {
      obs.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
