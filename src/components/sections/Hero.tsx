"use client";

import { useRef } from "react";
import Link from "next/link";
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

const SHOW_CV_DOWNLOAD = false;

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const availableRef = useRef<HTMLElement>(null);
  const biographyRef = useRef<HTMLHeadingElement>(null);
  const biographyTextRef = useRef<HTMLParagraphElement>(null);
  const projectsLinkRef = useRef<HTMLAnchorElement>(null);
  const cvButtonRef = useRef<HTMLDivElement>(null);
  const contactButtonRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const animationRefs: HeroAnimationRefs = {
    title: titleRef,
    image: imageRef,
    available: availableRef,
    biography: biographyRef,
    biographyText: biographyTextRef,
    projectsLink: projectsLinkRef,
    cvButton: cvButtonRef,
    contactButton: contactButtonRef,
    socialIcons: socialIconsRef,
  };

  useHeroAnimation(sectionRef, animationRefs);

  const router = useRouter();
  const { t, locale, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const { hero } = dict;
  const cvFile = `CV_Denilson_Godoy_${locale.toUpperCase()}`;
  const shortName = personalInfo[0].shortName;

  const handleContactMe = () => {
    router.push("/contact-me");
  };

  return (
    <section ref={sectionRef} className="personal-hero">
      <div className="personal-title">
        <h1
          ref={titleRef}
          className={`font-semibold mb-4 leading-snug ${GSAP_PREHIDE}`}
        >
          {hero.title.verb} {shortName},{" "}
          <span className="text-secondary">{hero.title.roleDeveloper}</span>
        </h1>
      </div>

      <div className="personal-content">
        <article className="personal-bio">
          <h2
            ref={biographyRef}
            className={`mb-1.5 font-normal ${GSAP_PREHIDE}`}
            style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
          >
            <span className="text-secondary" aria-hidden>#</span>
            {hero.biography}
          </h2>
          <p
            ref={biographyTextRef}
            className={`text-muted mb-1 md:mb-5 ${GSAP_PREHIDE}`}
          >
            {hero.introduction}
          </p>

          <Link ref={projectsLinkRef} href="#projects" className={`personal-work-link ${GSAP_PREHIDE}`}>
            {hero.viewWork} &darr;
          </Link>

          {SHOW_CV_DOWNLOAD && (
            <div
              ref={cvButtonRef}
              className={`hidden md:flex justify-end ${GSAP_PREHIDE}`}
            >
              <a href={`/files/${cvFile}.pdf`} download={cvFile} className="inline-block">
                <Button text={hero.downloadCv} />
              </a>
            </div>
          )}
        </article>

        <nav className="personal-links">
          <div
            ref={contactButtonRef}
            className={`flex md:justify-end justify-center ${GSAP_PREHIDE}`}
          >
            <Button text={hero.contactMe} onClick={handleContactMe} />
          </div>

          <div className="personal-social">
            <a
              ref={(el) => {
                socialIconsRef.current[0] = el;
              }}
              aria-label="GitHub"
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
              aria-label="LinkedIn"
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
              aria-label="Email"
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
              className={`flex justify-center ${GSAP_PREHIDE}`}
            >
              <FaEnvelope size={24} className="text-chrome" />
            </a>

            <a
              ref={(el) => {
                socialIconsRef.current[3] = el;
              }}
              aria-label="Instagram"
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
              aria-label="Facebook"
              href="https://www.facebook.com/denilson.godoy.395"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex justify-center ${GSAP_PREHIDE}`}
            >
              <FaFacebook size={24} className="text-chrome" />
            </a>
          </div>
        </nav>

        <figure className="personal-avatar">
          <Image
            ref={imageRef}
            src="/images/profile/foto_animada.webp"
            alt={dict.a11y.profileAlt}
            width={250}
            height={250}
            sizes="(max-width: 767px) clamp(128px, 36vw, 160px), 256px"
            className={`personal-avatar-image ${GSAP_PREHIDE}`}
            priority
          />

          <figcaption
            ref={availableRef}
            className={`max-w-40 flex items-center gap-2 border border-theme px-4 py-2 rounded ${GSAP_PREHIDE}`}
          >
            <div
              className="w-3 h-3"
              style={{ backgroundColor: "rgb(var(--secondary))" }}
            ></div>
            <span className="text-muted">{hero.available}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
