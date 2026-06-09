import type { RefObject } from "react";

export interface HeroAnimationRefs {
  title: RefObject<HTMLElement | null>;
  image: RefObject<HTMLElement | null>;
  available: RefObject<HTMLElement | null>;
  biography: RefObject<HTMLElement | null>;
  biographyText: RefObject<HTMLElement | null>;
  cvButton: RefObject<HTMLElement | null>;
  contactButton: RefObject<HTMLElement | null>;
  socialIcons: RefObject<(HTMLElement | null)[]>;
  dots: RefObject<HTMLDivElement | null>;
}

export interface AboutAnimationRefs {
  text1: RefObject<HTMLSpanElement | null>;
  text2: RefObject<HTMLSpanElement | null>;
  text3: RefObject<HTMLSpanElement | null>;
}

export interface GsapTween {
  play: () => void;
  pause: () => void;
  kill: () => void;
}
