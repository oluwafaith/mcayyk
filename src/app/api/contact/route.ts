import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  try {
    let body: Record<string, string> = {};

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        body[key] = String(value);
      });
    }

    const { name, email, phone, eventType, eventDate, venue, message, _gotcha } = body;

    // Honeypot anti-spam check
    if (_gotcha) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Required field validation
    if (!name || !email || !eventType || !message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, eventType, message)" },
        { status: 400 }
      );
    }

    // 1. Web3Forms support (Free, cost-effective, zero credit card)
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (web3formsKey) {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          from_name: "MC AYYK Website",
          subject: `New Booking Enquiry: ${eventType} from ${name}`,
          name,
          email,
          phone: phone || "Not provided",
          eventType,
          eventDate: eventDate || "Not specified",
          venue: venue || "Not specified",
          message,
        }),
      });

      const web3Data = await web3Res.json().catch(() => ({}));
      if (!web3Res.ok || !web3Data.success) {
        console.error("Web3Forms error:", web3Data);
        return NextResponse.json({ error: web3Data.message || "Failed to send via Web3Forms" }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: "Enquiry sent successfully via Web3Forms!" });
    }

    // 2. Formspree / external endpoint forwarding
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (formspreeEndpoint) {
      const formspreeRes = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Booking Enquiry: ${eventType} from ${name}`,
          name,
          email,
          phone: phone || "Not provided",
          eventType,
          eventDate: eventDate || "Not specified",
          venue: venue || "Not specified",
          message,
        }),
      });

      if (!formspreeRes.ok) {
        const errorText = await formspreeRes.text();
        console.error("Formspree error:", errorText);
        return NextResponse.json({ error: "Failed to send via Formspree" }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: "Enquiry sent successfully via Formspree!" });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // 3. Resend API key support (optional alternative)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "MC AYYK Website <onboarding@resend.dev>",
          to: [site.email],
          reply_to: email,
          subject: `New Booking Enquiry: ${eventType} from ${name}`,
          html: buildHtmlEmail({ name, email, phone, eventType, eventDate, venue, message }),
        }),
      });

      if (!resendRes.ok) {
        const errorText = await resendRes.text();
        console.error("Resend API error:", errorText);
        return NextResponse.json({ error: "Failed to send email via Resend" }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: "Enquiry sent successfully via Resend" });
    }

    // Nodemailer SMTP support
    if (!smtpUser || !smtpPass) {
      console.warn("SMTP_USER and SMTP_PASS environment variables are not configured.");
      return NextResponse.json(
        {
          error: "Email server configuration missing. Please set SMTP_USER and SMTP_PASS in environment variables.",
          fallbackMailto: true,
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: site.email,
      subject: `New Booking Enquiry: ${eventType} from ${name}`,
      text: `
New Booking Enquiry for MC AYYK

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Event Type: ${eventType}
Event Date: ${eventDate || "Not specified"}
Venue / Location: ${venue || "Not specified"}

Message:
${message}
      `.trim(),
      html: buildHtmlEmail({ name, email, phone, eventType, eventDate, venue, message }),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Booking enquiry sent successfully!" });
  } catch (error) {
    console.error("Contact API Route Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your enquiry." },
      { status: 500 }
    );
  }
}

function buildHtmlEmail(data: {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  venue?: string;
  message: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #c49a1c; margin-top: 0;">🎤 New Booking Enquiry for MC AYYK</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; width: 140px; color: #555;">Full Name:</td>
          <td style="padding: 8px;">${data.name}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
          <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #555;">Phone:</td>
          <td style="padding: 8px;">${data.phone || "Not provided"}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; color: #555;">Event Type:</td>
          <td style="padding: 8px;"><strong>${data.eventType}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #555;">Event Date:</td>
          <td style="padding: 8px;">${data.eventDate || "Not specified"}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; color: #555;">Venue / Location:</td>
          <td style="padding: 8px;">${data.venue || "Not specified"}</td>
        </tr>
      </table>
      <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #c49a1c; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #333;">Message:</h4>
        <p style="white-space: pre-wrap; margin-bottom: 0; color: #444;">${data.message}</p>
      </div>
      <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
        This email was sent from the MC AYYK website contact form.
      </p>
    </div>
  `;
}
