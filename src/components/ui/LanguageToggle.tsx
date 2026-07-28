"use client";

import { useTranslations } from "@/i18n";
import type { Locale } from "@/i18n";

const LOCALE_OPTIONS: Locale[] = ["es", "en"];

const toggleButtonClass =
  "px-1 rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--secondary))]";

export function LanguageToggle() {
  const { t, locale, setLocale, isReady } = useTranslations();

  if (!isReady) {
    return <div className="w-[4.75rem] h-9" aria-hidden />;
  }

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium"
      role="group"
      aria-label={t.a11y.languageGroup}
    >
      {LOCALE_OPTIONS.map((option, index) => (
        <span key={option} className="flex items-center gap-1">
          {index > 0 && (
            <span className="text-muted select-none" aria-hidden>
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => setLocale(option)}
            className={`${toggleButtonClass} ${
              locale === option ? "text-secondary" : "text-chrome"
            }`}
            aria-pressed={locale === option}
            lang={option}
          >
            {option.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
