/*
  Customer feedback page.

  Safe to run on a new or existing Supabase project: paste it into the SQL Editor and run it.

  - Visitors can read approved feedback only.
  - Visitors can submit feedback, but it always starts hidden. This replaces the earlier
    rule that let anyone with the public key submit feedback already marked as approved.
  - To publish feedback, set is_approved to true on its row in the Table Editor.
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_type text DEFAULT 'individual' CHECK (customer_type IN ('individual', 'business')),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message text NOT NULL,
  company_name text DEFAULT '',
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view approved testimonials" ON testimonials;
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  USING (is_approved = true);

DROP POLICY IF EXISTS "Anyone can submit testimonials" ON testimonials;
CREATE POLICY "Anyone can submit testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (is_approved = false);
