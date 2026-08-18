-- Adds view and like counters to posts.
-- Apply with: wrangler d1 execute portfolio_cms --remote --file=./migrations/0002_add_views_likes.sql

ALTER TABLE posts ADD COLUMN views INTEGER NOT NULL DEFAULT 0;
ALTER TABLE posts ADD COLUMN likes INTEGER NOT NULL DEFAULT 0;
