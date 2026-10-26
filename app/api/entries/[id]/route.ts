import { client, initDb } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  await initDb();
  const { id } = await params;
  const { date, quantity, note = "" } = await req.json();
  await client.execute({
    sql: "UPDATE entries SET entry_date=?,quantity=?,note=? WHERE id=?",
    args: [date, Number(quantity), note, Number(id)],
  });
  return Response.json({ ok: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  await initDb();
  const { id } = await params;
  await client.execute({
    sql: "DELETE FROM entries WHERE id=?",
    args: [Number(id)],
  });
  return Response.json({ ok: true });
}
