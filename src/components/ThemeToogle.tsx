"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
  const [mounted, setMountend] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMountend(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-zinc-400 hover:text-white transition-all duration-500 p-2"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FaSun
          size={20}
          className="transition-transform duration-500"
        />
      ) : (
        <FaMoon
          size={20}
          className="transition-transform duration-1000"
        />
      )}
    </button>
  );
}
