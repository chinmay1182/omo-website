import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '../../../services/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const welcomeTemplate = emailService.generateNewsletterWelcomeTemplate(email);
    const resendApiKey = process.env.RESEND_API_KEY;
    const newsletterEmail = process.env.NEWSLETTER_EMAIL_TO || 'support@omodigital.io';

    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Newsletter delivery is not configured on the server' },
        { status: 503 }
      );
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.NEWSLETTER_EMAIL_FROM || 'OMO Digital <noreply@omodigital.io>',
        to: [newsletterEmail],
        reply_to: email,
        subject: `New newsletter signup from ${email}`,
        html: welcomeTemplate,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend newsletter email failed:', errorText);
      return NextResponse.json(
        { error: 'Unable to process newsletter request right now' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
