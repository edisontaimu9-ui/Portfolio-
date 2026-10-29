// Runs automatically after `vite build` (see package.json "postbuild").
//
// GitHub Pages serves static files only — a client-side route like
// /about has no matching file in the build output, so a direct request
// (from Googlebot, a shared link, or a page refresh) gets a real 404
// from GitHub's origin. The public/404.html redirect script papers over
// this for browsers after JS runs, but search engines record the
// initial 404 status and drop the page from consideration entirely —
// this is the exact "Not found (404)" error Search Console reports for
// edisontaimu.online's static routes.
//
// generate-blog-html.mjs already solves this for every /blog/:slug post.
// This script does the same for the fixed app pages: it takes the built
// dist/index.html as a template, swaps in that page's own <title> and
// meta description (so each page also stops sharing the homepage's
// title in search results and browser tabs), and writes the result to
// dist/<path>/index.html — a real file, so GitHub Pages serves a real
// 200. React Router still mounts and takes over instantly, exactly like
// it already does for in-app navigation.

import { PAGE_SEO } from '../src/data/seo.js'

const SITE = 'https://edisontaimu.online'


// ── Crawler-visible content ──────────────────────────────────────────
// AI crawlers (GPTBot, ClaudeBot, PerplexityBot, ...) mostly read the raw
// HTML and do not run JavaScript, so a pure client-side app looks empty to
// them. Each prerendered page therefore also carries a small block of real,
// factual text inside #root. React replaces it the moment the app mounts,
// so visitors never see the difference. Keep this text in step with the
// matching pages in src/components/.
const NAV = [
  ['/', 'Home'], ['/about/', 'About'], ['/projects/', 'Projects'],
  ['/skills/', 'Skills'], ['/experience/', 'Experience'],
  ['/opportunities/', 'Opportunities'], ['/impact/', 'Impact'],
  ['/blog/', 'Blog'], ['/support/', 'Support'], ['/contact/', 'Contact'],
]

const PROJECTS_HTML = `
<ul>
  <li><strong>Chakudya Nutrition Registry (CNR)</strong>: a nutrition data API for Malawi covering foods, exchange lists, renal foods and enteral formulas, with RAG search over clinical references. It powers Thanzi and Oasis CNST. Awarded 2nd Best Innovation at the 5th Research Dissemination Conference, KUHeS. <a href="https://chakudya.xyz/">API docs</a>.</li>
  <li><strong>Oasis CNST</strong>: an offline-first clinical nutrition software suite for resource-limited healthcare settings, with 11+ modules including adult and paediatric nutrition calculators, enteral and parenteral nutrition, burn management and malnutrition screening. <a href="https://oasiscnst.app">oasiscnst.app</a>.</li>
  <li><strong>Thanzi</strong>: a nutrition tracking progressive web app for daily meal logging, nutrient tracking, BMI, BMR and TDEE assessments, built on the Chakudya Nutrition Registry. <a href="https://edisontaimu9-ui.github.io/thanzi/">Open Thanzi</a>.</li>
  <li><strong>DietitianOS</strong>: a practice management web app for dietitians with patient records, appointment scheduling, a food database and reporting. <a href="https://edisontaimu9-ui.github.io/dietitianos/">Open DietitianOS</a>.</li>
  <li><strong>NCRS (Nutrition Care Registry System)</strong>: a facility-side registry for patient admissions, discharges and active caseloads, with structured ADIME note documentation. <a href="https://github.com/edisontaimu9-ui/ncrs-frontend">Source on GitHub</a>.</li>
</ul>`

const BIO_HTML = `<p>Edison Taimu is a Malawian dietitian based in Zomba, Malawi. Edison holds a BSc in Nutrition &amp; Dietetics (Hons), Pioneer Cohort, from Kamuzu University of Health Sciences (KUHeS), formerly the University of Malawi College of Medicine, completed on 26 August 2026. Edison is open to dietetic internship placements on the path to becoming a Registered Dietitian, and is a self-taught developer who builds free clinical nutrition software for Malawi.</p>`

const PAGES = [
  {
    path: '/about',
    body: `<h1>About Edison Taimu</h1>${BIO_HTML}<p>During clinical rotations Edison found dietary recalls, food composition lookups and nutrition care plans were being done by hand, and began building software to automate that work. What started as a 24-hour recall calculator became Oasis CNST. Edison works across clinical dietetics and public health nutrition, from bedside care plans to population-level nutrition data.</p>`,
  },
  {
    path: '/projects',
    body: `<h1>Projects by Edison Taimu</h1><p>Live clinical nutrition tools built to close real gaps in Malawian healthcare.</p>${PROJECTS_HTML}`,
  },
  {
    path: '/skills',
    body: `<h1>Skills</h1><p>Clinical dietetics and full-stack development, applied together: tools and technologies used to build clinical nutrition software, from mobile apps to backend infrastructure.</p>`,
  },
  {
    path: '/experience',
    body: `<h1>Experience</h1><p>Background in clinical nutrition (ward rotations and the Nutrition Care Process) and independent software development of clinical nutrition tools used in real clinical settings.</p>`,
  },
  {
    path: '/impact',
    body: `<h1>Impact</h1><p>Malawi\u2019s nutrition indicators and the case for accessible nutrition care, alongside the reach of the clinical nutrition tools built for Malawi.</p>`,
  },
  {
    path: '/opportunities',
    body: `<h1>Open to dietetic internship placements</h1><p>Edison Taimu is seeking dietetic internship and supervised practice placements in clinical and community nutrition, in person or hybrid, based in Zomba, Malawi. Also open to global health innovation collaborations. Areas of interest: clinical dietetics, public health and community nutrition, clinical nutrition education, global health and nutrition programmes, and malnutrition screening and treatment.</p>`,
  },
  {
    path: '/support',
    body: `<h1>Support</h1><p>A small contribution keeps these free clinical nutrition tools running.</p>`,
  },
  {
    path: '/contact',
    body: `<h1>Contact Edison Taimu</h1><p>Reach out about internship enquiries, collaboration proposals, or problems worth solving in low-resource clinical settings. Also on <a href="https://github.com/edisontaimu9-ui">GitHub</a>, <a href="https://linkedin.com/in/edison-taimu">LinkedIn</a> and <a href="https://x.com/edisontaimu">X</a>.</p>`,
  },
  {
    path: '/blog',
    body: `<h1>Blog</h1><p>Writing on clinical nutrition, software, and building for Malawi.</p>`,
  },
]


const HOME = {
  path: '/',
  body: `<h1>Edison Taimu: dietitian and clinical nutrition software builder</h1>${BIO_HTML}<h2>Projects</h2>${PROJECTS_HTML}<p>See also: <a href="/opportunities/">internship availability</a> and <a href="/contact/">contact</a>.</p>`,
}

function xmlEscape(str) {
  return String(str).replace(/[<>&'"]/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  }[c]))
}

function withFallback(html, page) {
  const nav = NAV.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')
  const fallback = `<div id="root"><div class="prerender"><nav aria-label="Site">${nav}</nav><main>${page.body}</main></div></div>`
  return html.replace('<div id="root"></div>', fallback)
}

function breadcrumbLd(page, url) {
  const label = (NAV.find(([href]) => href === `${page.path}/`) || [])[1] || page.path.slice(1)
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: label, item: url },
    ],
  }
}

function renderForPage(template, page) {
  const url = page.path === '/' ? `${SITE}/` : `${SITE}${page.path}/`
  const title = xmlEscape(page.title)
  const description = xmlEscape(page.description)

  let html = template

  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${url}" />`)
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)

  const ld = JSON.stringify(breadcrumbLd(page, url)).replace(/</g, '\\u003c')
  html = html.replace('</head>', () => `<script type="application/ld+json">${ld}</script>\n  </head>`)

  return withFallback(html, page)
}

async function main() {
  const fs = await import('node:fs/promises')

  const template = await fs.readFile('dist/index.html', 'utf-8')

  for (const page of PAGES) {
    const dir = `dist${page.path}`
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(`${dir}/index.html`, renderForPage(template, { ...page, ...PAGE_SEO[page.path] }))
  }

  // Home keeps its own title/meta from index.html; it only gains the
  // crawler-visible fallback. Runs last, after generate-blog-html has
  // already used the clean template for post pages.
  await fs.writeFile('dist/index.html', withFallback(template, HOME))

  console.log(`[static-html] Wrote ${PAGES.length} prerendered page(s) with their own titles/descriptions, canonical URLs and crawler-visible text (plus the home page).`)
}

main().catch((err) => {
  // Never fail the whole deploy over this — worst case, these routes
  // fall back to the same 404-then-JS-redirect behavior as before.
  console.error('[static-html] Generation failed:', err.message)
})
