import { createClient } from '@supabase/supabase-js';
import type { FeedbackInput, PublishedFeedback } from '@/lib/feedback';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Only feedback a person has approved in Supabase is returned. */
export async function getPublishedFeedback(): Promise<PublishedFeedback[]> {
  const client = getClient();
  if (!client) return [];
  const { data, error } = await client
    .from('testimonials')
    .select('id, customer_name, company_name, rating, message, created_at')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(60);
  if (error) {
    console.error('FEEDBACK READ ERROR:', error);
    return [];
  }
  return data ?? [];
}

/** New feedback always starts hidden. Returns whether it was saved. */
export async function saveFeedback({ name, company, rating, message }: FeedbackInput) {
  const client = getClient();
  if (!client) return false;
  const { error } = await client.from('testimonials').insert({
    customer_name: name,
    company_name: company,
    customer_type: company ? 'business' : 'individual',
    rating,
    message,
    is_approved: false,
  });
  if (error) {
    console.error('FEEDBACK SAVE ERROR:', error);
    return false;
  }
  return true;
}
