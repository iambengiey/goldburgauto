import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const form = await request.formData();
  const data = Object.fromEntries(form.entries());
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: 'Goldburg Auto <no-reply@goldburgauto.co.za>',
      to: process.env.SALES_EMAIL || 'sales@goldburgauto.co.za',
      subject: 'Website contact form',
      text: JSON.stringify(data, null, 2)
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Mail failed' }, { status: 500 });
  }
}
