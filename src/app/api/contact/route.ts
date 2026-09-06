import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  enquiryType?: string;
  /** Honeypot field — real users never fill this in. */
  company?: string;
}

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "kate@hotstuffstoves.com";
// Resend requires a sending address on a verified domain. Until
// hotstuffstoves.com is verified with Resend, this falls back to Resend's
// shared test sender, which only reliably delivers to the Resend account's
// own owner address. See README.md > Contact form / Resend setup.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Hot Stuff Stoves Website <onboarding@resend.dev>";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, message, enquiryType, company } = body;

  // Honeypot: silently succeed without sending anything.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!message || !message.trim()) {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return NextResponse.json(
      { error: "The contact form is not fully configured yet. Please call or email us directly." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const subject = enquiryType
    ? `New enquiry (${enquiryType}) from ${name}`
    : `New enquiry from ${name}`;

  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    enquiryType ? `Enquiry type: ${enquiryType}` : null,
    "",
    "Message:",
    message,
  ].filter((line): line is string => line !== null);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text: textLines.join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again or call us." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again or call us." },
      { status: 500 },
    );
  }
}
