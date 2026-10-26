import { client, initDb } from "@/lib/db";

export async function GET(): Promise<Response> {
  await initDb();
  const r = await client.execute(
    "SELECT value FROM settings WHERE key='current_price'",
  );
  return Response.json({ currentPrice: Number(r.rows[0].value) });
}

export async function POST(req: Request): Promise<Response> {
  await initDb();
  const { currentPrice } = await req.json();
  if (!Number.isFinite(Number(currentPrice)) || Number(currentPrice) < 0)
    return Response.json({ error: "Invalid price" }, { status: 400 });
  await client.batch(
    [
      {
        sql: "UPDATE settings SET value=? WHERE key='current_price'",
        args: [String(currentPrice)],
      },
      { sql: "UPDATE entries SET price_per_litre=?", args: [currentPrice] },
    ],
    "write",
  );
  return Response.json({ currentPrice: Number(currentPrice) });
}
