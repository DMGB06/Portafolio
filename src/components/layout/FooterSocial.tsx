"use client";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";
import { personalInfo } from "@/data/portfolio";

export function FooterSocial() {
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const { github, linkedin, instagram } = personalInfo[0];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-foreground">
        <span className="text-secondary" aria-hidden>
          #
        </span>
        {dict.footer.socialLabel}
      </h3>
      <div className="flex flex-row gap-4">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-chrome transition-colors"
        >
          <FaGithub size={20} />
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-chrome transition-colors"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-chrome transition-colors"
        >
          <FaInstagram size={20} />
        </a>
      </div>
    </div>
  );
}
