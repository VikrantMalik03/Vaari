import { z } from 'zod';
import { escapeHtml } from '@/lib/contact-email';

export const FEEDBACK_LINK_ERROR = 'Please remove links from your feedback.';

export const feedbackSchema = z.object({
  name: z.string().trim().min(2).max(80),
  company: z.string().trim().max(100).optional().default(''),
  rating: z.number().int().min(1).max(5),
  message: z
    .string()
    .trim()
    .min(10)
    .max(1000)
    .refine((text) => !/(https?:\/\/|www\.)/i.test(text), FEEDBACK_LINK_ERROR),
  consent: z.literal(true),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;

export interface PublishedFeedback {
  id: string;
  customer_name: string;
  company_name: string | null;
  rating: number;
  message: string;
  created_at: string;
}

export function buildFeedbackEmail({ name, company, rating, message }: FeedbackInput, saved: boolean) {
  const next = saved
    ? 'It is now live on the website. To remove it, delete its row in the testimonials table in Supabase.'
    : 'It could not be saved to the database, so it is not on the website and this email is the only copy.';
  return {
    subject: `New ${rating}-star feedback from ${name.replace(/[\r\n]+/g, ' ')}`,
    html: `
        <h2>New Customer Feedback</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company) || '-'}</p>
        <p><strong>Rating:</strong> ${rating} out of 5</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>
        <p><em>${next}</em></p>
      `,
  };
}
