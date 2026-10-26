import type { Delivery } from "@/lib/types";

interface ComposerProps {
  form: Delivery;
  onFormChange: (value: Delivery) => void;
  onAdd: (e: React.FormEvent<HTMLFormElement>) => void;
  price: string | number;
  onPriceChange: (value: string) => void;
  onPriceSave: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Composer({
  form,
  onFormChange,
  onAdd,
  price,
  onPriceChange,
  onPriceSave,
}: ComposerProps) {
  const step = (delta: number) => {
    const next = Math.max(0.25, Number(form.quantity || 0) + delta);
    onFormChange({ ...form, quantity: String(next) });
  };

  return (
    <section className="composer">
      <h2>New delivery</h2>
      <form onSubmit={onAdd}>
        <label className="f">
          <span>Date</span>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => onFormChange({ ...form, date: e.target.value })}
          />
        </label>
        <label className="f qtyf">
          <span>Litres</span>
          <div className="stepper">
            <button
              type="button"
              aria-label="Less milk"
              onClick={() => step(-0.25)}
            >
              −
            </button>
            <input
              type="number"
              min="0.01"
              step="0.01"
              required
              inputMode="decimal"
              placeholder="0.00"
              value={form.quantity}
              onChange={(e) =>
                onFormChange({ ...form, quantity: e.target.value })
              }
            />
            <button
              type="button"
              aria-label="More milk"
              onClick={() => step(0.25)}
            >
              +
            </button>
          </div>
        </label>
        <div className="presets" role="group" aria-label="Common quantities">
          {["0.5", "1", "1.25"].map((x) => (
            <button
              type="button"
              key={x}
              className={form.quantity === x ? "on" : ""}
              onClick={() => onFormChange({ ...form, quantity: x })}
            >
              {x} L
            </button>
          ))}
        </div>
        <label className="f note">
          <span>Note</span>
          <input
            placeholder="Optional"
            value={form.note}
            onChange={(e) => onFormChange({ ...form, note: e.target.value })}
          />
        </label>
        <button className="primary" type="submit">
          Add
        </button>
      </form>
      <form className="ratebar" onSubmit={onPriceSave}>
        <label htmlFor="rate">Rate</label>
        <input
          id="rate"
          type="number"
          min="0"
          step="0.01"
          required
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
        />
        <span className="per">৳/L</span>
        <button type="submit">Save</button>
        <span className="hint">Applies to every entry.</span>
      </form>
    </section>
  );
}
