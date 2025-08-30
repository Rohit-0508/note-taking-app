// config/sendgrid.ts
import dotenv from "dotenv"
import sgMail, { MailDataRequired } from '@sendgrid/mail';

dotenv.config();

// Ensure required env variables exist
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not defined in environment variables");
}
if (!process.env.SENDGRID_SENDER_EMAIL) {
  throw new Error("SENDGRID_SENDER_EMAIL is not defined in environment variables");
}

// Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface SendMailOptions {
  to: string;         // recipient email
  subject: string;    // email subject
  text?: string;      // plain text version
  html?: string;      // html version
}

export const sendEmail = async ({ to, subject, text, html }: SendMailOptions) => {
  try {
    const msg: MailDataRequired = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL!, // "!" tells TS it's not undefined
      subject,
      text: text || "", // fallback for TS strict mode
      html: html || "", // fallback for TS strict mode
    };

    const response = await sgMail.send(msg);
    console.log('✅ Email sent successfully');
    return response;
  } catch (error: any) {
    console.error('❌ Error sending email:', error.response?.body || error.message);
    throw new Error('Failed to send email');
  }
};
