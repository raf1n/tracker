import { shiftMonth, monthLabel as label } from "@/lib/format";

interface TopBarProps {
  month: string;
  onMonthChange: (month: string) => void;
}

export default function TopBar({ month, onMonthChange }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="wordmark">
        Milk tracker<span className="dot">·</span>
        <small>home delivery</small>
      </div>
      <div className="monthctl">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => onMonthChange(shiftMonth(month, -1))}
        >
          ‹
        </button>
        <span aria-live="polite">{label(month)}</span>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => onMonthChange(shiftMonth(month, 1))}
        >
          ›
        </button>
      </div>
      <a className="export" href="/api/export.csv">
        Export
      </a>
    </header>
  );
}
