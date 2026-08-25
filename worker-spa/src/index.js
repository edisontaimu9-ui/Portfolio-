// spa-fallback worker
//
// Why this exists: the frontend deploys as a static build to GitHub Pages
// (see .github/workflows/deploy-pages.yml). GitHub Pages has no config for
// "serve index.html with a 200 for any unknown path" — a direct request to
// a client-side route like /about or /projects gets a real 404 from
// GitHub's origin, because no such file exists in the build output.
// The old fix (public/404.html + the redirect script in index.html) papers
// over this for browsers *after* JS runs, but search engines record the
// initial 404 status and drop the page from consideration for indexing —
// which is exactly the "Not found (404)" / "Page with redirect" errors
// Search Console reports for minutriq.me.
//
// This Worker sits in front of GitHub Pages at the edge (bound to a Route
// on the minutriq.me zone — see deploy-worker-spa.yml / dashboard setup).
// Static assets (anything with a file extension: .js, .css, .png, the
// sitemap, robots.txt, etc.) pass straight through untouched. Anything
// else — a client-side route with no matching file — is served the
// contents of "/" (index.html) but with a real 200 status, so React
// Router can take over client-side exactly like it already does for
// in-app navigation, and search engines see a normal 200 page.
//
// It does NOT touch the CMS API worker (portfolio-cms-api) — that lives
// on its own URL (VITE_CMS_API_URL), never on the minutriq.me zone this
// Worker is bound to, so there's no route collision to worry about.
//
// Cache-Control: Vite gives every JS/CSS file a content hash in its
// filename, so those are safe to cache aggressively — a changed file is
// a new URL. The HTML shell (index.html, and the prerendered per-post
// pages) is the opposite: same URL, different content every deploy. If
// a browser or Cloudflare's edge cache holds onto an old copy of the
// HTML shell, it still points at JS/CSS filenames from that old build —
// which no longer exist after the next deploy — so the page loads with
// a 200 but React never mounts (a blank page with only the static
// index.html <title>, until a reload fetches the current HTML). Every
// HTML-ish response below gets an explicit `no-cache` so browsers/edges
// always revalidate with origin instead of ever serving a stale shell.

const ASSET_EXTENSION = /\.[a-zA-Z0-9]+$/

function noCache(response) {
  const headers = new Headers(response.headers)
  headers.set('Cache-Control', 'no-cache, must-revalidate')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export default {
  async fetch(request) {
    const url = new URL(request.url)

    // Let real files (has a file extension) go straight to GitHub Pages,
    // unmodified — including their original long-lived Cache-Control.
    // This covers JS/CSS bundles, images, sitemap.xml, robots.txt, etc.
    if (ASSET_EXTENSION.test(url.pathname)) {
      return fetch(request)
    }

    // First, try the exact path as requested — this lets real directory-
    // style routes that DO have a matching file (rare, but just in case)
    // resolve normally.
    const originResponse = await fetch(request)
    if (originResponse.status !== 404) {
      return noCache(originResponse)
    }

    // No file at this path — it's a client-side route. Fetch "/" from the
    // same origin and re-serve its body with a 200, so both browsers and
    // crawlers get real content at a real 200 status for every route in
    // the sitemap.
    const indexUrl = new URL('/', url)
    const indexResponse = await fetch(indexUrl, {
      cf: request.cf,
      headers: request.headers,
    })

    const headers = new Headers(indexResponse.headers)
    headers.set('X-SPA-Fallback', 'true')
    headers.set('Cache-Control', 'no-cache, must-revalidate')

    return new Response(indexResponse.body, {
      status: 200,
      statusText: 'OK',
      headers,
    })
  },
}
