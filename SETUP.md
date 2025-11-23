# VAARI Website - Setup Instructions

## Quick Start Guide

Follow these steps to get the VAARI water company website up and running.

## Step 1: Supabase Setup

### 1.1 Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign Up"
3. Sign up with GitHub, Google, or email

### 1.2 Create a New Project
1. Once logged in, click "New Project"
2. Fill in the project details:
   - **Name**: vaari-water (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to Delhi (Asia South - Mumbai)
3. Click "Create new project"
4. Wait 2-3 minutes for your project to be set up

### 1.3 Get Your API Credentials
1. In your Supabase project dashboard, click on "Settings" (gear icon in sidebar)
2. Go to "API" section
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (a long string starting with `eyJ...`)
4. Copy both values - you'll need them in the next step

## Step 2: Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages (Next.js, React, Tailwind CSS, Supabase client, etc.)

## Step 4: Database Setup

**Good News!** The database migration has already been applied during the project setup. Your Supabase database now has:

- ✅ All required tables (products, testimonials, contact_inquiries, orders)
- ✅ Sample products (8 products: 4 Normal + 4 Premium)
- ✅ Sample testimonials (4 testimonials)
- ✅ Row Level Security (RLS) policies
- ✅ Proper indexes and constraints

### Verify Your Database

1. Go to your Supabase dashboard
2. Click "Table Editor" in the sidebar
3. You should see these tables:
   - `products` (with 8 sample products)
   - `contact_inquiries` (empty, will fill with form submissions)
   - `testimonials` (with 4 sample reviews)
   - `orders` (empty, for future order tracking)

## Step 5: Run the Development Server

Start the development server:

```bash
npm run dev
```

The website will be available at: [http://localhost:3000](http://localhost:3000)

## Step 6: Test the Website

### What to Test:
1. **Navigation**: Click through all menu items
2. **Popup Menu**: Click "Get in Touch" button
   - Test Call button
   - Test WhatsApp button
   - Test White Label/Customize option
3. **Products Section**: View Normal and Premium products
4. **Contact Form**: Submit a test inquiry
5. **All Sections**: Scroll through entire page

### Verify Database Integration:
1. Submit a contact form
2. Go to Supabase Dashboard > Table Editor > `contact_inquiries`
3. You should see your submission!

## Step 7: Customize Content

### Update Company Information

Edit these files to customize:

1. **Contact Details** (`components/contact-section.tsx`):
   - Phone numbers
   - Email address
   - Working hours

2. **Products** (Supabase Dashboard):
   - Go to Table Editor > `products`
   - Edit prices, descriptions, sizes
   - Add/remove products as needed

3. **Testimonials** (Supabase Dashboard):
   - Go to Table Editor > `testimonials`
   - Set `is_approved = true` to display
   - Add new testimonials

## Building for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `out` directory.

## Common Issues & Solutions

### Issue: "Invalid supabaseUrl" Error
**Solution**: Make sure you've added the correct Supabase URL and anon key to `.env.local`

### Issue: Products Not Showing
**Solution**:
1. Check your Supabase credentials are correct
2. Verify products exist in the `products` table
3. Ensure products have `in_stock = true`

### Issue: Contact Form Not Working
**Solution**:
1. Open browser console (F12) to check for errors
2. Verify Supabase credentials
3. Check `contact_inquiries` table exists

### Issue: Build Fails
**Solution**:
1. Delete `.next` folder
2. Run `npm install` again
3. Try `npm run build` again

## Need Help?

If you encounter any issues:

1. Check the browser console for errors (Press F12)
2. Check terminal for error messages
3. Verify all environment variables are set correctly
4. Make sure Supabase project is active and running

## Next Steps

After successful setup:

1. **Customize Design**: Modify colors, fonts, and styles in the component files
2. **Add Content**: Update text, images, and information
3. **Configure Products**: Add your actual product catalog
4. **Set Up Domain**: Deploy to Vercel, Netlify, or your hosting provider
5. **Test Forms**: Ensure all form submissions work correctly

## Production Checklist

Before going live:

- [ ] Update all placeholder text
- [ ] Add real product images
- [ ] Verify all contact information
- [ ] Test contact form submissions
- [ ] Check mobile responsiveness
- [ ] Test all navigation links
- [ ] Verify legal pages (Privacy, Terms, Refund)
- [ ] Set up custom domain
- [ ] Enable SSL/HTTPS
- [ ] Test cross-browser compatibility

## Support

For any questions or issues:
- Email: Vaarisatpremsolutions@yahoo.com
- Phone: +91 9268448510

---

**Congratulations!** Your VAARI Water Company website is now ready to use! 🎉
