"use client";

import { useRef } from "react";
import Image from "next/image";
import { Titulo } from "../ui/Titulo";
import { ContactLinks } from "./ContactLinks";
import { GSAP_PREHIDE, REVEAL_ITEM, useScrollReveal } from "@/animations";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

type ContactSectionProps = {
  isSection?: boolean;
};

const ContactSection = ({ isSection = true }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  useScrollReveal(sectionRef, { stagger: 0.15 });

  return (
    <section ref={sectionRef} className="py-10">
      <div {...{ [REVEAL_ITEM]: true }} className={GSAP_PREHIDE}>
        <Titulo
          text={dict.sections.contacts}
          isSection={isSection}
          className="max-w-1/6"
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        <div
          {...{ [REVEAL_ITEM]: true }}
          className={`flex flex-col items-center md:items-start ${GSAP_PREHIDE}`}
        >
          <p className="text-muted mb-4 md:leading-relaxed leading-snug mt-2">
            {dict.contact.intro}
          </p>
          <ContactLinks heading={dict.contact.messageMeHere} />
        </div>

        <figure
          {...{ [REVEAL_ITEM]: true }}
          className={`hidden md:flex flex-col items-center mt-4 ${GSAP_PREHIDE}`}
        >
          <Image
            src="/images/profile/foto_contact.jpeg"
            alt={dict.a11y.profileAlt}
            width={250}
            height={250}
            className="custom-shadow -rotate-z-30 border border-theme bg-surface"
          />
        </figure>
      </div>
    </section>
  );
};

export default ContactSection;
