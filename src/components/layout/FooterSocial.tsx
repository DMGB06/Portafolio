"use client";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";
import { personalInfo } from "@/data/portfolio";

const { github, linkedin, instagram } = personalInfo[0];
const socialLinks = [
  { name: "GitHub", href: github, Icon: FaGithub },
  { name: "LinkedIn", href: linkedin, Icon: FaLinkedin },
  { name: "Instagram", href: instagram, Icon: FaInstagram },
];

export function FooterSocial() {
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  return (
    <nav aria-labelledby="footer-social-title">
      <h2 className="site-footer__label" id="footer-social-title">{dict.footer.socialLabel}</h2>
      <ul className="site-footer__list">
        {socialLinks.map(({ name, href, Icon }) => (
          <li key={name}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon aria-hidden />
              {name}
              <FiArrowUpRight className="site-footer__arrow" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
