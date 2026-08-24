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

None of the above is implemented yet. It's recorded here so Phase 2+
doesn't have to re-derive it, and so any interim change to `posts`
schema stays compatible with this direction.
