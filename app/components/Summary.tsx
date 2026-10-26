import { money, qty } from "@/lib/format";
import type { Summary } from "@/lib/types";

export default function Summary({ summary }: { summary: Summary }) {
  return (
    <section className="overview" aria-label="Month summary">
      <dl>
        <div>
          <dt>Litres</dt>
          <dd>{qty(summary.quantity || 0)}</dd>
        </div>
        <div>
          <dt>Spent</dt>
          <dd>{money(summary.cost || 0)}</dd>
        </div>
        <div>
          <dt>Deliveries</dt>
          <dd>{summary.count || 0}</dd>
        </div>
        <div>
          <dt>Days logged</dt>
          <dd>{summary.daily?.length || 0}</dd>
        </div>
      </dl>
    </section>
  );
}
