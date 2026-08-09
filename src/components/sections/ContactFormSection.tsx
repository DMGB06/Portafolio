"use client";

import { useRef } from "react";
import { Titulo } from "../ui/Titulo";
import ContactForm from "../forms/ContactForm";
import { ContactLinks } from "./ContactLinks";
import { GSAP_PREHIDE, REVEAL_ITEM, useScrollReveal } from "@/animations";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

type ContactFormSectionProps = {
  isSection?: boolean;
};

const ContactFormSection = ({ isSection = true }: ContactFormSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);

  useScrollReveal(sectionRef, { stagger: 0.15 });

  return (
    <section ref={sectionRef} className="py-10">
      <div {...{ [REVEAL_ITEM]: true }} className={GSAP_PREHIDE}>
        <Titulo
          text={dict.sections.contact}
          isSection={isSection}
          className="max-w-1/6"
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        <div
          {...{ [REVEAL_ITEM]: true }}
          className={`flex flex-col items-center md:items-start ${GSAP_PREHIDE}`}
        >
          <p className="text-muted mb-6 md:leading-relaxed leading-snug">
            {dict.contact.intro}
          </p>
          <ContactForm />
        </div>

        <div
          {...{ [REVEAL_ITEM]: true }}
          className={`flex flex-col items-center md:items-center ${GSAP_PREHIDE}`}
        >
          <ContactLinks heading={dict.contact.orMessageMeHere} />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
