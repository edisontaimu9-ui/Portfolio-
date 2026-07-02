import { useState, useEffect } from 'react'

const phrases = [
  'Evidence-based nutrition care — and the software I build to support it.',
  'Bridging clinical dietetics and digital health in low-resource settings.',
  'Building offline-first tools for nutrition care where it matters most.',
  'Aspiring clinical dietitian · self-taught developer · Zomba, Malawi.',
]

export function useTypewriter() {
  const [text, setText] = useState('')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(phrases[0])
      return
    }

    let phraseIdx = 0
    let charIdx   = 0
    let deleting  = false
    let timer

    function tick() {
      const current = phrases[phraseIdx]

      if (!deleting) {
        charIdx++
        setText(current.slice(0, charIdx))
        if (charIdx === current.length) {
          deleting = true
          timer = setTimeout(tick, 2600)
        } else {
          timer = setTimeout(tick, 36)
        }
      } else {
        charIdx--
        setText(current.slice(0, charIdx))
        if (charIdx === 0) {
          deleting  = false
          phraseIdx = (phraseIdx + 1) % phrases.length
          timer     = setTimeout(tick, 320)
        } else {
          timer = setTimeout(tick, 16)
        }
      }
    }

    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [])

  return text
}
