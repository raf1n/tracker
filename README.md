# Milk Tracker

This browser app uses Next.js for the UI and API routes, with Turso (libSQL/SQLite) as the database. It is ready for Vercel. Each entry stores its own `price_per_litre`, so changing the current price affects future entries without rewriting historical costs.

## Deploy to Vercel

1. Create a Turso database and copy its database URL and auth token.
2. Import this project into Vercel.
3. Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` as Vercel Environment Variables.
4. Deploy. Vercel runs `npm install` and `npm run build` automatically.

The first request creates the schema and imports the dated June–October 2026 seed rows. The initial price is ৳100/L as a placeholder because no price was supplied; change it in Settings before adding new records.

## Local development

```bash
cp .env.example .env.local
# set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env.local
npm install
npm run dev
```

## What is stored

The app supports quick-add 0.5/1/1.25 L, add/edit/delete history, month filtering, daily totals, monthly quantity and cost totals, and CSV export.
