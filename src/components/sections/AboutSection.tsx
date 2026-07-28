"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { Titulo } from "../ui/Titulo";
import { GSAP_PREHIDE, useAboutTypewriter, type AboutAnimationRefs } from "@/animations";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

interface AboutSectionProps {
  isSection?: boolean;
  showReadMore?: boolean;
}

const AboutSection = ({
  isSection = true,
  showReadMore = true,
}: AboutSectionProps) => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const text3Ref = useRef<HTMLSpanElement>(null);
  const { t, locale, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const paragraphs = dict.about.paragraphs as [string, string, string];

  const animationRefs: AboutAnimationRefs = {
    text1: text1Ref,
    text2: text2Ref,
    text3: text3Ref,
  };

  useAboutTypewriter(sectionRef, animationRefs, imageRef, paragraphs, locale);

  const handleReadMore = () => {
    router.push("/about-me");
  };

  return (
    <section ref={sectionRef} className="py-10" id="about-me">
      <Titulo
        text={dict.sections.aboutMe}
        isSection={isSection}
        className="max-w-1/3"
      />

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 p-2 ${
          !isSection ? "md:flex md:flex-row-reverse" : ""
        }`}
      >
        <figure
          ref={imageRef}
          className={`flex justify-center order-2 md:order-0 ${GSAP_PREHIDE}`}
        >
          <Image
            src="/images/profile/carnet.jpeg"
            alt="Denilson Godoy"
            width={300}
            height={400}
            priority
            className="custom-shadow col-span-2 md:col-span-1 rounded-sm border border-theme bg-surface"
          />
        </figure>
        <div className="w-full">
          <div className="text-muted mb-4 md:leading-relaxed leading-snug">
            <span className="relative inline">
              <span className="invisible">{paragraphs[0]}</span>
              <span ref={text1Ref} className="absolute left-0 top-0"></span>
            </span>
            <br /> <br />
            <span className="relative block">
              <span className="invisible">{paragraphs[1]}</span>
              <span ref={text2Ref} className="absolute left-0 top-0"></span>
            </span>
            <br /> <br />
            <span className="relative block">
              <span className="invisible">{paragraphs[2]}</span>
              <span ref={text3Ref} className="absolute left-0 top-0"></span>
            </span>
          </div>
          <div className="hidden md:flex justify-end mr-2">
            {showReadMore && (
              <Button
                text={dict.about.readMore}
                onClick={handleReadMore}
                className="flex justify-end"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
