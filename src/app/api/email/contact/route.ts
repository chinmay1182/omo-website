import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '../../../services/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, companyEmail, companyName, projectDescription } = body;

    // Validate required fields
    if (!fullName || !companyEmail || !companyName || !projectDescription) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const emailTemplate = emailService.generateContactEmailTemplate({
      fullName,
      companyEmail,
      companyName,
      projectDescription
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL_TO || 'support@omodigital.io';

    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Contact delivery is not configured on the server' },
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
        from: process.env.CONTACT_EMAIL_FROM || 'OMO Digital <noreply@omodigital.io>',
        to: [contactEmail],
        reply_to: companyEmail,
        subject: `New enquiry from ${fullName}`,
        html: emailTemplate,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend contact email failed:', errorText);
      return NextResponse.json(
        { error: 'Unable to deliver contact request right now' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
