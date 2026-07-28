import { DEFAULT_LOCALE, type Locale } from "./config";
import en from "./locales/en.json";
import es from "./locales/es.json";
import type { Dictionary } from "./types";

const dictionaries = {
  es,
  en,
} satisfies Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
