import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');
  const status = searchParams.get('status');
  if (!reference) return NextResponse.redirect('/checkout?error=missing-ref');
  if (status === 'success') {
    await prisma.order.updateMany({ where: { reference }, data: { status: 'PAID' } });
    return NextResponse.redirect(`/checkout?success=true&reference=${reference}`);
  }
  return NextResponse.redirect(`/checkout?status=${status}`);
}
