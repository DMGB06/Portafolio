import type { RefObject } from "react";
import { REVEAL_ITEM } from "../constants";
import {
  killScrollReveal,
  playScrollReveal,
} from "../timelines/scrollReveal.timeline";
import { useGsapTimeline } from "./useGsapTimeline";

interface UseScrollRevealOptions {
  itemSelector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  threshold?: number;
}

function isSectionVisible(section: Element, threshold: number) {
  const rect = section.getBoundingClientRect();
  const visibleHeight =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

  return visibleHeight >= rect.height * threshold;
}

export function useScrollReveal(
  sectionRef: RefObject<HTMLElement | null>,
  options: UseScrollRevealOptions = {}
) {
  const {
    itemSelector = `[${REVEAL_ITEM}]`,
    y = 40,
    stagger = 0.1,
    duration = 0.6,
    threshold = 0.15,
  } = options;

  useGsapTimeline(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = Array.from(section.querySelectorAll(itemSelector));
    if (!items.length) return;

    let hasPlayed = false;

    const reveal = () => {
      if (hasPlayed) return;
      hasPlayed = true;
      observer?.disconnect();
      playScrollReveal(items, { y, stagger, duration });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal();
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(section);

    if (isSectionVisible(section, threshold)) {
      reveal();
    }

    return () => {
      observer.disconnect();
      killScrollReveal(items);
    };
  }, []);
}
