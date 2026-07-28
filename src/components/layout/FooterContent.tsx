"use client";

import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

export function FooterContent() {
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  return <p>{dict.footer.role}</p>;
}
