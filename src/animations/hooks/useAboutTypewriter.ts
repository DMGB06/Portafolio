import type { RefObject } from "react";
import { useEffect, useState } from "react";
import type { AboutAnimationRefs } from "../types";
import { gsap } from "../gsap";
import { createAboutTypewriterTimeline } from "../timelines/about.timeline";
import { createIntersectionOnceObserver } from "../utils/visibilityObserver";
import { useGsapTimeline } from "./useGsapTimeline";

export function useAboutTypewriter(
  sectionRef: RefObject<HTMLElement | null>,
  refs: AboutAnimationRefs,
  imageRef: RefObject<HTMLElement | null>
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = createIntersectionOnceObserver(
      sectionRef.current,
      () => setIsVisible(true),
      0.3
    );

    return () => observer?.disconnect();
  }, [sectionRef]);

  useGsapTimeline(() => {
    const image = imageRef.current;
    if (image) {
      gsap.set(image, { autoAlpha: 0, x: -30 });
    }

    if (!isVisible) {
      return () => {
        if (image) gsap.killTweensOf(image);
      };
    }

    const timeline = gsap.timeline();

    if (image) {
      timeline.to(image, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0);
    }

    const typewriterTimeline = createAboutTypewriterTimeline(refs);
    timeline.add(typewriterTimeline, 0.2);

    return () => {
      timeline.kill();
      typewriterTimeline.kill();
      if (image) gsap.killTweensOf(image);
    };
  }, [isVisible]);
}
