# Goldburg Auto – Mercedes-Benz Parts Ecommerce

Next.js 14 + Tailwind CSS storefront for South Africa focused on Mercedes-Benz new and used spares. Includes Zoho Inventory sync, SnapScan/Masterpass/EFT checkout flows, Prisma + PostgreSQL, and basic admin tools.

## Getting started

1. Install dependencies

```bash
npm install
```

2. Configure environment variables by copying `.env.example` to `.env.local` (or `.env`).

3. Set up the database

```bash
npx prisma migrate dev --name init
npm run seed
```

4. Run locally

```bash
npm run dev
```

Visit http://localhost:3000.

## Environment variables

See `.env.example` for all variables including:
- `DATABASE_URL` for PostgreSQL
- `NEXTAUTH_SECRET`
- `ADMIN_PASSWORD` to protect admin routes
- `SALES_EMAIL` + SMTP credentials for mail
- SnapScan/Masterpass credentials
- Zoho Inventory API credentials

## Zoho Inventory sync

- Library: `lib/zohoInventory.ts`
- API endpoint: `POST /api/admin/sync-inventory` with header `Authorization: Bearer $ADMIN_PASSWORD`.
- Maps Zoho item fields to Prisma `Product` records with upsert.

## Payments

- SnapScan: `/api/payments/snapscan/create` and webhook `/api/payments/snapscan/webhook`
- Masterpass: `/api/payments/masterpass/create` and callback `/api/payments/masterpass/callback`
- Manual EFT: handled client-side and saved as pending orders.

## Auth

- NextAuth Credentials provider (email/password) with Prisma `User` table. Seed user: `admin@goldburgauto.co.za` / `password123`.

## Seed data

Sample Mercedes products, breaking vehicles, and blog posts live in `prisma/seed.ts` and `lib/data.ts` for UI fallback.

## Deployment

- Suitable for Vercel or any Node host.
- Dockerfile included for container deployments.
- `docker-compose.yml` sets up app + PostgreSQL for local dev.

## Tests

Run unit tests for Zoho mapping and order status transitions:

```bash
npm test
```

## Production URLs

Update environment variables for `NEXTAUTH_URL`, payment callbacks, and Zoho credentials when deploying to `https://www.goldburgauto.co.za`.
