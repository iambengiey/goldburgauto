import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const amount = Number(form.get('amount') || 0) * 100;
  const email = String(form.get('email') || '');
  const reference = `GBA-${Date.now()}`;
  try {
    const resp = await fetch(`${process.env.MASTERPASS_API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.MASTERPASS_CONSUMER_KEY}` },
      body: JSON.stringify({ amount, reference, email, callbackUrl: process.env.MASTERPASS_CALLBACK_URL })
    });
    const json = await resp.json();
    return NextResponse.json({ redirectUrl: json.redirect_url || json.checkout_url, reference });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Masterpass failed' }, { status: 500 });
  }
}
