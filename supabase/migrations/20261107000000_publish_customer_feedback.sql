/*
  Customer feedback, published as soon as it is submitted.

  Safe to run on a new or existing Supabase project: paste it into the SQL Editor and run it.

  - Anyone can read published feedback and submit new feedback.
  - Feedback must have a 1 to 5 star rating and cannot contain links.
  - To remove a review, delete its row in the Table Editor, or set is_approved to false to hide it.
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_type text DEFAULT 'individual' CHECK (customer_type IN ('individual', 'business')),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message text NOT NULL,
  company_name text DEFAULT '',
  is_approved boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ALTER COLUMN is_approved SET DEFAULT true;

-- Removes the made-up reviews seeded by the first migration, if it was ever run.
DELETE FROM testimonials
WHERE (customer_name = 'Rajesh Kumar' AND message LIKE 'VAARI water has become a staple%')
   OR (customer_name = 'The Grand Hotel' AND message LIKE 'We switched to VAARI for our hotel guests%')
   OR (customer_name = 'Priya Sharma' AND message LIKE 'Love the premium bottles!%')
   OR (customer_name = 'TechCorp India' AND message LIKE 'VAARI has been supplying our office%');

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON testimonials TO anon;

DROP POLICY IF EXISTS "Anyone can view approved testimonials" ON testimonials;
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  USING (is_approved = true);

DROP POLICY IF EXISTS "Anyone can submit testimonials" ON testimonials;
CREATE POLICY "Anyone can submit testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (
    is_approved = true
    AND rating BETWEEN 1 AND 5
    AND char_length(customer_name) BETWEEN 2 AND 80
    AND char_length(coalesce(company_name, '')) <= 100
    AND char_length(message) BETWEEN 10 AND 1000
    AND message !~* '(https?://|www\.)'
  );
