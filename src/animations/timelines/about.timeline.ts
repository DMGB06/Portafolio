import { gsap } from "../gsap";
import {
  ABOUT_PARAGRAPHS,
  ABOUT_TYPEWRITER_DURATIONS,
} from "../content/about.content";
import type { AboutAnimationRefs } from "../types";

export function createAboutTypewriterTimeline(refs: AboutAnimationRefs) {
  const tl = gsap.timeline();

  tl.to(refs.text1.current, {
    text: ABOUT_PARAGRAPHS[0],
    duration: ABOUT_TYPEWRITER_DURATIONS[0],
    ease: "none",
  })
    .to(
      refs.text2.current,
      {
        text: ABOUT_PARAGRAPHS[1],
        duration: ABOUT_TYPEWRITER_DURATIONS[1],
        ease: "none",
      },
      "+=0.2"
    )
    .to(
      refs.text3.current,
      {
        text: ABOUT_PARAGRAPHS[2],
        duration: ABOUT_TYPEWRITER_DURATIONS[2],
        ease: "none",
      },
      "+=0.2"
    );

  return tl;
}
