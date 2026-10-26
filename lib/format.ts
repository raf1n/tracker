export const money = (n: number): string =>
  `৳${Number(n).toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const qty = (n: number): string => Number(n).toFixed(2);

export const shiftMonth = (month: string, delta: number): string => {
  const d = new Date(month + "-01T00:00:00");
  d.setMonth(d.getMonth() + delta);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export const monthLabel = (month: string): string =>
  new Date((month || "2026-10") + "-02").toLocaleDateString("en", {
    month: "long",
    year: "numeric",
  });

export const dayLabel = (r: { date: string }) => {
  const d = new Date(r.date + "T00:00:00");
  return {
    day: d.toLocaleDateString("en", { day: "numeric" }),
    month: d.toLocaleDateString("en", { month: "short" }),
    weekday: d.toLocaleDateString("en", { weekday: "short" }),
  };
};
