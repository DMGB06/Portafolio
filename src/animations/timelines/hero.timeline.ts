import { gsap } from "../gsap";
import type { HeroAnimationRefs } from "../types";

function getHeroTargets(refs: HeroAnimationRefs) {
  return [
    refs.title.current,
    refs.image.current,
    refs.available.current,
    refs.biography.current,
    refs.biographyText.current,
    refs.cvButton.current,
    refs.contactButton.current,
    ...refs.socialIcons.current,
    ...(refs.dots.current?.children ?? []),
  ].filter(Boolean);
}

export function setHeroInitialState(refs: HeroAnimationRefs) {
  gsap.set(refs.title.current, { autoAlpha: 0, y: 50 });
  gsap.set(refs.image.current, { autoAlpha: 0, scale: 0.5, rotation: -10 });
  gsap.set(refs.available.current, { autoAlpha: 0, y: 20 });
  gsap.set(refs.biography.current, { autoAlpha: 0, x: -30 });
  gsap.set(refs.biographyText.current, { autoAlpha: 0, y: 20 });
  gsap.set(refs.cvButton.current, { autoAlpha: 0, scale: 0.8 });
  gsap.set(refs.contactButton.current, { autoAlpha: 0, scale: 0.8 });
  gsap.set(refs.socialIcons.current, { autoAlpha: 0, y: 20, scale: 0.5 });
  gsap.set(refs.dots.current?.children ?? [], { autoAlpha: 0, scale: 0 });
}

export function createHeroEnterTimeline(refs: HeroAnimationRefs) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(refs.title.current, { autoAlpha: 1, y: 0, duration: 0.8 })
    .to(
      refs.image.current,
      {
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    )
    .to(
      refs.available.current,
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "bounce.out" },
      "-=0.4"
    )
    .to(refs.biography.current, { autoAlpha: 1, x: 0, duration: 0.7 }, "-=0.4")
    .to(refs.biographyText.current, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35")
    .to(refs.cvButton.current, { autoAlpha: 1, scale: 1, duration: 0.4 }, "-=0.3")
    .to(
      refs.contactButton.current,
      { autoAlpha: 1, scale: 1, duration: 0.4 },
      "-=0.35"
    )
    .to(
      refs.socialIcons.current,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        stagger: 0.08,
        ease: "back.out(2)",
      },
      "-=0.25"
    )
    .to(
      refs.dots.current?.children ?? [],
      { autoAlpha: 1, scale: 1, duration: 0.25, stagger: 0.02 },
      "-=0.2"
    );

  return tl;
}

export function createHeroLoopAnimations(refs: HeroAnimationRefs) {
  const pulseDot = refs.available.current?.querySelector<HTMLElement>("div");

  const loopAnimations = {
    badge: gsap.fromTo(
      refs.available.current,
      { scale: 1.01 },
      {
        scale: 1.05,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    ),
    float: gsap.to(refs.image.current, {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    }),
    contactButton: gsap.fromTo(
      refs.contactButton.current,
      { scale: 1.02 },
      {
        scale: 1.08,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    ),
  };

  if (pulseDot) {
    return {
      pulse: gsap.to(pulseDot, {
        scale: 1.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }),
      ...loopAnimations,
    };
  }

  return loopAnimations;
}

export function killHeroAnimations(refs: HeroAnimationRefs) {
  gsap.killTweensOf(getHeroTargets(refs));
}
