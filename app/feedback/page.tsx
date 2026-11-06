import type { Metadata } from 'next';
import { FeedbackView } from '@/components/feedback-view';
import { loadFeedback } from '@/lib/feedback-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Customer Feedback | VAARI',
  description: 'Read what VAARI customers say, and share your own experience with our purified drinking water.',
};

export default async function FeedbackPage() {
  const { feedback } = await loadFeedback();
  return <FeedbackView feedback={feedback} />;
}
