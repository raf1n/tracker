import type { Delivery } from "@/lib/types";
import Spinner from "./Spinner";

interface EditRowProps {
  draft: Delivery;
  onDraftChange: (value: Delivery) => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  saving: boolean;
}

export default function EditRow({
  draft,
  onDraftChange,
  onSave,
  onCancel,
  saving,
}: EditRowProps) {
  return (
    <form className="editform" onSubmit={onSave}>
      <label className="f">
        <span>Date</span>
        <input
          type="date"
          required
          value={draft.date}
          onChange={(e) => onDraftChange({ ...draft, date: e.target.value })}
        />
      </label>
      <label className="f">
        <span>Litres</span>
        <input
          type="number"
          min="0.01"
          step="0.01"
          required
          inputMode="decimal"
          value={draft.quantity}
          onChange={(e) =>
            onDraftChange({ ...draft, quantity: e.target.value })
          }
        />
      </label>
      <label className="f note">
        <span>Note</span>
        <input
          placeholder="Optional"
          value={draft.note}
          onChange={(e) => onDraftChange({ ...draft, note: e.target.value })}
        />
      </label>
      <div className="editacts">
        <button className="primary" type="submit" disabled={saving}>
          {saving && <Spinner size={13} />}
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}
