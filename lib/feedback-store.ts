import type { FeedbackInput, PublishedFeedback } from '@/lib/feedback';

const COLUMNS = 'id,customer_name,company_name,rating,message,created_at';

export type StorageStatus = 'connected' | 'not-configured' | 'error';

/**
 * Talks to Supabase's REST API directly. Reviews need nothing else from Supabase, and its full
 * client library can crash on start-up depending on the server's Node version.
 */
function getConnection() {
  // Tolerates the URL being pasted with a trailing slash or the REST path on the end.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    .replace(/\/+$/, '')
    .replace(/\/rest\/v1$/, '');
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) return null;

  // Publishable keys (sb_publishable_...) are not JWTs and only belong in the apikey header.
  // Legacy anon keys are JWTs, and are sent in both.
  const headers: Record<string, string> = { apikey: key, 'Content-Type': 'application/json' };
  if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;

  return { endpoint: `${url}/rest/v1/testimonials`, headers };
}

/** A short reason such as "404 PGRST205". Contains status and error codes only, so it is safe to show. */
async function failureReason(res: Response) {
  const body = await res.text();
  console.error('SUPABASE ERROR:', res.status, body);
  try {
    return `${res.status} ${JSON.parse(body).code ?? ''}`.trim();
  } catch {
    return String(res.status);
  }
}

function networkReason(error: unknown) {
  console.error('SUPABASE REQUEST FAILED:', error);
  return error instanceof Error && error.name === 'TimeoutError' ? 'timeout' : 'network';
}

/** Highest ratings first, then newest, so positive feedback leads. Never throws. */
export async function loadFeedback(limit = 60): Promise<{ feedback: PublishedFeedback[]; storage: StorageStatus; reason?: string }> {
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
    if (!res.ok) return { feedback: [], storage: 'error', reason: await failureReason(res) };
    return { feedback: await res.json(), storage: 'connected' };
  } catch (error) {
    return { feedback: [], storage: 'error', reason: networkReason(error) };
  }
}

/** Publishes the feedback straight away. Never throws. */
export async function saveFeedback({ name, company, rating, message }: FeedbackInput): Promise<{ review: PublishedFeedback | null; reason?: string }> {
  const connection = getConnection();
  if (!connection) return { review: null, reason: 'not-configured' };
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
    if (!res.ok) return { review: null, reason: await failureReason(res) };
    const rows: PublishedFeedback[] = await res.json();
    return { review: rows[0] ?? null };
  } catch (error) {
    return { review: null, reason: networkReason(error) };
  }
}
