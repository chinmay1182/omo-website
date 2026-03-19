// Email service for contact forms and newsletters
interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface ContactFormData {
  fullName: string;
  companyEmail: string;
  companyName: string;
  projectDescription: string;
}

interface NewsletterData {
  email: string;
}

class EmailService {
  private apiEndpoint: string;

  constructor() {
    this.apiEndpoint = '/api/email';
  }

  async sendContactForm(data: ContactFormData): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiEndpoint}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send contact form:', error);
      return false;
    }
  }

  async subscribeNewsletter(data: NewsletterData): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiEndpoint}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to subscribe to newsletter:', error);
      return false;
    }
  }

  // Email templates
  generateContactEmailTemplate(data: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8b5cf6; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Full Name:</div>
                <div class="value">${data.fullName}</div>
              </div>
              <div class="field">
                <div class="label">Company Email:</div>
                <div class="value">${data.companyEmail}</div>
              </div>
              <div class="field">
                <div class="label">Company Name:</div>
                <div class="value">${data.companyName}</div>
              </div>
              <div class="field">
                <div class="label">Project Description:</div>
                <div class="value">${data.projectDescription}</div>
              </div>
              <div class="field">
                <div class="label">Submitted At:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  generateNewsletterWelcomeTemplate(email: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to OMO Digital Newsletter</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8b5cf6; color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .button { display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to OMO Digital!</h1>
            </div>
            <div class="content">
              <h2>Thank you for subscribing!</h2>
              <p>Hi there,</p>
              <p>Welcome to the OMO Digital newsletter! You'll now receive updates about:</p>
              <ul>
                <li>Latest technology trends and insights</li>
                <li>New service offerings</li>
                <li>Case studies and success stories</li>
                <li>Industry news and updates</li>
              </ul>
              <p>We're excited to have you on board!</p>
              <a href="https://omodigital.io" class="button">Visit Our Website</a>
              <p><small>If you didn't subscribe to this newsletter, you can <a href="mailto:hello@omodigital.io?subject=Newsletter%20Unsubscribe">unsubscribe here</a>.</small></p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

export const emailService = new EmailService();
export default EmailService;
