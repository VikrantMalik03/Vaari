/*
  # VAARI Water Company Database Schema

  ## Overview
  Creates tables for managing water bottle products, orders, testimonials, and contact inquiries
  for the VAARI water company website.

  ## New Tables
  
  ### `products`
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `bottle_type` (text) - 'normal' or 'premium'
  - `size` (text) - Bottle size (200ml, 250ml, 500ml, 1L)
  - `price` (numeric) - Product price
  - `description` (text) - Product description
  - `image_url` (text) - Product image URL
  - `in_stock` (boolean) - Availability status
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `contact_inquiries`
  - `id` (uuid, primary key) - Unique inquiry identifier
  - `name` (text) - Customer name
  - `email` (text) - Customer email
  - `phone` (text) - Customer phone number
  - `message` (text) - Inquiry message
  - `inquiry_type` (text) - Type: 'general', 'bulk_order', 'white_label'
  - `status` (text) - Status: 'new', 'contacted', 'closed'
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `testimonials`
  - `id` (uuid, primary key) - Unique testimonial identifier
  - `customer_name` (text) - Customer/business name
  - `customer_type` (text) - 'individual', 'business'
  - `rating` (integer) - Rating (1-5)
  - `message` (text) - Testimonial message
  - `company_name` (text, optional) - Company name for business customers
  - `is_approved` (boolean) - Approval status
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `orders`
  - `id` (uuid, primary key) - Unique order identifier
  - `customer_name` (text) - Customer name
  - `customer_email` (text) - Customer email
  - `customer_phone` (text) - Customer phone
  - `delivery_address` (text) - Delivery address
  - `order_items` (jsonb) - Order items array
  - `total_amount` (numeric) - Total order amount
  - `order_type` (text) - 'retail', 'bulk', 'white_label'
  - `status` (text) - Order status
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for public read access (products, testimonials)
  - Add policies for insert access (contact_inquiries, orders)
  - Restrict admin operations to authenticated users
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bottle_type text NOT NULL CHECK (bottle_type IN ('normal', 'premium')),
  size text NOT NULL,
  price numeric(10,2) NOT NULL DEFAULT 0,
  description text DEFAULT '',
  image_url text DEFAULT '',
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  inquiry_type text DEFAULT 'general' CHECK (inquiry_type IN ('general', 'bulk_order', 'white_label')),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
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

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  delivery_address text NOT NULL,
  order_items jsonb NOT NULL DEFAULT '[]',
  total_amount numeric(10,2) NOT NULL DEFAULT 0,
  order_type text DEFAULT 'retail' CHECK (order_type IN ('retail', 'bulk', 'white_label')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'delivered', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products policies (public can read, authenticated can manage)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Contact inquiries policies (anyone can insert, authenticated can view)
CREATE POLICY "Anyone can submit contact inquiries"
  ON contact_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact inquiries"
  ON contact_inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact inquiries"
  ON contact_inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Testimonials policies (public can read approved, authenticated can manage)
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Authenticated users can view all testimonials"
  ON testimonials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can submit testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (true);

-- Orders policies (anyone can create, authenticated can view/manage)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample products
INSERT INTO products (name, bottle_type, size, price, description, in_stock) VALUES
  ('VAARI Pure Water 200ml', 'normal', '200ml', 10.00, 'Perfect for on-the-go hydration. Our 200ml bottle is ideal for quick refreshment.', true),
  ('VAARI Pure Water 250ml', 'normal', '250ml', 12.00, 'Compact and convenient 250ml bottle for everyday use.', true),
  ('VAARI Pure Water 500ml', 'normal', '500ml', 20.00, 'Our most popular size - 500ml of pure, refreshing water.', true),
  ('VAARI Pure Water 1L', 'normal', '1L', 35.00, 'Large 1 liter bottle perfect for family use and long trips.', true),
  ('VAARI Premium 200ml', 'premium', '200ml', 15.00, 'Premium packaged 200ml bottle with enhanced minerals and elegant design.', true),
  ('VAARI Premium 250ml', 'premium', '250ml', 18.00, 'Premium 250ml bottle with superior packaging and mineral enrichment.', true),
  ('VAARI Premium 500ml', 'premium', '500ml', 30.00, 'Premium 500ml with copper-enriched purification and luxury packaging.', true),
  ('VAARI Premium 1L', 'premium', '1L', 50.00, 'Premium 1 liter bottle - the ultimate in pure, mineral-enriched hydration.', true);

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, customer_type, rating, message, company_name, is_approved) VALUES
  ('Rajesh Kumar', 'individual', 5, 'VAARI water has become a staple in our home. The taste is pure and refreshing!', '', true),
  ('The Grand Hotel', 'business', 5, 'We switched to VAARI for our hotel guests and the feedback has been outstanding. Professional service and excellent quality.', 'The Grand Hotel, Delhi', true),
  ('Priya Sharma', 'individual', 5, 'Love the premium bottles! The packaging is elegant and the water quality is exceptional.', '', true),
  ('TechCorp India', 'business', 5, 'VAARI has been supplying our office for 6 months now. Reliable delivery and great white-label options.', 'TechCorp India Pvt Ltd', true);