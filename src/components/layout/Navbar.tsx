"use client";

import { FaCodepen, FaTimes, FaBars } from "react-icons/fa";
import { ThemeToggle } from "../ui/ThemeToogle";
import { LanguageToggle } from "../ui/LanguageToggle";
import { useState } from "react";
import Link from "next/link";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

const NAV_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/about-me", key: "aboutMe" as const },
  { href: "/contact-me", key: "contacts" as const },
];

const linkClassName = "text-chrome transition-colors";

const focusRingClassName =
  "rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--secondary))]";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  return (
    <nav className="sticky top-0 z-50 w-dvw border-b border-theme bg-surface-translucent backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 pt-5 pb-5 min-80vw">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-foreground font-bold flex items-center gap-2"
          >
            <FaCodepen className="text-secondary" aria-hidden />
            Denilson
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, key }) => (
              <Link key={href} href={href} className={linkClassName}>
                <span className="text-secondary">#</span>
                {dict.nav[key]}
              </Link>
            ))}
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={dict.a11y.toggleMenu}
              aria-expanded={isOpen}
              className={`text-chrome ${focusRingClassName}`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {NAV_LINKS.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className={linkClassName}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-secondary">#</span>
                {dict.nav[key]}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
