import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

function sanitize(value: string): string {
  return value.replace(/[<>"'&]/g, (ch) => {
    const map: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;"
    };
    return map[ch] ?? ch;
  });
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    // ── Validation ──
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email?.trim() || !validateEmail(email.trim())) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if (!message?.trim() || message.trim().length < 24) {
      return NextResponse.json({ error: "Message must be at least 24 characters." }, { status: 400 });
    }

    // ── Sanitize ──
    const clean = {
      name: sanitize(name.trim()).slice(0, 100),
      email: email.trim().slice(0, 254),
      subject: sanitize((subject || "").trim()).slice(0, 200) || "No Subject",
      message: sanitize(message.trim()).slice(0, 2000)
    };

    // ── Check email credentials ──
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("EMAIL_USER or EMAIL_PASS environment variables are not set.");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact via email directly." },
        { status: 503 }
      );
    }

    // ── Send email ──
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: clean.email,
      subject: `[Portfolio] ${clean.subject} — from ${clean.name}`,
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:auto;background:#0f0f23;color:#F1F5F9;padding:32px;border-radius:16px;border:1px solid rgba(139,92,246,0.3)">
          <h2 style="color:#8B5CF6;margin-bottom:4px">New Portfolio Message</h2>
          <hr style="border-color:rgba(139,92,246,0.2);margin-bottom:24px"/>
          <p><strong style="color:#94A3B8">From:</strong> ${clean.name}</p>
          <p><strong style="color:#94A3B8">Email:</strong> ${clean.email}</p>
          <p><strong style="color:#94A3B8">Subject:</strong> ${clean.subject}</p>
          <hr style="border-color:rgba(139,92,246,0.1);margin:16px 0"/>
          <p style="white-space:pre-wrap;color:#CBD5E1">${clean.message}</p>
          <hr style="border-color:rgba(139,92,246,0.1);margin:16px 0"/>
          <p style="font-size:12px;color:#475569">Sent via portfolio contact form · ${new Date().toISOString()}</p>
        </div>
      `
    });

    return NextResponse.json({ message: "Message received!", success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}
