import type { FeedbackInput, PublishedFeedback } from '@/lib/feedback';

const COLUMNS = 'id,customer_name,company_name,rating,message,created_at';

export type StorageStatus = 'connected' | 'not-configured' | 'error';

/**
 * Talks to Supabase's REST API directly. Reviews need nothing else from Supabase, and its full
 * client library can crash on start-up depending on the server's Node version.
 */
function getConnection() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, '');
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) return null;
  return {
    endpoint: `${url}/rest/v1/testimonials`,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
  };
}

/** Highest ratings first, then newest, so positive feedback leads. Never throws. */
export async function loadFeedback(limit = 60): Promise<{ feedback: PublishedFeedback[]; storage: StorageStatus }> {
  const connection = getConnection();
  if (!connection) return { feedback: [], storage: 'not-configured' };
  try {
    const query = new URLSearchParams({
      select: COLUMNS,
      is_approved: 'eq.true',
      order: 'rating.desc,created_at.desc',
      limit: String(limit),
    });
    const res = await fetch(`${connection.endpoint}?${query}`, {
      headers: connection.headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return { feedback: await res.json(), storage: 'connected' };
  } catch (error) {
    console.error('FEEDBACK READ ERROR:', error);
    return { feedback: [], storage: 'error' };
  }
}

/** Publishes the feedback straight away. Returns the saved review, or null if it could not be saved. */
export async function saveFeedback({ name, company, rating, message }: FeedbackInput): Promise<PublishedFeedback | null> {
  const connection = getConnection();
  if (!connection) {
    console.error('FEEDBACK SAVE ERROR: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
    return null;
  }
  try {
    const res = await fetch(`${connection.endpoint}?select=${COLUMNS}`, {
      method: 'POST',
      headers: { ...connection.headers, Prefer: 'return=representation' },
      body: JSON.stringify({
        customer_name: name,
        company_name: company,
        customer_type: company ? 'business' : 'individual',
        rating,
        message,
        is_approved: true,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    const rows: PublishedFeedback[] = await res.json();
    return rows[0] ?? null;
  } catch (error) {
    console.error('FEEDBACK SAVE ERROR:', error);
    return null;
  }
}
