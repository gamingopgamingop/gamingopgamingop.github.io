CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  cover_image_url text,
  author text DEFAULT 'Jane Doe',
  author_avatar_url text,
  published boolean DEFAULT false,
  published_at timestamptz,
  tags text[] DEFAULT '{}',
  reading_time_min int DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_posts_select" ON blog_posts FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "blog_posts_select_published" ON blog_posts FOR SELECT
  TO anon USING (published = true);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);