"use client";

import { useRef } from "react";
import Image from "next/image";
import { personalInfo } from "@/data/portfolio";
import { Button } from "../ui/Button";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  GSAP_PREHIDE,
  useHeroAnimation,
  type HeroAnimationRefs,
} from "@/animations";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const availableRef = useRef<HTMLElement>(null);
  const biographyRef = useRef<HTMLHeadingElement>(null);
  const biographyTextRef = useRef<HTMLParagraphElement>(null);
  const cvButtonRef = useRef<HTMLDivElement>(null);
  const contactButtonRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dotsRef = useRef<HTMLDivElement>(null);

  const animationRefs: HeroAnimationRefs = {
    title: titleRef,
    image: imageRef,
    available: availableRef,
    biography: biographyRef,
    biographyText: biographyTextRef,
    cvButton: cvButtonRef,
    contactButton: contactButtonRef,
    socialIcons: socialIconsRef,
    dots: dotsRef,
  };

  useHeroAnimation(sectionRef, animationRefs);

  const router = useRouter();
  const { t, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const { hero } = dict;
  const shortName = personalInfo[0].shortName;

  const handleContactMe = () => {
    router.push("/contact-me");
  };

  return (
    <section ref={sectionRef} className="py-2 md:py-10">
      <div className="w-full mb-7 lg:mt-10 md:mb-20">
        <h1
          ref={titleRef}
          className={`font-semibold mb-4 leading-snug ${GSAP_PREHIDE}`}
          style={{ fontSize: "clamp(1.5rem, 5vw, 2.7rem)" }}
        >
          {shortName} {hero.title.verb}{" "}
          <span className="text-secondary">{hero.title.roleStudent} </span>
          {hero.title.conjunction}{" "}
          <span className="text-secondary">{hero.title.roleDeveloper}</span>
        </h1>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-10 gap-10">
        <figure className="flex flex-col items-center justify-center w-full md:col-span-2 col-span-1">
          <Image
            ref={imageRef}
            src="/images/profile/foto_animada.png"
            alt={dict.a11y.profileAlt}
            width={250}
            height={250}
            className={`rounded-full border-2 border-theme mb-4 ${GSAP_PREHIDE}`}
            priority
          />

          <figure
            ref={availableRef}
            className={`max-w-40 flex items-center gap-2 border border-theme px-4 py-2 rounded ${GSAP_PREHIDE}`}
          >
            <div
              className="w-3 h-3"
              style={{ backgroundColor: "rgb(var(--secondary))" }}
            ></div>
            <span className="text-muted">{hero.available}</span>
          </figure>
        </figure>

        <article className="md:col-span-6 col-span-1">
          <h1
            ref={biographyRef}
            className={`mb-1.5 font-normal ${GSAP_PREHIDE}`}
            style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
          >
            <span className="text-secondary" aria-hidden>#</span>
            {hero.biography}
          </h1>
          <p
            ref={biographyTextRef}
            className={`text-muted mb-1 md:mb-5 ${GSAP_PREHIDE}`}
          >
            {hero.bioShort}
          </p>

          <div
            ref={cvButtonRef}
            className={`hidden md:flex justify-end ${GSAP_PREHIDE}`}
          >
            <a href="/files/CV_Denilson_Godoy.pdf" download="CV_Denilson_Godoy" className="inline-block">
              <Button
                text={hero.downloadCv}
              />
            </a>
          </div>
        </article>

        <nav className="md:col-span-2 col-span-1">
          <div
            ref={contactButtonRef}
            className={`flex md:justify-end justify-center ${GSAP_PREHIDE}`}
          >
            <Button text={hero.contactMe} onClick={handleContactMe} />
          </div>

          <div className="grid md:grid-cols-3 md:grid-rows-3 md:gap-5 grid-cols-5 grid-rows-1 gap-4 mt-6 justify-center items-center">
            <a
              ref={(el) => {
                socialIconsRef.current[0] = el;
              }}
              href="https://github.com/DMGB06"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex justify-center ${GSAP_PREHIDE}`}
            >
              <FaGithub size={24} className="text-chrome" />
            </a>
            <a
              ref={(el) => {
                socialIconsRef.current[1] = el;
              }}
              href="https://www.linkedin.com/in/denilson-miguel-godoy-bautista/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex justify-center ${GSAP_PREHIDE}`}
            >
              <FaLinkedin size={24} className="text-chrome" />
            </a>
            <a
              ref={(el) => {
                socialIconsRef.current[2] = el;
              }}
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
              className={`flex justify-center ${GSAP_PREHIDE}`}
            >
              <FaEnvelope size={24} className="text-chrome" />
            </a>

            <div
              ref={dotsRef}
              className="hidden md:grid md:col-span-2 md:row-span-2"
            >
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full ${GSAP_PREHIDE}`}
                    style={{ backgroundColor: "rgb(var(--muted))" }}
                  />
                ))}
              </div>
            </div>

            <a
              ref={(el) => {
                socialIconsRef.current[3] = el;
              }}
              href="https://www.instagram.com/denilson_6_gd/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex justify-center ${GSAP_PREHIDE}`}
            >
              <FaInstagram size={24} className="text-chrome" />
            </a>
            <a
              ref={(el) => {
                socialIconsRef.current[4] = el;
              }}
              href="https://www.facebook.com/denilson.godoy.395"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex justify-center ${GSAP_PREHIDE}`}
            >
              <FaFacebook size={24} className="text-chrome" />
            </a>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Hero;
