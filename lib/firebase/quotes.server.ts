"use server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import nodemailer from "nodemailer";

export type QuoteInput = {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  eventType: string;
  message: string;
  phone: string;
};

const COL = "quotes";

export async function submitQuote(data: QuoteInput) {
  const payload = {
    ...data,
    createdAt: Date.now(),
  };

  // Save to Firebase
  const ref = await addDoc(collection(db, COL), payload);

  // Send email (fire-and-forget)
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const quoteUrl = `https://www.Sunbloom Img..ca/admin/quotes/${ref.id}`;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "New quote received",
      text: `
New quote submitted

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Event: ${data.eventType}
Date: ${data.date}

Open in CMS:
${quoteUrl}
`.trim(),
    });
  } catch (e) {
    console.error("Email failed:", e);
  }

  return ref.id;
}
