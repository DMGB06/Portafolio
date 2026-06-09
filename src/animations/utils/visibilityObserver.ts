import type { GsapTween } from "../types";

type PausableAnimation = Pick<GsapTween, "play" | "pause">;

export function createVisibilityObserver(
  target: Element | null,
  animations: PausableAnimation[],
  threshold = 0.1
): IntersectionObserver | null {
  if (!target) return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        animations.forEach((animation) => {
          if (entry.isIntersecting) {
            animation.play();
          } else {
            animation.pause();
          }
        });
      });
    },
    { threshold }
  );

  observer.observe(target);
  return observer;
}

export function createIntersectionOnceObserver(
  target: Element | null,
  onVisible: () => void,
  threshold = 0.3
): IntersectionObserver | null {
  if (!target) return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onVisible();
          observer.disconnect();
        }
      });
    },
    { threshold }
  );

  observer.observe(target);
  return observer;
}
