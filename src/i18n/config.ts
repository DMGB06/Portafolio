export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_STORAGE_KEY = "portfolio-locale";

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
