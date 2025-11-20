import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function POST(request: Request) {
  const payload = await request.json();
  try {
    if (payload.status === 'completed') {
      await prisma.order.updateMany({
        where: { reference: payload.reference },
        data: { status: 'PAID', paymentReference: payload.transaction_id }
      });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
