"use client";

import Link from "next/link";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

const NAV_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/about-me", key: "aboutMe" as const },
  { href: "/contact-me", key: "contact" as const },
];

export function FooterNav() {
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  return (
    <nav aria-labelledby="footer-nav-title">
      <h2 className="site-footer__label" id="footer-nav-title">{dict.footer.navLabel}</h2>
      <ul className="site-footer__list">
        {NAV_LINKS.map(({ href, key }) => (
          <li key={href}>
            <Link href={href}>
              <span className="site-footer__nav-text">
                {key === "home" ? dict.nav.home : dict.sections[key]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
