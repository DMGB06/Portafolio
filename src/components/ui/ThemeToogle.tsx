"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client mount guard for next-themes
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 p-2" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-chrome transition-colors duration-[var(--theme-duration)] p-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--secondary))]"
      aria-label={
        isDark ? dict.a11y.toggleThemeLight : dict.a11y.toggleThemeDark
      }
    >
      {isDark ? (
        <FaMoon size={20} />
      ) : (
        <FaSun size={20} />
      )}
    </button>
  );
}
