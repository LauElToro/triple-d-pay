import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_LOCALE,
  isLocale,
  translate,
  translations,
  type Locale,
  type TranslateParams,
} from "@/lib/i18n";
import type { Plan } from "@/lib/plans";
import type { PlanId } from "@/lib/api-types";
import {
  MONTHLY_PLAN_ARS,
  MONTHLY_PLAN_USD,
  USAGE_UNIT_ARS,
  USAGE_UNIT_USD,
  formatArsAmount,
  formatUsdAmount,
} from "@/lib/plan-prices";

const STORAGE_KEY = "sa_locale";

function planPriceCopy(locale: Locale): Record<PlanId, { price: string; priceSecondary: string }> {
  const arsMonthly = formatArsAmount(MONTHLY_PLAN_ARS, locale);
  const usdMonthly = formatUsdAmount(MONTHLY_PLAN_USD, locale);
  const arsUnit = formatArsAmount(USAGE_UNIT_ARS, locale);
  const usdUnit = formatUsdAmount(USAGE_UNIT_USD, locale);
  const unitLabel = locale === "en" ? "voucher" : locale === "pt" ? "comprovante" : "comprobante";
  const monthLabel = locale === "en" ? "mo" : locale === "pt" ? "mês" : "mes";

  return {
    free: {
      price: formatArsAmount(0, locale),
      priceSecondary: `${formatUsdAmount(0, locale)} / ${monthLabel}`,
    },
    fixed: {
      price: `${arsMonthly} / ${monthLabel}`,
      priceSecondary: `${usdMonthly} / ${monthLabel}`,
    },
    usage: {
      price: `${arsUnit} / ${unitLabel}`,
      priceSecondary: `${usdUnit} / ${unitLabel}`,
    },
  };
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: TranslateParams) => string;
  plans: Plan[];
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
  const prices = planPriceCopy(locale);
  const ids: PlanId[] = ["free", "fixed", "usage"];

  return ids.map((id) => ({
    id,
    name: t(`plans.${id}.name`),
    price: prices[id].price,
    priceSecondary: prices[id].priceSecondary,
    tagline: t(`plans.${id}.tagline`),
    features: [0, 1, 2, 3].map((i) => t(`plans.${id}.feature${i}`)),
    cta: t(`plans.${id}.cta`),
  }));
}

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

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, plans }}>
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
  const { t, locale, plans } = useI18n();
  return { t, locale, plans };
}
