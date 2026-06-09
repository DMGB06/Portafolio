import { gsap } from "../gsap";

interface ScrollRevealOptions {
  y?: number;
  stagger?: number;
  duration?: number;
}

export function setScrollRevealInitialState(elements: Element[], y = 40) {
  gsap.set(elements, { autoAlpha: 0, y });
}

export function playScrollReveal(
  elements: Element[],
  options: ScrollRevealOptions = {}
) {
  const { y = 40, stagger = 0.1, duration = 0.6 } = options;

  setScrollRevealInitialState(elements, y);

  return gsap.to(elements, {
    autoAlpha: 1,
    y: 0,
    duration,
    stagger,
    ease: "power3.out",
    onComplete: () => {
      elements.forEach((el) => el.classList.remove("gsap-prehide"));
    },
  });
}

export function killScrollReveal(elements: Element[]) {
  gsap.killTweensOf(elements);
}
