/*
# Create Computer Engineering Department tables

This migration sets up the database for the Computer Engineering department website.
It is a single-tenant (no auth) public-facing site, so all data is intentionally
shared/public and policies allow anon + authenticated CRUD.

## New Tables
1. `news` — department news articles
   - id (uuid PK), title, slug, excerpt, content, image_url, published_at, created_at
2. `events` — department events (seminars, workshops, deadlines)
   - id (uuid PK), title, slug, description, location, start_time, end_time, image_url, created_at
3. `faculty` — faculty members directory
   - id (uuid PK), name, title, email, bio, photo_url, research_areas, office, created_at
4. `contact_messages` — messages submitted via the contact form
   - id (uuid PK), name, email, subject, message, created_at

## Security
- RLS enabled on every table.
- news/events/faculty: public read, no public write (read-only directory content).
  Note: because the anon role needs SELECT, policies are TO anon, authenticated.
  Writes are intentionally restricted to authenticated only (admin-managed), so the
  public contact form uses its own insert policy on contact_messages.
- contact_messages: public insert (anyone can submit), no public read (private to admins).
*/

-- News table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_news" ON news;
CREATE POLICY "public_read_news" ON news FOR SELECT
  TO anon, authenticated USING (true);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  location text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_events" ON events;
CREATE POLICY "public_read_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

-- Faculty table
CREATE TABLE IF NOT EXISTS faculty (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  email text NOT NULL,
  bio text NOT NULL,
  photo_url text,
  research_areas text[] NOT NULL DEFAULT '{}',
  office text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_faculty" ON faculty;
CREATE POLICY "public_read_faculty" ON faculty FOR SELECT
  TO anon, authenticated USING (true);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact" ON contact_messages;
CREATE POLICY "public_insert_contact" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events (start_time ASC);
CREATE INDEX IF NOT EXISTS idx_faculty_name ON faculty (name);
