export function formatARS(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("es-AR");
}

/** Formats API daily chart labels (ISO date or legacy weekday). */
export function formatChartDay(day: string, locale = "es-AR"): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    const d = new Date(`${day}T12:00:00`);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString(locale, { day: "2-digit", month: "short" });
    }
  }
  return day;
}
