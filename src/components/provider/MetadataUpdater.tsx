"use client";

import { useEffect } from "react";
import { useTranslations } from "@/i18n";

export function MetadataUpdater() {
  const { t, locale, isReady } = useTranslations();

  useEffect(() => {
    if (!isReady) return;
    document.title = t.metadata.title;
  }, [t.metadata.title, locale, isReady]);

  return null;
}
