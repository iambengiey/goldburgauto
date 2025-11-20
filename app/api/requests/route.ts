import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
  const form = await request.formData();
  const data = Object.fromEntries(form.entries());
  try {
    await prisma.partRequest.create({
      data: {
        name: String(data.name),
        email: String(data.email),
        phone: String(data.phone),
        model: String(data.model || ''),
        year: String(data.year || ''),
        vin: String(data.vin || ''),
        engineCode: String(data.engineCode || ''),
        description: String(data.description || '')
      }
    });

    const salesEmail = process.env.SALES_EMAIL;
    if (salesEmail) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      await transporter.sendMail({
        from: 'Goldburg Auto <no-reply@goldburgauto.co.za>',
        to: salesEmail,
        subject: 'New Mercedes part request',
        text: JSON.stringify(data, null, 2)
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Could not save request' }, { status: 500 });
  }
}
