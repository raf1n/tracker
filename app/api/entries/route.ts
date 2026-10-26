import { client, initDb, entry } from "@/lib/db";
import type { Entry } from "@/lib/types";

export async function GET(req: Request): Promise<Response> {
  await initDb();
  const month = new URL(req.url).searchParams.get("month") || "";
  const r = await client.execute({
    sql: "SELECT * FROM entries WHERE entry_date LIKE ? ORDER BY entry_date DESC,id DESC",
    args: [`${month}-%`],
  });
  return Response.json(r.rows.map(entry) satisfies Entry[]);
}

export async function POST(req: Request): Promise<Response> {
  await initDb();
  const { date, quantity, note = "" } = await req.json();
  const price = await client.execute(
    "SELECT value FROM settings WHERE key='current_price'",
  );
  if (!date || !Number.isFinite(Number(quantity)) || Number(quantity) <= 0)
    return Response.json({ error: "Invalid entry" }, { status: 400 });
  const r = await client.execute({
    sql: "INSERT INTO entries(entry_date,quantity,price_per_litre,note) VALUES(?,?,?,?)",
    args: [date, Number(quantity), Number(price.rows[0].value), note],
  });
  return Response.json({ id: Number(r.lastInsertRowid) }, { status: 201 });
}
