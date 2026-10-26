import { client, initDb } from "@/lib/db";

export async function GET(): Promise<Response> {
  await initDb();
  const r = await client.execute(
    "SELECT * FROM entries ORDER BY entry_date,id",
  );
  const lines: (string | number)[][] = [
    ["Date", "Quantity (L)", "Price/Litre (BDT)", "Cost (BDT)", "Note"],
    ...r.rows.map((x) => [
      String(x.entry_date),
      Number(x.quantity),
      Number(x.price_per_litre),
      (Number(x.quantity) * Number(x.price_per_litre)).toFixed(2),
      String(x.note ?? ""),
    ]),
  ];
  const csv = lines
    .map((row) =>
      row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="milk-records.csv"',
    },
  });
}
