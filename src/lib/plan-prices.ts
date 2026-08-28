/** Keep in sync with Backend `src/domain/plans.ts`. */

export const ARS_PER_USD = 1600;
export const MONTHLY_PLAN_ARS = 30_000;
export const INVOICE_MARKUP = 1.5;
export const FIXED_INCLUDED_UNITS = 2000;
export const REFERRAL_SHARE = 0.5;

export const MONTHLY_PLAN_USD = MONTHLY_PLAN_ARS / ARS_PER_USD;
export const INVOICE_ARS = MONTHLY_PLAN_ARS * INVOICE_MARKUP;
export const USAGE_UNIT_ARS = (MONTHLY_PLAN_ARS / FIXED_INCLUDED_UNITS) * INVOICE_MARKUP;
export const USAGE_UNIT_USD = USAGE_UNIT_ARS / ARS_PER_USD;
export const INVOICE_USD = INVOICE_ARS / ARS_PER_USD;

export function formatArsAmount(n: number, locale: "es" | "en" | "pt"): string {
  const grouped = locale === "en" ? "en-US" : "es-AR";
  const formatted = new Intl.NumberFormat(grouped, {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);
  return locale === "en" ? `AR$ ${formatted}` : `AR$ ${formatted}`;
}

export function formatUsdAmount(n: number, locale: "es" | "en" | "pt"): string {
  const grouped = locale === "en" ? "en-US" : "es-AR";
  const digits = n > 0 && n < 1 ? 3 : 2;
  const formatted = new Intl.NumberFormat(grouped, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
  return `US$ ${formatted}`;
}
