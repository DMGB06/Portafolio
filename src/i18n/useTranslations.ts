"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/provider/LocaleProvider";
import { getDictionary } from "./getDictionary";
import type { Locale } from "./config";
import type { Dictionary } from "./types";

type UseTranslationsReturn = {
  t: Dictionary;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isReady: boolean;
};

export function useTranslations(): UseTranslationsReturn {
  const { locale, setLocale, isReady } = useLocale();
  const t = useMemo(() => getDictionary(locale), [locale]);

  return { t, locale, setLocale, isReady };
}
