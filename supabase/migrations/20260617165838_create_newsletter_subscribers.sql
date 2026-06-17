CREATE TABLE newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  active boolean DEFAULT true
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "newsletter_insert" ON newsletter_subscribers FOR INSERT
  TO anon WITH CHECK (true);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);