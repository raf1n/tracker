import { money, qty, monthLabel as label, dayLabel } from "@/lib/format";
import type { Delivery, Entry } from "@/lib/types";
import EditRow from "./EditRow";
import Spinner from "./Spinner";

interface RegisterProps {
  rows: Entry[];
  month: string;
  loading: boolean;
  editingId: number | null;
  draft: Delivery;
  saving: boolean;
  deletingId: number | null;
  onDraftChange: (value: Delivery) => void;
  onEdit: (r: Entry) => void;
  onEditSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onEditCancel: () => void;
  onRemove: (id: number) => void;
}

export default function Register({
  rows,
  month,
  loading,
  editingId,
  draft,
  saving,
  deletingId,
  onDraftChange,
  onEdit,
  onEditSave,
  onEditCancel,
  onRemove,
}: RegisterProps) {
  const header = label(month);
  return (
    <section className="register">
      <div className="listhead">
        <h2>{header}</h2>
        <span>
          {loading
            ? ""
            : `${rows.length} ${rows.length === 1 ? "delivery" : "deliveries"}`}
        </span>
      </div>
      {loading ? (
        <p className="empty loading">
          <Spinner size={20} />
        </p>
      ) : rows.length ? (
        <div className="tablewrap">
          <div className="cols rowhead" aria-hidden="true">
            <span>Date</span>
            <span className="r">Litres</span>
            <span className="r">Cost</span>
            <span>Note</span>
            <span />
          </div>
          <ul className="rows">
            {rows.map((r) => {
              const d = dayLabel(r);
              if (editingId === r.id)
                return (
                  <li key={r.id} className="editing">
                    <EditRow
                      draft={draft}
                      onDraftChange={onDraftChange}
                      onSave={onEditSave}
                      onCancel={onEditCancel}
                      saving={saving}
                    />
                  </li>
                );
              return (
                <li key={r.id} className="cols">
                  <span className="d">
                    <b>{d.day}</b>
                    <i>
                      {d.month} · {d.weekday}
                    </i>
                  </span>
                  <span className="q r">{qty(r.quantity)} L</span>
                  <span className="c r">{money(r.cost)}</span>
                  <span className="n">{r.note || ""}</span>
                  <span className="acts">
                    <button onClick={() => onEdit(r)}>Edit</button>
                    <button
                      className="danger"
                      onClick={() => onRemove(r.id)}
                      disabled={deletingId === r.id}
                    >
                      {deletingId === r.id && <Spinner size={12} />}
                      {deletingId === r.id ? "Deleting…" : "Delete"}
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="empty">
          Nothing logged for {header} yet. Add the first delivery above.
        </p>
      )}
    </section>
  );
}
