import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";
import { getDictionary } from "./getDictionary";

export function resolveLocale(value: unknown): Locale {
  return typeof value === "string" && isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getContactApiMessages(locale: Locale) {
  const { form } = getDictionary(locale);

  return {
    required: form.errors.required,
    send: form.errorGeneric,
    rateLimited: form.errors.rateLimited,
  };
}
