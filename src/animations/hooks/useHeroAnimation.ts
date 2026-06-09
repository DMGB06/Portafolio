import type { RefObject } from "react";
import type { HeroAnimationRefs } from "../types";
import {
  createHeroEnterTimeline,
  createHeroLoopAnimations,
  killHeroAnimations,
  setHeroInitialState,
} from "../timelines/hero.timeline";
import { createVisibilityObserver } from "../utils/visibilityObserver";
import { useGsapTimeline } from "./useGsapTimeline";

export function useHeroAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  refs: HeroAnimationRefs
) {
  useGsapTimeline(() => {
    setHeroInitialState(refs);

    const enterTimeline = createHeroEnterTimeline(refs);
    const loopAnimations = createHeroLoopAnimations(refs);
    const loopList = Object.values(loopAnimations);

    const observer = createVisibilityObserver(
      sectionRef.current,
      loopList,
      0.1
    );

    return () => {
      observer?.disconnect();
      enterTimeline.kill();
      loopList.forEach((animation) => animation.kill());
      killHeroAnimations(refs);
    };
  }, []);
}
