import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const amount = Number(form.get('amount') || 0) * 100;
  const email = String(form.get('email') || '');
  const reference = `GBA-${Date.now()}`;
  try {
    const resp = await fetch(`https://api.getsnapscan.com/merchants/${process.env.SNAPSCAN_MERCHANT_ID}/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SNAPSCAN_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount, email, reference })
    });
    const json = await resp.json();
    return NextResponse.json({ paymentUrl: json.redirect_url || json.qr_link, reference });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'SnapScan failed' }, { status: 500 });
  }
}
