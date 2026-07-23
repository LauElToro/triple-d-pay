import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_LOCALE,
  isLocale,
  translate,
  translations,
  type Locale,
  type TranslateParams,
} from "@/lib/i18n";
import type { Plan, PlanId } from "@/lib/mock-data";

const STORAGE_KEY = "td_locale";

const PLAN_PRICES: Record<PlanId, string> = {
  free: "AR$ 0",
  fixed: "AR$ 29.900",
  usage: "AR$ 22 / comprobante",
};

const PLAN_PRICE_EN: Record<PlanId, string> = {
  free: "AR$ 0",
  fixed: "AR$ 29,900",
  usage: "AR$ 22 / voucher",
};

const PLAN_PRICE_PT: Record<PlanId, string> = {
  free: "AR$ 0",
  fixed: "AR$ 29.900",
  usage: "AR$ 22 / comprovante",
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: TranslateParams) => string;
  plans: Plan[];
  usageDays: { key: string; label: string; count: number }[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isLocale(stored)) return stored;
  } catch {
    // ignore
  }
  return DEFAULT_LOCALE;
}

function buildPlans(locale: Locale, t: (key: string) => string): Plan[] {
  const prices =
    locale === "en" ? PLAN_PRICE_EN : locale === "pt" ? PLAN_PRICE_PT : PLAN_PRICES;
  const ids: PlanId[] = ["free", "fixed", "usage"];

  return ids.map((id) => ({
    id,
    name: t(`plans.${id}.name`),
    price: prices[id],
    tagline: t(`plans.${id}.tagline`),
    features: [0, 1, 2, 3].map((i) => t(`plans.${id}.feature${i}`)),
    cta: t(`plans.${id}.cta`),
  }));
}

const USAGE_COUNTS = [42, 78, 65, 91, 120, 34, 12];
const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readStoredLocale();
    setLocaleState(stored);
    document.documentElement.lang = stored;
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  const dict = translations[locale];

  const t = useMemo(
    () => (key: string, params?: TranslateParams) => translate(dict, key, params),
    [dict],
  );

  const plans = useMemo(() => buildPlans(locale, t), [locale, t]);

  const usageDays = useMemo(
    () =>
      DAY_KEYS.map((key, i) => ({
        key,
        label: t(`days.${key}`),
        count: USAGE_COUNTS[i],
      })),
    [t],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, plans, usageDays }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useTranslation() {
  const { t, locale, plans, usageDays } = useI18n();
  return { t, locale, plans, usageDays };
}
