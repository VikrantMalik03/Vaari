import { z } from 'zod';

const INQUIRY_LABELS = {
  general: 'General',
  bulk_order: 'Bulk Order',
  white_label: 'White Label',
} as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(1).max(30),
  message: z.string().trim().min(1).max(5000),
  inquiry_type: z.enum(['general', 'bulk_order', 'white_label']),
});

export type ContactInquiry = z.infer<typeof contactSchema>;

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Visitor text is escaped before it goes in the email, so it can only ever show as plain text. */
export function buildContactEmail({ name, email, phone, message, inquiry_type }: ContactInquiry) {
  const type = INQUIRY_LABELS[inquiry_type];
  return {
    // Line breaks are removed so a name cannot add extra lines to the subject.
    subject: `New ${type} Inquiry from ${name.replace(/[\r\n]+/g, ' ')}`,
    html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Inquiry Type:</strong> ${type}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>
      `,
  };
}
