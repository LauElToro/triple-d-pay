export type Locale = "es" | "en" | "pt";

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

export type TranslationDict = Record<string, string>;
