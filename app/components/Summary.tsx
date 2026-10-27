import { money, qty } from "@/lib/format";
import type { Summary } from "@/lib/types";

export default function Summary({
  summary,
  loading = false,
}: {
  summary: Summary;
  loading?: boolean;
}) {
  const v = (value: string | number) => (loading ? "—" : value);
  return (
    <section
      className={`overview ${loading ? "is-loading" : ""}`}
      aria-label="Month summary"
    >
      <dl>
        <div>
          <dt>Litres</dt>
          <dd>{v(qty(summary.quantity || 0))}</dd>
        </div>
        <div>
          <dt>Spent</dt>
          <dd>{v(money(summary.cost || 0))}</dd>
        </div>
        <div>
          <dt>Deliveries</dt>
          <dd>{v(summary.count || 0)}</dd>
        </div>
        <div>
          <dt>Days logged</dt>
          <dd>{v(summary.daily?.length || 0)}</dd>
        </div>
      </dl>
    </section>
  );
}
