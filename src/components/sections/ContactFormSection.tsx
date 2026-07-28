"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Titulo } from "../ui/Titulo";
import ContactForm from "../forms/ContactForm";
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
          <address className="border-2 border-theme bg-surface p-4 rounded-r-sm w-fit not-italic">
            <h3 className="m-2 font-medium text-foreground">
              {dict.contact.orMessageMeHere}
            </h3>
            <a
              href="https://www.linkedin.com/in/denilson-miguel-godoy-bautista/"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-4 text-chrome flex flex-row items-center p-1 m-2"
            >
              <FaLinkedin size={24} aria-hidden />
              <p>denilson-miguel-godoy-bautista</p>
            </a>
            <a
              href="mailto:2201010141@undc.edu.pe"
              className="gap-4 text-chrome flex flex-row items-center p-1 m-2"
            >
              <FaEnvelope size={24} aria-hidden />
              <p>2201010141@undc.edu.pe</p>
            </a>
          </address>

          <figure className="hidden md:flex flex-col items-center mt-8">
            <Image
              src="/images/profile/foto_contact.jpeg"
              alt={dict.a11y.profileAlt}
              width={250}
              height={250}
              className="custom-shadow -rotate-3 border border-theme bg-surface"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
