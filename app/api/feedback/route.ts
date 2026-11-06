export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildFeedbackEmail, feedbackSchema, type FeedbackInput } from '@/lib/feedback';
import { saveFeedback } from '@/lib/feedback-store';

async function notifyOwner(input: FeedbackInput, saved: boolean) {
  if (!process.env.RESEND_API_KEY) return false;
  try {
    const { subject, html } = buildFeedbackEmail(input, saved);
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: 'Vaari Website <info@vaari.org>',
      to: 'Vaarisatpremsolutions@yahoo.com',
      subject,
      html,
    });
    if (error) console.error('FEEDBACK EMAIL ERROR:', error);
    return !error;
  } catch (err) {
    console.error('FEEDBACK EMAIL ERROR:', err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    // Real visitors never see this field, so only bots fill it in.
    if (body?.website) return NextResponse.json({ success: true });

    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid form data' }, { status: 400 });
    }

    const saved = await saveFeedback(parsed.data);
    const notified = await notifyOwner(parsed.data, saved);

    // The visitor only sees success if the feedback reached the database or the inbox.
    if (!saved && !notified) {
      return NextResponse.json({ success: false, error: 'Could not save feedback' }, { status: 503 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('FEEDBACK ERROR:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
