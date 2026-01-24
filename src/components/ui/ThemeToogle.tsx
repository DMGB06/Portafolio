"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Detectar cuando el componente se monta en el cliente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  // En el servidor Y primera renderización del cliente: mostrar placeholder
  if (!mounted) {
    return (
      <div className="w-9 h-9 p-2">
        {/* Espacio vacío del mismo tamaño que el botón */}
      </div>
    );
  }

  // Solo en el cliente (después del mount): mostrar el botón real
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-zinc-400 hover:text-white transition-all duration-500 p-2"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FaSun size={20} className="transition-transform duration-500" />
      ) : (
        <FaMoon size={20} className="transition-transform duration-500" />
      )}
    </button>
  );
}
