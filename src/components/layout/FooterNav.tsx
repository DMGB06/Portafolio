"use client";

import Link from "next/link";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

const NAV_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/about-me", key: "aboutMe" as const },
  { href: "/contact-me", key: "contacts" as const },
];

export function FooterNav() {
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-foreground">
        <span className="text-secondary" aria-hidden>
          #
        </span>
        {dict.footer.navLabel}
      </h3>
      <nav className="flex flex-col gap-2">
        {NAV_LINKS.map(({ href, key }) => (
          <Link key={href} href={href} className="text-chrome transition-colors">
            {dict.nav[key]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
