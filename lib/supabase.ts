import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    }
  }
  return supabaseInstance;
};

export const supabase = typeof window !== 'undefined' ? getSupabase() : null;

export type Product = {
  id: string;
  name: string;
  bottle_type: 'normal' | 'premium';
  size: string;
  price: number;
  description: string;
  image_url: string;
  in_stock: boolean;
  created_at: string;
};

export type ContactInquiry = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiry_type: 'general' | 'bulk_order' | 'white_label';
  status?: string;
  created_at?: string;
};

export type Testimonial = {
  id?: string;
  customer_name: string;
  customer_type: 'individual' | 'business';
  rating: number;
  message: string;
  company_name?: string;
  is_approved?: boolean;
  created_at?: string;
};

export type Order = {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  order_items: any[];
  total_amount: number;
  order_type: 'retail' | 'bulk' | 'white_label';
  status?: string;
  created_at?: string;
};
