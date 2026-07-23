import type { Locale, TranslationDict } from "./types";
import { es } from "./translations/es";
import { en } from "./translations/en";
import { pt } from "./translations/pt";

export type { Locale, TranslationDict } from "./types";
export { DEFAULT_LOCALE, LOCALES } from "./types";

export type TranslateParams = Record<string, string | number>;

export const translations: Record<Locale, TranslationDict> = { es, en, pt };

export function translate(
  dict: TranslationDict,
  key: string,
  params?: TranslateParams,
): string {
  let text = dict[key] ?? translations.es[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return text;
}

export function isLocale(value: string): value is Locale {
  return value === "es" || value === "en" || value === "pt";
}
