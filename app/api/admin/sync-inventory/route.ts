import { NextResponse } from 'next/server';
import { syncZohoInventory } from '../../../../../lib/zohoInventory';

export async function POST(request: Request) {
  const auth = request.headers.get('authorization');
  if (!auth || auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const result = await syncZohoInventory();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
