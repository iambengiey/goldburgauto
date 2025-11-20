import { prisma } from './prisma';

type ZohoItem = {
  item_id: string;
  name: string;
  description: string;
  rate: number;
  sku?: string;
  image_url?: string;
  custom_fields?: { label: string; value: string }[];
  stock_on_hand: number;
};

async function refreshAccessToken() {
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN || '',
    client_id: process.env.ZOHO_CLIENT_ID || '',
    client_secret: process.env.ZOHO_CLIENT_SECRET || '',
    grant_type: 'refresh_token'
  });
  const resp = await fetch(`https://accounts.zoho.com/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  if (!resp.ok) throw new Error('Zoho auth failed');
  const json = await resp.json();
  return json.access_token as string;
}

function mapZohoItem(item: ZohoItem) {
  const isUsedField = item.custom_fields?.find((f) => f.label.toLowerCase().includes('used'))?.value;
  const modelClass = item.custom_fields?.find((f) => f.label.toLowerCase().includes('class'))?.value;
  const engineCode = item.custom_fields?.find((f) => f.label.toLowerCase().includes('engine'))?.value;
  return {
    externalId: item.item_id,
    name: item.name,
    description: item.description || '',
    price: item.rate,
    sku: item.sku,
    stockOnHand: item.stock_on_hand,
    category: item.custom_fields?.find((f) => f.label.toLowerCase().includes('category'))?.value || 'General',
    isUsed: isUsedField ? isUsedField.toLowerCase() === 'true' || isUsedField === '1' : false,
    modelClass,
    engineCode,
    images: item.image_url ? [item.image_url] : []
  };
}

export async function syncZohoInventory() {
  const organizationId = process.env.ZOHO_ORGANIZATION_ID;
  if (!organizationId) throw new Error('Missing ZOHO_ORGANIZATION_ID');
  const accessToken = await refreshAccessToken();
  let page = 1;
  let created = 0;
  let updated = 0;
  let skipped = 0;
  while (true) {
    const resp = await fetch(
      `https://www.zohoapis.com/inventory/v1/items?page=${page}&organization_id=${organizationId}&status=active`,
      {
        headers: { Authorization: `Zoho-oauthtoken ${accessToken}` }
      }
    );
    if (!resp.ok) throw new Error('Failed to fetch Zoho items');
    const json = await resp.json();
    const items: ZohoItem[] = json.items || [];
    if (!items.length) break;

    for (const item of items) {
      const mapped = mapZohoItem(item);
      const existing = await prisma.product.findUnique({ where: { externalId: mapped.externalId } });
      if (existing) {
        await prisma.product.update({ where: { id: existing.id }, data: mapped });
        updated++;
      } else {
        await prisma.product.create({ data: mapped });
        created++;
      }
    }
    page += 1;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return { created, updated, skipped };
}

export function testMapZohoItem(item: ZohoItem) {
  return mapZohoItem(item);
}
