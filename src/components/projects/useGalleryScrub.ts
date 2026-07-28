import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Maps horizontal pointer position inside an element to a slide index. */
export function getScrubIndex(
  clientX: number,
  bounds: Pick<DOMRect, "left" | "width">,
  count: number
): number {
  if (count <= 1 || bounds.width <= 0) return 0;

  const ratio = clamp((clientX - bounds.left) / bounds.width, 0, 0.9999);
  return Math.floor(ratio * count);
}

/**
 * Horizontal scrub gallery: mouse X (and touch drag) selects the slide.
 * Keyboard arrows and explicit goTo cover a11y / taps on dots.
 */
export function useGalleryScrub(count: number) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrubToClientX = useCallback(
    (clientX: number) => {
      const root = rootRef.current;
      if (!root || count <= 1) return;

      const next = getScrubIndex(clientX, root.getBoundingClientRect(), count);
      setActiveIndex((current) => (current === next ? current : next));
    },
    [count]
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (count <= 1) return;
      // Touch: only scrub while dragging; mouse: scrub on hover move
      if (event.pointerType === "touch" && event.buttons === 0) return;
      scrubToClientX(event.clientX);
    },
    [count, scrubToClientX]
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (count <= 1 || event.pointerType !== "touch") return;
      event.currentTarget.setPointerCapture(event.pointerId);
      scrubToClientX(event.clientX);
    },
    [count, scrubToClientX]
  );

  const goTo = useCallback(
    (index: number) => {
      if (count <= 0) return;
      setActiveIndex(clamp(index, 0, count - 1));
    },
    [count]
  );

  const goBy = useCallback(
    (delta: number) => {
      if (count <= 1) return;
      setActiveIndex((current) => (current + delta + count) % count);
    },
    [count]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (count <= 1) return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        goBy(1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        goBy(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(count - 1);
      }
    },
    [count, goBy, goTo]
  );

  return {
    rootRef,
    activeIndex,
    goTo,
    onPointerMove,
    onPointerDown,
    onKeyDown,
  };
}
