import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Check-in Timer <onboarding@resend.dev>",
      to: [process.env.NOTIFICATION_EMAIL || "user@example.com"],
      subject: "⚠️ Check-in Timer Expired",
      html: `
        <h1>Check-in Timer Expired</h1>
        <p>Your 48-hour check-in timer has expired. Please check in immediately to reset the timer.</p>
        <p>If you don't check in, this serves as a reminder that your scheduled check-in is overdue.</p>
        <p><a href="http://localhost:3000" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Check In Now</a></p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ message: "Email sent successfully", data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}