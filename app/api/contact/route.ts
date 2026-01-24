export const dynamic = 'force-dynamic';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, inquiry_type } = body;

    const response = await resend.emails.send({
      from: 'Vaari Website <info@vaari.org>',
      to: 'Vaarisatpremsolutions@yahoo.com',
      subject: `New ${inquiry_type} Inquiry from ${name}`,
      // reply_to: email, // so you can reply directly to the customer
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Inquiry Type:</strong> ${inquiry_type}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log('RESEND RESPONSE:', response);

    if (response.error) {
      console.error('RESEND ERROR:', response.error);
      return NextResponse.json({ success: false, error: response.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('SERVER ERROR:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
