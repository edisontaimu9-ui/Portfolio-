// Runs automatically after `vite build` (see package.json "postbuild").
// public/sitemap.xml only lists the fixed pages, since it's a static file —
// it has no way to know about blog posts that live in the CMS database.
// This script fetches the published posts at build time and writes a
// complete sitemap (fixed pages + /blog + every /blog/:slug) into dist/,
// so search engines can actually discover posts instead of just the
// homepage.

const SITE = 'https://minutriq.me'
const API_BASE = process.env.VITE_CMS_API_URL

const STATIC_PAGES = [
  { path: '/',              priority: '1.0' },
  { path: '/about',          priority: '0.8' },
  { path: '/projects',       priority: '0.8' },
  { path: '/skills',         priority: '0.6' },
  { path: '/experience',     priority: '0.6' },
  { path: '/impact',         priority: '0.7' },
  { path: '/opportunities', priority: '0.6' },
  { path: '/support',       priority: '0.5' },
  { path: '/contact',       priority: '0.7' },
  { path: '/blog',           priority: '0.7' },
]

function xmlEscape(str) {
  return String(str).replace(/[<>&'"]/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  }[c]))
}

function urlEntry({ loc, priority, lastmod }) {
  return [
    '  <url>',
    `    <loc>${xmlEscape(loc)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].filter(Boolean).join('\n')
}

async function fetchAllPublishedPosts() {
  if (!API_BASE) {
    console.warn('[sitemap] VITE_CMS_API_URL not set — skipping blog posts.')
    return []
  }

  const posts = []
  const limit = 50
  let offset = 0

  while (true) {
    const res = await fetch(`${API_BASE}/api/posts?limit=${limit}&offset=${offset}`)
    if (!res.ok) {
      console.warn(`[sitemap] Failed to fetch posts (${res.status}) — continuing without them.`)
      break
    }
    const { posts: page = [] } = await res.json()
    posts.push(...page)
    if (page.length < limit) break
    offset += limit
  }

  return posts
}

async function main() {
  const posts = await fetchAllPublishedPosts()

  const entries = [
    ...STATIC_PAGES.map((p) => urlEntry({ loc: `${SITE}${p.path}`, priority: p.priority })),
    ...posts.map((post) => urlEntry({
      loc: `${SITE}/blog/${post.slug}`,
      priority: '0.6',
      lastmod: (post.updated_at || post.published_at || '').slice(0, 10) || undefined,
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`

  const fs = await import('node:fs/promises')
  await fs.writeFile('dist/sitemap.xml', xml)
  console.log(`[sitemap] Wrote dist/sitemap.xml with ${STATIC_PAGES.length} static pages + ${posts.length} blog post(s).`)
}

main().catch((err) => {
  // Never fail the whole deploy over the sitemap — worst case, the static
  // one already copied into dist/ from public/ stays in place.
  console.error('[sitemap] Generation failed, keeping the static sitemap:', err.message)
})
