import { client, initDb } from "@/lib/db";
import type { Summary } from "@/lib/types";

export async function GET(req: Request): Promise<Response> {
  await initDb();
  const month = new URL(req.url).searchParams.get("month") || "";
  const r = await client.execute({
    sql: "SELECT entry_date,quantity,price_per_litre FROM entries WHERE entry_date LIKE ? ORDER BY entry_date",
    args: [`${month}-%`],
  });
  const days: Record<string, { date: string; quantity: number; cost: number }> =
    {};
  let total = 0,
    cost = 0;
  for (const x of r.rows) {
    const q = Number(x.quantity),
      c = q * Number(x.price_per_litre);
    total += q;
    cost += c;
    const date = String(x.entry_date);
    days[date] ??= { date, quantity: 0, cost: 0 };
    days[date].quantity += q;
    days[date].cost += c;
  }
  return Response.json({
    month,
    quantity: Math.round(total * 100) / 100,
    cost: Math.round(cost * 100) / 100,
    count: r.rows.length,
    daily: Object.values(days).map((x) => ({
      ...x,
      quantity: Math.round(x.quantity * 100) / 100,
      cost: Math.round(x.cost * 100) / 100,
    })),
  } satisfies Summary);
}
