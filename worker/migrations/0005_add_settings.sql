-- Adds a generic key/value settings table for small site-wide config that
-- doesn't warrant its own table — starting with the work location used by
-- the day/night widget, so it can be changed from the admin UI instead of
-- editing and redeploying frontend code every time you travel.
-- Applied automatically by CI (wrangler d1 migrations apply) on push —
-- no manual dashboard step needed.

CREATE TABLE IF NOT EXISTS settings (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
