// Runs automatically after `vite build` (see package.json "postbuild").
// GitHub Pages serves static files only, so there's no way to generate
// a feed per-request — this fetches the published posts at build time
// (same pattern as generate-sitemap.mjs and generate-blog-html.mjs) and
// writes a standard RSS 2.0 feed to dist/rss.xml, so the blog can be
// followed in a feed reader instead of only checked manually.
//
// Reuses the same `marked` instance (with the callout/pull-quote/image-
// caption extensions from Phase 3 & 6) as the live article page and the
// admin preview, so <content:encoded> renders identically everywhere.

import { marked } from '../src/lib/markdown.js'

const SITE = 'https://minutriq.me'
const API_BASE = process.env.VITE_CMS_API_URL
const FEED_TITLE = 'Edison Taimu — Notes on nutrition and building software'
const FEED_DESCRIPTION = 'Writing on clinical nutrition, dietetics, and the health-tech tools built to support it.'
// Feed readers don't need the entire archive on every fetch — cap it,
// same idea as the 50-per-page cap on the posts API itself.
const MAX_ITEMS = 30

function xmlEscape(str) {
  return String(str).replace(/[<>&'"]/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  }[c]))
}

function stripHtml(str) {
  return String(str).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

// Same fallback order as generate-blog-html.mjs's descriptionFor, just a
// longer cap — RSS <description> is a summary, not a search snippet.
function descriptionFor(post) {
  const raw = post.seo_description || post.excerpt || stripHtml(post.content || '')
  const text = raw.trim()
  if (text.length <= 300) return text
  return `${text.slice(0, 297).trim()}…`
}

async function fetchAllPublishedPosts() {
  if (!API_BASE) {
    console.warn('[rss] VITE_CMS_API_URL not set — skipping feed generation.')
    return []
  }

  const posts = []
  const limit = 50
  let offset = 0

  while (true) {
    const res = await fetch(`${API_BASE}/api/posts?limit=${limit}&offset=${offset}`)
    if (!res.ok) {
      console.warn(`[rss] Failed to fetch posts (${res.status}) — continuing without them.`)
      break
    }
    const { posts: page = [] } = await res.json()
    posts.push(...page)
    if (page.length < limit) break
    offset += limit
  }

  return posts // already newest-first from the API, which is what RSS expects
}

function itemFor(post) {
  const url = `${SITE}/blog/${post.slug}/`
  const title = post.seo_title || post.title
  const author = post.author || 'Edison Taimu'
  const pubDate = post.published_at ? new Date(post.published_at).toUTCString() : undefined
  const html = marked.parse(post.content || '')

  return [
    '  <item>',
    `    <title>${xmlEscape(title)}</title>`,
    `    <link>${xmlEscape(url)}</link>`,
    `    <guid isPermaLink="true">${xmlEscape(url)}</guid>`,
    pubDate ? `    <pubDate>${pubDate}</pubDate>` : null,
    `    <dc:creator>${xmlEscape(author)}</dc:creator>`,
    post.category ? `    <category>${xmlEscape(post.category)}</category>` : null,
    `    <description>${xmlEscape(descriptionFor(post))}</description>`,
    `    <content:encoded><![CDATA[${html}]]></content:encoded>`,
    '  </item>',
  ].filter(Boolean).join('\n')
}

async function main() {
  const posts = (await fetchAllPublishedPosts()).slice(0, MAX_ITEMS)
  const items = posts.map(itemFor).join('\n')
  const lastBuildDate = new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${xmlEscape(FEED_TITLE)}</title>
  <link>${SITE}/blog/</link>
  <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
  <description>${xmlEscape(FEED_DESCRIPTION)}</description>
  <language>en</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
</channel>
</rss>
`

  const fs = await import('node:fs/promises')
  await fs.writeFile('dist/rss.xml', xml)
  console.log(`[rss] Wrote dist/rss.xml with ${posts.length} post(s).`)
}

main().catch((err) => {
  // Never fail the whole deploy over the feed — worst case, the site
  // ships without dist/rss.xml this build and picks it up next time.
  console.error('[rss] Generation failed, no feed will be published this build:', err.message)
})
