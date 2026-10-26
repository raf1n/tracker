"use client";
import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import Summary from "./components/Summary";
import Composer from "./components/Composer";
import Register from "./components/Register";
import type { Delivery, Entry, Summary as SummaryData } from "@/lib/types";

export default function Home() {
  const [month, setMonth] = useState("2026-10"),
    [rows, setRows] = useState<Entry[]>([]),
    [summary, setSummary] = useState<SummaryData>({
      quantity: 0,
      cost: 0,
      count: 0,
      daily: [],
    }),
    [price, setPrice] = useState("100"),
    [form, setForm] = useState<Delivery>({
      date: "2026-10-26",
      quantity: "",
      note: "",
    }),
    [editing, setEditing] = useState<number | null>(null),
    [draft, setDraft] = useState<Delivery>({
      date: "",
      quantity: "",
      note: "",
    });

  const load = async () => {
    const [a, b, c] = await Promise.all([
      fetch(`/api/entries?month=${month}`).then((r) => r.json()),
      fetch(`/api/summary?month=${month}`).then((r) => r.json()),
      fetch("/api/settings").then((r) => r.json()),
    ]);
    setRows(a);
    setSummary(b);
    setPrice(String(c.currentPrice));
  };

  useEffect(() => {
    load();
  }, [month]);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/entries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ ...form, quantity: "", note: "" });
    load();
  }

  async function savePrice(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ currentPrice: Number(price) }),
    });
    load();
  }

  function edit(r: Entry) {
    setEditing(r.id);
    setDraft({
      date: r.date,
      quantity: String(r.quantity),
      note: r.note || "",
    });
  }

  async function saveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editing == null) return;
    await fetch(`/api/entries/${editing}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(draft),
    });
    setEditing(null);
    load();
  }

  async function remove(id: number) {
    if (confirm("Delete this record?")) {
      await fetch(`/api/entries/${id}`, { method: "DELETE" });
      load();
    }
  }

  return (
    <main className="app">
      <TopBar month={month} onMonthChange={setMonth} />
      <Summary summary={summary} />
      <Composer
        form={form}
        onFormChange={setForm}
        onAdd={add}
        price={price}
        onPriceChange={setPrice}
        onPriceSave={savePrice}
      />
      <Register
        rows={rows}
        month={month}
        editingId={editing}
        draft={draft}
        onDraftChange={setDraft}
        onEdit={edit}
        onEditSave={saveEdit}
        onEditCancel={() => setEditing(null)}
        onRemove={remove}
      />
    </main>
  );
}
