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

import { marked } from '../src/lib/markdown.js'

const SITE = 'https://edisontaimu.online'
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

// Build a plain-text description from an SEO override, falling back to
// the excerpt, and finally to the start of the post's content.
function descriptionFor(post) {
  const raw = post.seo_description || post.excerpt || stripHtml(post.content || '')
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

// Replace with a function so "$&", "$1" etc. inside post text are never
// treated as special replacement patterns.
function swap(html, pattern, value) {
  return html.replace(pattern, () => value)
}

// JSON for a <script> block: escape "<" so post text can never close it.
function ld(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}

function renderForPost(template, post) {
  const url = `${SITE}/blog/${post.slug}/`
  const displayTitle = post.seo_title || post.title
  const title = `${displayTitle} — Edison Taimu`
  const rawDescription = descriptionFor(post)
  const description = xmlEscape(rawDescription)
  const image = post.cover_image || DEFAULT_IMAGE
  const escapedTitle = xmlEscape(displayTitle)
  const authorName = post.author || 'Edison Taimu'
  const keywords = String(post.tags || '').split(',').map((t) => t.trim()).filter(Boolean)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#post`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: displayTitle,
        description: rawDescription,
        image,
        url,
        datePublished: post.published_at || undefined,
        dateModified: post.updated_at || post.published_at || undefined,
        keywords: keywords.length ? keywords.join(', ') : undefined,
        articleSection: post.category || undefined,
        inLanguage: 'en',
        author: { '@type': 'Person', name: authorName, url: `${SITE}/` },
        publisher: { '@type': 'Person', name: 'Edison Taimu', url: `${SITE}/` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
          { '@type': 'ListItem', position: 3, name: displayTitle, item: url },
        ],
      },
    ],
  }

  let html = template

  // Canonical — without this every post kept the homepage canonical and
  // search engines were told each post is a duplicate of "/".
  html = swap(html, /<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${url}" />`)

  html = swap(html, /<title>.*?<\/title>/, `<title>${xmlEscape(title)}</title>`)
  html = swap(html, /<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)

  // Open Graph
  html = swap(html, /<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="article" />`)
  html = swap(html, /<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapedTitle}" />`)
  html = swap(html, /<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
  html = swap(html, /<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
  html = swap(html, /<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${xmlEscape(image)}" />`)
  html = swap(html, /<meta property="og:image:alt" content=".*?" \/>/, `<meta property="og:image:alt" content="${escapedTitle}" />`)
  // The default image is always 1200x630; a custom cover has unknown size.
  if (post.cover_image) {
    html = swap(html, /\s*<meta property="og:image:width" content=".*?" \/>/, '')
    html = swap(html, /\s*<meta property="og:image:height" content=".*?" \/>/, '')
  }

  // Twitter
  html = swap(html, /<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapedTitle}" />`)
  html = swap(html, /<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
  html = swap(html, /<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${xmlEscape(image)}" />`)
  html = swap(html, /<meta name="twitter:image:alt" content=".*?" \/>/, `<meta name="twitter:image:alt" content="${escapedTitle}" />`)

  // Article meta
  const articleMeta = [
    post.published_at ? `<meta property="article:published_time" content="${xmlEscape(post.published_at)}" />` : null,
    post.updated_at ? `<meta property="article:modified_time" content="${xmlEscape(post.updated_at)}" />` : null,
    `<meta property="article:author" content="${xmlEscape(authorName)}" />`,
  ].filter(Boolean).join('\n    ')

  // Structured data — replace the site-wide graph with this post's graph.
  html = swap(
    html,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${ld(jsonLd)}\n    </script>\n    ${articleMeta}`
  )

  // Crawler-visible article text. AI crawlers and many bots do not run
  // JavaScript, so without this a post page has an empty <div id="root">.
  // React replaces it as soon as the app mounts.
  // Scripts are dropped: this copy is only for readers that don't run JS.
  const body = marked.parse(post.content || '').replace(/<script[\s\S]*?<\/script>/gi, '')
  const fallback =
    `<div id="root"><div class="prerender">` +
    `<nav aria-label="Site"><a href="/">Home</a><a href="/blog/">Blog</a><a href="/projects/">Projects</a><a href="/contact/">Contact</a></nav>` +
    `<main><article><h1>${escapedTitle}</h1>` +
    (post.excerpt ? `<p><em>${xmlEscape(post.excerpt)}</em></p>` : '') +
    body +
    `</article></main></div></div>`
  html = swap(html, '<div id="root"></div>', fallback)

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
