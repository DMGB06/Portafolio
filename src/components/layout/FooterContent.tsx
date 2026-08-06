"use client";

import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

interface FooterContentProps {
  part?: "role" | "rights";
}

export function FooterContent({ part = "role" }: FooterContentProps) {
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  return <span>{dict.footer[part]}</span>;
}
