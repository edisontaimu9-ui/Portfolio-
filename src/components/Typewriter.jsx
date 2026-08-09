import { useEffect, useRef, useState } from 'react'

// Types the given text out one character at a time. Pure JS/CSS —
// no animation library needed. Screen readers get the full text
// immediately via a visually-hidden span, so the animation never
// delays or garbles what assistive tech announces.
export default function Typewriter({ text, speed = 32, startDelay = 300, className = '' }) {
  const [count, setCount] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    setCount(0)
    doneRef.current = false

    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          const next = c + 1
          if (next >= text.length) {
            clearInterval(interval)
            doneRef.current = true
          }
          return next
        })
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="typewriter-cursor" />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
