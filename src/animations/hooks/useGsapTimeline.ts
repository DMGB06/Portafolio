import { useLayoutEffect, type DependencyList } from "react";

type AnimationCleanup = () => void;

export function useGsapTimeline(
  factory: () => AnimationCleanup | void,
  deps: DependencyList = []
) {
  useLayoutEffect(() => {
    const cleanup = factory();
    return () => {
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
