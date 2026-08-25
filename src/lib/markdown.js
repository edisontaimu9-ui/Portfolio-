// Registers custom block syntax on top of standard Markdown, used by the
// blog content column beyond what plain `marked` supports out of the box.
// This keeps `content` as a single markdown string (see
// docs/BLOG_ARCHITECTURE.md) rather than moving to a block editor — authors
// just write the fence syntax directly in the admin content textarea.
//
//   :::callout tip
//   Body text — markdown allowed inside.
//   :::
//
//   :::pullquote
//   Standout quote text.
//   :::
//
// Callout variants: note (default), tip, warning.
//
// Image captions use plain Markdown's existing "title" syntax — no new
// fence needed. Authors just add a quoted title after the URL:
//
//   ![Alt text](https://example.com/photo.jpg "Caption shown under the image")
//
// Normally that title only shows as a browser tooltip; the renderer below
// turns it into a visible <figure>/<figcaption> instead. Images without a
// title render exactly as before (plain <img>), so nothing already
// published changes.
import { marked } from 'marked'

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const FENCE_RE = /^:::(callout|pullquote)(?:[ \t]+(\w+))?\n([\s\S]*?)\n:::(?:\n|$)/

const CALLOUT_VARIANTS = ['note', 'tip', 'warning']

const editorialBlockExtension = {
  name: 'editorialBlock',
  level: 'block',
  start(src) {
    const match = src.match(/:::(callout|pullquote)/)
    return match ? match.index : undefined
  },
  tokenizer(src) {
    const match = FENCE_RE.exec(src)
    if (!match) return undefined
    const [raw, kind, variant, body] = match
    const token = {
      type: 'editorialBlock',
      raw,
      kind,
      variant: (variant || 'note').toLowerCase(),
      tokens: [],
    }
    this.lexer.blockTokens(body.trim(), token.tokens)
    return token
  },
  renderer(token) {
    const inner = this.parser.parse(token.tokens)
    if (token.kind === 'pullquote') {
      return `<blockquote class="pull-quote">${inner}</blockquote>\n`
    }
    const variant = CALLOUT_VARIANTS.includes(token.variant) ? token.variant : 'note'
    const label = variant.charAt(0).toUpperCase() + variant.slice(1)
    return `<div class="callout callout-${variant}" role="note"><p class="callout-label">${label}</p>${inner}</div>\n`
  },
}

marked.use({
  extensions: [editorialBlockExtension],
  renderer: {
    image({ href, title, text }) {
      const altAttr = text ? ` alt="${escapeHtml(text)}"` : ' alt=""'
      const img = `<img src="${escapeHtml(href)}"${altAttr} loading="lazy" decoding="async" />`
      if (!title) return img
      return `<figure class="blog-figure">${img}<figcaption>${escapeHtml(title)}</figcaption></figure>`
    },
  },
})

export { marked }
