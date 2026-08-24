-- Phase 1 editorial foundation: adds the article-model fields needed for
-- richer article presentation (author/category) and the Drop Cap feature,
-- without disturbing existing rows (all additive, all defaulted).
-- Apply with: wrangler d1 execute portfolio_cms --remote --file=./migrations/0003_add_editorial_foundation_fields.sql

ALTER TABLE posts ADD COLUMN author TEXT;
ALTER TABLE posts ADD COLUMN category TEXT;
ALTER TABLE posts ADD COLUMN featured INTEGER NOT NULL DEFAULT 0;
ALTER TABLE posts ADD COLUMN drop_cap INTEGER NOT NULL DEFAULT 0;
