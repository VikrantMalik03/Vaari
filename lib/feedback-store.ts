import { createClient } from '@supabase/supabase-js';
import type { FeedbackInput, PublishedFeedback } from '@/lib/feedback';

const COLUMNS = 'id, customer_name, company_name, rating, message, created_at';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Highest ratings first, then newest, so positive feedback leads. */
export async function getPublishedFeedback(limit = 60): Promise<PublishedFeedback[]> {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client
    .from('testimonials')
    .select(COLUMNS)
    .eq('is_approved', true)
    .order('rating', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('FEEDBACK READ ERROR:', error);
    return [];
  }
  return data ?? [];
}

/** Publishes the feedback straight away. Returns the saved review, or null if it could not be saved. */
export async function saveFeedback({ name, company, rating, message }: FeedbackInput): Promise<PublishedFeedback | null> {
  const client = getClient();
  if (!client) {
    console.error('FEEDBACK SAVE ERROR: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
    return null;
  }
  const { data, error } = await client
    .from('testimonials')
    .insert({
      customer_name: name,
      company_name: company,
      customer_type: company ? 'business' : 'individual',
      rating,
      message,
      is_approved: true,
    })
    .select(COLUMNS)
    .single();
  if (error) {
    console.error('FEEDBACK SAVE ERROR:', error);
    return null;
  }
  return data;
}
