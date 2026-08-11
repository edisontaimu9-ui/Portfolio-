// Runs automatically after `vite build` (see package.json "postbuild").
//
// GitHub Pages serves static files only — a client-side route like
// /about has no matching file in the build output, so a direct request
// (from Googlebot, a shared link, or a page refresh) gets a real 404
// from GitHub's origin. The public/404.html redirect script papers over
// this for browsers after JS runs, but search engines record the
// initial 404 status and drop the page from consideration entirely —
// this is the exact "Not found (404)" error Search Console reports for
// minutriq.me's static routes.
//
// generate-blog-html.mjs already solves this for every /blog/:slug post.
// This script does the same for the fixed app pages: it takes the built
// dist/index.html as a template, swaps in that page's own <title> and
// meta description (so each page also stops sharing the homepage's
// title in search results and browser tabs), and writes the result to
// dist/<path>/index.html — a real file, so GitHub Pages serves a real
// 200. React Router still mounts and takes over instantly, exactly like
// it already does for in-app navigation.

const SITE = 'https://minutriq.me'

const PAGES = [
  {
    path: '/about',
    title: 'About — Edison Taimu',
    description: 'BSc Nutrition & Dietetics graduate turned self-taught developer, building the clinical tools I wished existed on the ward.',
  },
  {
    path: '/projects',
    title: 'Projects — Edison Taimu',
    description: 'Live clinical nutrition tools I\u2019ve built, from hospital dietetics software to a public food database for Malawi.',
  },
  {
    path: '/skills',
    title: 'Skills — Edison Taimu',
    description: 'Tools and technologies I use to build clinical nutrition software, from mobile apps to backend infrastructure.',
  },
  {
    path: '/experience',
    title: 'Experience — Edison Taimu',
    description: 'My background in clinical nutrition and software development.',
  },
  {
    path: '/impact',
    title: 'Impact — Edison Taimu',
    description: 'The reach and results of the clinical nutrition tools I\u2019ve built for Malawi.',
  },
  {
    path: '/opportunities',
    title: 'Opportunities — Edison Taimu',
    description: 'Roles, collaborations, and projects I\u2019m open to.',
  },
  {
    path: '/support',
    title: 'Support — Edison Taimu',
    description: 'Ways to support free clinical nutrition software for Malawi.',
  },
  {
    path: '/contact',
    title: 'Contact — Edison Taimu',
    description: 'Get in touch with Edison Taimu.',
  },
  {
    path: '/blog',
    title: 'Blog — Edison Taimu',
    description: 'Writing on clinical nutrition, software, and building for Malawi.',
  },
]

function xmlEscape(str) {
  return String(str).replace(/[<>&'"]/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  }[c]))
}

function renderForPage(template, page) {
  const url = `${SITE}${page.path}/`
  const title = xmlEscape(page.title)
  const description = xmlEscape(page.description)

  let html = template

  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)

  return html
}

async function main() {
  const fs = await import('node:fs/promises')

  const template = await fs.readFile('dist/index.html', 'utf-8')

  for (const page of PAGES) {
    const dir = `dist${page.path}`
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(`${dir}/index.html`, renderForPage(template, page))
  }

  console.log(`[static-html] Wrote ${PAGES.length} prerendered page(s) with their own titles/descriptions.`)
}

main().catch((err) => {
  // Never fail the whole deploy over this — worst case, these routes
  // fall back to the same 404-then-JS-redirect behavior as before.
  console.error('[static-html] Generation failed:', err.message)
})
