// Runs automatically after `vite build` (see package.json "postbuild").
// GitHub Pages serves static files only — there's no server to inject
// per-post <title>/description/OG tags at request time. Without this,
// every /blog/:slug page shares the same homepage meta tags, so search
// results and social share previews (WhatsApp, Twitter, Facebook) never
// show the actual post title, summary, or cover image.
//
// This script fetches every published post at build time (same pattern
// as generate-sitemap.mjs), takes the already-built dist/index.html as
// a template, swaps in that post's own title/description/OG/Twitter
// tags and JSON-LD, and writes the result to dist/blog/<slug>/index.html.
// The React app inside still mounts and takes over exactly as before —
// this only changes what's in the initial HTML <head>, which is what
// crawlers and link-preview bots actually read.

const SITE = 'https://minutriq.me'
const API_BASE = process.env.VITE_CMS_API_URL
const DEFAULT_IMAGE = `${SITE}/social-preview.png`

function xmlEscape(str) {
  return String(str).replace(/[<>&'"]/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  }[c]))
}

function stripHtml(str) {
  return String(str).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

// Build a plain-text description from the post's excerpt, falling back
// to the start of its content if no excerpt was set.
function descriptionFor(post) {
  const raw = post.excerpt || stripHtml(post.content || '')
  const text = raw.trim()
  if (text.length <= 160) return text
  return `${text.slice(0, 157).trim()}…`
}

async function fetchAllPublishedPosts() {
  if (!API_BASE) {
    console.warn('[blog-html] VITE_CMS_API_URL not set — skipping blog post pages.')
    return []
  }

  const posts = []
  const limit = 50
  let offset = 0

  while (true) {
    const res = await fetch(`${API_BASE}/api/posts?limit=${limit}&offset=${offset}`)
    if (!res.ok) {
      console.warn(`[blog-html] Failed to fetch posts (${res.status}) — continuing without them.`)
      break
    }
    const { posts: page = [] } = await res.json()
    posts.push(...page)
    if (page.length < limit) break
    offset += limit
  }

  return posts
}

function renderForPost(template, post) {
  const url = `${SITE}/blog/${post.slug}/`
  const title = `${post.title} — Edison Taimu`
  const description = xmlEscape(descriptionFor(post))
  const image = post.cover_image || DEFAULT_IMAGE
  const escapedTitle = xmlEscape(post.title)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: descriptionFor(post),
    image,
    url,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    author: { '@type': 'Person', name: 'Edison Taimu', url: SITE },
  }

  let html = template

  // <title>
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${xmlEscape(title)}</title>`
  )

  // meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${description}" />`
  )

  // Open Graph
  html = html.replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="article" />`)
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapedTitle}" />`)
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${image}" />`)

  // Twitter
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapedTitle}" />`)
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${image}" />`)

  // Structured data — replace the Person block with a BlogPosting block
  // for this page. React re-adds its own per-page data if needed later;
  // this just makes the pre-JS HTML describe the actual post.
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${JSON.stringify(jsonLd)}\n    </script>`
  )

  return html
}

async function main() {
  const fs = await import('node:fs/promises')

  const posts = await fetchAllPublishedPosts()
  if (posts.length === 0) {
    console.log('[blog-html] No published posts — nothing to prerender.')
    return
  }

  const template = await fs.readFile('dist/index.html', 'utf-8')

  for (const post of posts) {
    const dir = `dist/blog/${post.slug}`
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(`${dir}/index.html`, renderForPost(template, post))
  }

  console.log(`[blog-html] Wrote ${posts.length} prerendered blog post page(s) with per-post meta tags.`)
}

main().catch((err) => {
  // Never fail the whole deploy over prerendering — worst case, /blog/:slug
  // falls back to the SPA route serving the generic homepage meta tags,
  // same as before this script existed.
  console.error('[blog-html] Generation failed, blog posts will use default meta tags:', err.message)
})
