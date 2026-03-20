import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '../../../services/emailService';
import nodemailer from 'nodemailer';

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

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.log('--- Mock Contact Form Delivery ---');
      console.log('To:', smtpUser || 'Not Configured');
      console.log('From:', fullName, '<' + companyEmail + '>');
      console.log('Company:', companyName);
      console.log('Message:', projectDescription);
      console.log('---------------------------------');
      return NextResponse.json(
        { message: 'Mock delivery successful' },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || '465'),
      secure: parseInt(smtpPort || '465') === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `OMO Digital <${smtpUser}>`,
      to: smtpUser,
      replyTo: companyEmail,
      subject: `New enquiry from ${fullName}`,
      html: emailTemplate,
    });

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
