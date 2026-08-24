CREATE TABLE IF NOT EXISTS posts (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  excerpt       TEXT,
  content       TEXT NOT NULL,
  cover_image   TEXT,
  tags          TEXT,            -- comma-separated, e.g. "nutrition,dev"
  status        TEXT NOT NULL DEFAULT 'draft',  -- 'draft' | 'published'
  published_at  TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now')),
  views         INTEGER NOT NULL DEFAULT 0,
  likes         INTEGER NOT NULL DEFAULT 0,
  author        TEXT,            -- display name; falls back to site owner in the UI
  category      TEXT,            -- single primary category, e.g. "Nutrition"
  featured      INTEGER NOT NULL DEFAULT 0,  -- 0/1 — reserved for future "featured" placement
  drop_cap      INTEGER NOT NULL DEFAULT 0   -- 0/1 — enables the editorial drop cap on paragraph 1
);

CREATE INDEX IF NOT EXISTS idx_posts_status ON posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);
