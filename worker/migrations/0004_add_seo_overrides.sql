-- Phase 4: optional per-post SEO overrides. Both nullable — when unset,
-- the SEO prerender script (scripts/generate-blog-html.mjs) falls back
-- to the post's title/excerpt exactly as it does today, so this is a
-- zero-impact addition for existing posts.
-- Apply with: paste into the Cloudflare dashboard D1 Console for portfolio_cms
-- (wrangler CLI is not usable from Termux — see docs/BLOG_ARCHITECTURE.md).

ALTER TABLE posts ADD COLUMN seo_title TEXT;
ALTER TABLE posts ADD COLUMN seo_description TEXT;
