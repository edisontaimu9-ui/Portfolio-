# Blog / Editorial Architecture — Foundation Notes

This document exists so future phases (2, 3, …) build on a shared plan
instead of improvising each time. It describes decisions made in
Phase 1 and the direction later phases are expected to take. Nothing
in this file changes runtime behavior by itself.

## Current model (as of Phase 1)

Posts are stored as a single row in D1 (`worker/schema.sql`):

```
id, slug, title, excerpt, content, cover_image, tags, status,
published_at, created_at, updated_at, views, likes,
author, category, featured, drop_cap
```

`content` is **Markdown text**, rendered client-side with `marked`
(`src/pages/BlogPost.jsx`) into a single `dangerouslySetInnerHTML`
block styled by `.blog-post-content` in `src/index.css`.

This is intentional for Phase 1: the reading experience, admin editor,
worker API, and SEO prerendering (`scripts/generate-blog-html.mjs`)
all assume `content` is a markdown string. Changing that shape is a
breaking change across all four, so it wasn't done this phase.

## Why not a block editor yet

A full block-based editor (paragraphs/images/quotes/galleries/etc. as
discrete, reorderable units) needs:

- A new `content_blocks` JSON shape (or a second column) replacing or
  augmenting the markdown string
- A rewrite of `src/pages/admin/PostEditor.jsx` from a plain textarea
  into a block-based editor UI
- A rewrite of the render path in `src/pages/BlogPost.jsx` from
  `marked.parse()` to a block renderer (one React component per block
  type)
- A migration path for existing published posts (their `content` stays
  valid markdown — it doesn't need to be force-converted)

That's a multi-phase effort on its own, which is why Phase 1 only lays
groundwork: the new columns (`author`, `category`, `featured`,
`drop_cap`) and the Drop Cap CSS feature.

## Planned direction for the block model (future phases, not yet built)

When a block editor is introduced, the plan is:

- Add a nullable `content_blocks TEXT` (JSON) column alongside the
  existing `content` column, rather than replacing `content` outright.
- A post is "block-based" if `content_blocks` is set; otherwise it
  falls back to rendering `content` as markdown exactly as today. This
  keeps every existing post working with zero migration required.
- Each block is a small tagged object, e.g.
  `{ "type": "quote", "text": "...", "cite": "..." }` or
  `{ "type": "pullQuote", "text": "..." }` or
  `{ "type": "callout", "variant": "info", "text": "..." }`.
- Block types to support, in rough priority order for later phases:
  paragraph, heading, image (+ caption), quote, pull quote, code
  block, list, table, divider, gallery, video/audio embed, generic
  embed, callout. (Drop cap is not a block — it's a per-article flag,
  already implemented in Phase 1, that affects how the first paragraph
  renders.)
- The renderer becomes a `<BlockRenderer blocks={post.content_blocks} />`
  component that switches on `block.type`, so adding a new block type
  later means adding one case, not touching the rest of the article
  page.
- The admin editor becomes a list of block "cards" the author can
  add/reorder/remove, with a per-type mini-form — still no external
  rich-text/editor dependency unless a strong need appears, to keep
  the project's existing "minimal dependencies" convention.

None of the above is implemented yet. It's recorded here so later
phases don't have to re-derive it, and so any interim change to
`posts` schema stays compatible with this direction.

## Update — Phase 3: callouts & pull quotes shipped without a block editor

Phase 3 added the first two real content blocks — **callout** and
**pull quote** — but deliberately without touching the schema or
building a block editor. They're implemented as a small `marked`
extension (`src/lib/markdown.js`) that recognizes a fence syntax
inside the existing `content` markdown string:

```
:::callout tip
Body text — markdown allowed inside.
:::

:::pullquote
Standout quote text.
:::
```

This works because both block types are essentially "styled prose" —
they don't need structured fields (no image URL, no embed ID, nothing
a plain textarea can't hold), so the markdown-string model was
sufficient. It does **not** replace the `content_blocks` JSON plan
above — blocks with real structured data (gallery, video/audio embed)
still need that, since a fence syntax can't cleanly hold multiple
named fields or ordered sub-items. Treat markdown-fence syntax as the
right tool for "a styled paragraph variant," and the future
`content_blocks` JSON model as the right tool for anything with its
own fields.

## Update — Phase 6: image captions, dividers, and an admin preview

Phase 6 closed out two more items from the original block list —
**image captions** and **dividers** — without adding any new syntax
at all. Standard Markdown already supports `![alt](url "title")`
(the title normally only shows as a browser tooltip) and `---`
(a thematic break); the renderer in `src/lib/markdown.js` now turns a
titled image into a `<figure>`/`<figcaption>`, and CSS styles the
existing `<hr>` as a centered "···" divider. Existing posts are
unaffected either way — an image with no title still renders as a
plain `<img>`.

Phase 6 also added a Write/Preview toggle to the admin content field
(`PostEditor.jsx`), reusing the same `blog-post-content` renderer and
CSS the live article page uses, so callouts, pull quotes, captions,
and drop cap can all be checked before publishing instead of only
after.

## Update — Phase 7: RSS feed

Added `scripts/generate-rss.mjs`, wired into the same `postbuild`
chain as `generate-sitemap.mjs` and `generate-blog-html.mjs` (all
three run after `vite build`, since GitHub Pages can't generate
anything per-request). It writes `dist/rss.xml`, a standard RSS 2.0
feed capped at the 30 most recent published posts, with a full
`<content:encoded>` body per item rendered through the same `marked`
instance (and the same callout/pull-quote/caption extensions) as the
live article page and the admin preview — one renderer, three
surfaces, so they can't drift out of sync with each other.
`index.html` links it via `<link rel="alternate" type="application/rss+xml">`
so feed readers and browsers can auto-discover it, and `/blog` has a
small "RSS feed" link pointing at `/rss.xml` directly.
