import { createClient, type Row } from "@libsql/client";
import type { Entry } from "@/lib/types";

export const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:./data/milk-tracker.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const seed: Record<string, [number, number][]> = {
  "2026-06": [
    [19, 1],
    [22, 0.5],
    [25, 0.5],
    [27, 1],
    [29, 1],
  ],
  "2026-07": [
    [1, 0.5],
    [3, 0.5],
    [5, 0.5],
    [9, 1.25],
    [11, 0.5],
    [13, 0.5],
    [15, 0.5],
    [17, 1],
    [19, 1],
    [21, 0.5],
    [23, 1],
    [25, 0.5],
    [27, 0.5],
    [29, 0.5],
    [31, 0.5],
  ],
  "2026-08": [
    [2, 0.5],
    [4, 1],
    [6, 1],
    [8, 1],
    [16, 0.5],
    [18, 1],
    [20, 0.5],
    [22, 1],
    [24, 0.5],
    [31, 1],
  ],
  "2026-09": [
    [2, 1],
    [4, 0.5],
    [8, 1],
    [10, 0.5],
    [12, 0.5],
    [16, 0.5],
    [18, 0.5],
    [22, 0.5],
    [24, 0.5],
    [26, 0.5],
    [28, 0.5],
    [30, 0.5],
  ],
  "2026-10": [
    [2, 0.5],
    [4, 0.5],
    [6, 0.5],
    [8, 0.5],
    [10, 0.5],
    [12, 1],
    [14, 0.5],
    [16, 0.5],
    [18, 0.5],
    [20, 1],
    [22, 0.5],
    [26, 0.5],
  ],
};

let ready: Promise<void> | undefined;
export function initDb(): Promise<void> {
  ready ??= bootstrap();
  return ready;
}

async function bootstrap() {
  await client.batch(
    [
      `CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`,
      `CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, entry_date TEXT NOT NULL, quantity REAL NOT NULL CHECK(quantity > 0), price_per_litre REAL NOT NULL CHECK(price_per_litre >= 0), note TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
      `INSERT OR IGNORE INTO settings(key,value) VALUES('current_price','90')`,
      `INSERT OR IGNORE INTO settings(key,value) VALUES('seeded','0')`,
    ],
    "write",
  );
  const state = await client.execute(
    "SELECT key, value FROM settings WHERE key IN ('seeded', 'current_price')",
  );
  const seeded = state.rows.find((r) => r.key === "seeded");
  if (Number(seeded?.value) !== 1) {
    const count = await client.execute("SELECT COUNT(*) AS count FROM entries");
    if (Number(count.rows[0].count) === 0) {
      const statements = [];
      for (const [month, rows] of Object.entries(seed))
        for (const [day, quantity] of rows) {
          statements.push({
            sql: "INSERT INTO entries(entry_date,quantity,price_per_litre,note) VALUES(?,?,90,?)",
            args: [
              `${month}-${String(day).padStart(2, "0")}`,
              quantity,
              "Imported seed entry",
            ],
          });
        }
      if (statements.length) await client.batch(statements, "write");
    }
    await client.execute(`UPDATE settings SET value='1' WHERE key='seeded'`);
  }
}

export function entry(row: Row): Entry {
  const quantity = Number(row.quantity),
    price = Number(row.price_per_litre);
  return {
    id: Number(row.id),
    date: String(row.entry_date),
    quantity,
    price,
    cost: Math.round(quantity * price * 100) / 100,
    note: String(row.note ?? ""),
  };
}
