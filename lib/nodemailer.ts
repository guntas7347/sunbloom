"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

/**
 * Interface for the sendEmail function parameters
 */
interface SendEmailOptions {
  subject: string;
  html?: string;
}

/**
 * Utility function to send an email using Gmail and Nodemailer
 */
export async function sendEmail({ subject, html }: SendEmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Sunbloom" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, error };
  }
}
