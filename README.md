# VAARI Water Company Website

A modern, responsive website for VAARI by SATPREM SOLUTIONS - a premium bottled water company serving Delhi NCR.

## Features

### Frontend Features
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Navigation with Popup Menu**: Quick access to Call, WhatsApp, and White Label options
- **Hero Section**: Compelling landing page with company mission and value propositions
- **About Us**: Detailed company background, water source information, and certifications
- **Products Showcase**: Display of both Normal and Premium water bottle ranges (200ml, 250ml, 500ml, 1L)
- **Delivery Information**: Service areas, working hours, and ordering options
- **Contact Form**: Integrated contact form with inquiry type selection
- **Testimonials**: Customer reviews and ratings from individuals and businesses
- **Legal Pages**: Privacy Policy, Terms & Conditions, and Refund Policy

### Technical Features
- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Full type safety
- **Supabase Database**: PostgreSQL database with Row Level Security
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui Components**: Beautiful, accessible UI components
- **Form Validation**: Client-side validation for all forms
- **Toast Notifications**: User-friendly feedback messages
- **SEO Optimized**: Proper meta tags and semantic HTML

## Database Schema

The application uses Supabase with the following tables:

1. **products**: Store product information (bottle types, sizes, prices)
2. **contact_inquiries**: Store customer inquiries and messages
3. **testimonials**: Store customer reviews and ratings
4. **orders**: Track customer orders and delivery information

All tables have Row Level Security (RLS) enabled for data protection.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- A Supabase account and project
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /path/to/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Project Settings > API
   - Copy your project URL and anon key

4. **Configure environment variables**

   Update the `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Database Setup**

   The database migration has already been applied to your Supabase instance. It includes:
   - All table schemas
   - Sample products (Normal and Premium ranges)
   - Sample testimonials
   - Row Level Security policies

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
```

The static site will be generated in the `out` directory.

## Project Structure

```
├── app/
│   ├── page.tsx                 # Main home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── privacy-policy/          # Privacy policy page
│   ├── terms-conditions/        # Terms & conditions page
│   └── refund-policy/           # Refund policy page
├── components/
│   ├── navigation.tsx           # Header navigation with popup
│   ├── hero-section.tsx         # Hero/landing section
│   ├── about-section.tsx        # About company section
│   ├── products-section.tsx     # Products display
│   ├── delivery-section.tsx     # Delivery information
│   ├── contact-section.tsx      # Contact form
│   ├── testimonials-section.tsx # Customer reviews
│   ├── footer.tsx               # Footer component
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── supabase.ts              # Supabase client configuration
│   └── utils.ts                 # Utility functions
└── public/                      # Static assets
```

## Key Pages and Sections

### Home Page
- Hero section with brand messaging
- About company overview
- Product catalog
- Delivery information
- Customer testimonials
- Contact form
- Footer with quick links

### Navigation Features
- Sticky header with smooth scroll
- Mobile-responsive menu
- Quick action popup with:
  - Call button (9268448510)
  - WhatsApp button (8929695631)
  - White Label inquiry option

### Product Sections
- **Normal Range**: Standard bottled water (200ml, 250ml, 500ml, 1L)
- **Premium Range**: Copper-enriched water (200ml, 250ml, 500ml, 1L)
- Filterable by product type
- Direct ordering CTA buttons

### Contact Information
- **Phone**: +91 9268448510 / +91 8929695631
- **Email**: Vaarisatpremsolutions@yahoo.com
- **Working Hours**: 9:00 AM - 6:00 PM (Monday-Saturday)
- **Service Area**: Delhi NCR

## Customization

### Updating Product Information
Products are managed in the Supabase `products` table. You can:
- Add new products
- Update prices
- Change availability status
- Modify descriptions

### Managing Testimonials
Testimonials require approval before displaying:
1. Submissions are saved with `is_approved = false`
2. Admin reviews and approves testimonials
3. Only approved testimonials appear on the website

### Contact Inquiries
All contact form submissions are saved in the `contact_inquiries` table with status tracking.

## Database Management

### Accessing Your Database
1. Log in to [supabase.com](https://supabase.com)
2. Select your project
3. Go to "Table Editor" to view/edit data
4. Use "SQL Editor" for custom queries

### Sample Queries

View all products:
```sql
SELECT * FROM products ORDER BY bottle_type, size;
```

View pending inquiries:
```sql
SELECT * FROM contact_inquiries WHERE status = 'new' ORDER BY created_at DESC;
```

Approve a testimonial:
```sql
UPDATE testimonials SET is_approved = true WHERE id = 'testimonial-id';
```

## Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)
- **Forms**: React Hook Form with Zod validation

## Support

For technical support or questions:
- Email: Vaarisatpremsolutions@yahoo.com
- Phone: +91 9268448510

## License

Copyright © 2025 VAARI by SATPREM SOLUTIONS. All rights reserved.
