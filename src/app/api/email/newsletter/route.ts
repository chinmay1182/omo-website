import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '../../../services/emailService';
import nodemailer from 'nodemailer';

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
    
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.log('--- Mock Newsletter Signup ---');
      console.log('Email subscribed:', email);
      console.log('------------------------------');
      return NextResponse.json(
        { message: 'Mock subscription successful (SMTP not configured)' },
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
      to: email, 
      bcc: smtpUser, // Send a copy to the admin as well
      subject: `Welcome to OMO Digital Newsletter!`,
      html: welcomeTemplate,
    });

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
