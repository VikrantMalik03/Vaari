export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildFeedbackEmail, FEEDBACK_LINK_ERROR, feedbackSchema, type FeedbackInput } from '@/lib/feedback';
import { getPublishedFeedback, saveFeedback } from '@/lib/feedback-store';

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

export async function GET() {
  return NextResponse.json({ feedback: await getPublishedFeedback() });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    // Real visitors never see this field, so only bots fill it in.
    if (body?.website) return NextResponse.json({ success: true, feedback: null });

    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      const linkError = parsed.error.issues.some((issue) => issue.message === FEEDBACK_LINK_ERROR);
      return NextResponse.json({ success: false, error: linkError ? FEEDBACK_LINK_ERROR : 'Invalid form data' }, { status: 400 });
    }

    const feedback = await saveFeedback(parsed.data);
    const notified = await notifyOwner(parsed.data, Boolean(feedback));

    // The visitor only sees success if the feedback reached the database or the inbox.
    if (!feedback && !notified) {
      return NextResponse.json({ success: false, error: 'Could not save feedback' }, { status: 503 });
    }
    return NextResponse.json({ success: true, feedback });
  } catch (err) {
    console.error('FEEDBACK ERROR:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
