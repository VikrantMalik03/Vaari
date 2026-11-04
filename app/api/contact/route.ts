export const dynamic = 'force-dynamic';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { buildContactEmail, contactSchema } from '@/lib/contact-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const parsed = contactSchema.safeParse(await req.json().catch(() => null));

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid form data' }, { status: 400 });
    }

    const { subject, html } = buildContactEmail(parsed.data);

    const response = await resend.emails.send({
      from: 'Vaari Website <info@vaari.org>',
      to: 'Vaarisatpremsolutions@yahoo.com',
      subject,
      // reply_to: email, // so you can reply directly to the customer
      html,
    });

    if (response.error) {
      console.error('RESEND ERROR:', response.error);
      return NextResponse.json({ success: false, error: 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('SERVER ERROR:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
