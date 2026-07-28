import type { RefObject } from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import type { AboutAnimationRefs } from "../types";
import { gsap } from "../gsap";
import { createAboutTypewriterTimeline } from "../timelines/about.timeline";
import { createIntersectionOnceObserver } from "../utils/visibilityObserver";
import { useGsapTimeline } from "./useGsapTimeline";
import type { Locale } from "@/i18n";

function clearTypewriterRefs(refs: AboutAnimationRefs) {
  if (refs.text1.current) refs.text1.current.textContent = "";
  if (refs.text2.current) refs.text2.current.textContent = "";
  if (refs.text3.current) refs.text3.current.textContent = "";
}

function setTypewriterFinalText(
  refs: AboutAnimationRefs,
  paragraphs: readonly [string, string, string]
) {
  if (refs.text1.current) refs.text1.current.textContent = paragraphs[0];
  if (refs.text2.current) refs.text2.current.textContent = paragraphs[1];
  if (refs.text3.current) refs.text3.current.textContent = paragraphs[2];
}

function isInViewport(element: HTMLElement, threshold = 0.3) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const visibleHeight =
    Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

  if (rect.height <= 0) return false;

  return visibleHeight / rect.height >= threshold;
}

export function useAboutTypewriter(
  sectionRef: RefObject<HTMLElement | null>,
  refs: AboutAnimationRefs,
  imageRef: RefObject<HTMLElement | null>,
  paragraphs: readonly [string, string, string],
  locale: Locale
) {
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    const observer = createIntersectionOnceObserver(
      sectionRef.current,
      () => setHasScrolledIntoView(true),
      0.3
    );

    return () => observer?.disconnect();
  }, [sectionRef]);

  useLayoutEffect(() => {
    if (!hasScrolledIntoView) return;

    clearTypewriterRefs(refs);
    gsap.killTweensOf([
      refs.text1.current,
      refs.text2.current,
      refs.text3.current,
    ]);

    const section = sectionRef.current;
    if (section && isInViewport(section)) {
      const typewriterTimeline = createAboutTypewriterTimeline(refs, paragraphs);
      return () => {
        typewriterTimeline.kill();
      };
    }

    setTypewriterFinalText(refs, paragraphs);
    // refs hold stable RefObjects from the parent component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasScrolledIntoView, locale, paragraphs, sectionRef]);

  useGsapTimeline(() => {
    const image = imageRef.current;
    if (image) {
      gsap.set(image, { autoAlpha: 0, x: -30 });
    }

    if (!hasScrolledIntoView) {
      return () => {
        if (image) gsap.killTweensOf(image);
      };
    }

    const timeline = gsap.timeline();

    if (image) {
      timeline.to(
        image,
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" },
        0
      );
    }

    return () => {
      timeline.kill();
      if (image) gsap.killTweensOf(image);
    };
  }, [hasScrolledIntoView]);
}
