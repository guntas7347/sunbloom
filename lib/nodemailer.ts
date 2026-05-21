"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

interface SendEmailOptions {
  subject: string;
  html?: string;
}

export async function sendEmail({ subject, html }: SendEmailOptions) {
  try {
    const info = await transporter.sendMail({
      to: process.env.TARGET_EMAIL,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.log("Failed to send email:", error);

    return { success: false, error };
  }
}
