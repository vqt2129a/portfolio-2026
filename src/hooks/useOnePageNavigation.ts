import { useCallback, useEffect, useRef, useState } from "react";
import { SECTIONS, type Section } from "../constants/landing";

const TRANSITION_MS = 400;
const COOLDOWN_MS = 800;

export function useOnePageNavigation() {
  const [current, setCurrent] = useState<Section>(SECTIONS[0]);
  const [animating, setAnimating] = useState(false);

  const cooldownRef = useRef(false);
  const transitionTimerRef = useRef<number | null>(null);
  const cooldownTimerRef = useRef<number | null>(null);

  const goTo = useCallback(
    (next: Section) => {
      if (cooldownRef.current || next === current) return;

      cooldownRef.current = true;
      setAnimating(true);

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
      if (cooldownTimerRef.current !== null) {
        window.clearTimeout(cooldownTimerRef.current);
      }

      transitionTimerRef.current = window.setTimeout(() => {
        setCurrent(next);
        setAnimating(false);

        // Reset scroll position when entering new section
        const contentLayer = document.querySelector(".onepage-content-layer");
        if (contentLayer) contentLayer.scrollTop = 0;

        cooldownTimerRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
        }, COOLDOWN_MS);
      }, TRANSITION_MS);
    },
    [current]
  );

  useEffect(() => {
    const getContentLayer = () =>
      document.querySelector(".onepage-content-layer") as HTMLElement | null;

    const isScrolledToTop = (el: HTMLElement) => el.scrollTop <= 1;
    const isScrolledToBottom = (el: HTMLElement) =>
      el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

    const onWheel = (event: WheelEvent) => {
      const contentLayer = getContentLayer();
      if (!contentLayer) return;

      const index = SECTIONS.indexOf(current);
      const goingDown = event.deltaY > 0;
      const goingUp = event.deltaY < 0;

      // If content is scrollable and not at edge, let native scroll happen
      const hasOverflow = contentLayer.scrollHeight > contentLayer.clientHeight + 2;
      if (hasOverflow) {
        if (goingDown && !isScrolledToBottom(contentLayer)) return;
        if (goingUp && !isScrolledToTop(contentLayer)) return;
      }

      event.preventDefault();
      if (goingDown && index < SECTIONS.length - 1) {
        goTo(SECTIONS[index + 1]);
      } else if (goingUp && index > 0) {
        goTo(SECTIONS[index - 1]);
      }
    };

    let touchStartY = 0;
    let wasAtTop = false;
    let wasAtBottom = false;

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
      const contentLayer = getContentLayer();
      if (contentLayer) {
        wasAtTop = isScrolledToTop(contentLayer);
        wasAtBottom = isScrolledToBottom(contentLayer);
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      const delta = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(delta) < 60) return;

      const contentLayer = getContentLayer();
      if (!contentLayer) return;

      const index = SECTIONS.indexOf(current);
      const goingDown = delta > 0;
      const goingUp = delta < 0;

      // Only change section if content was ALREADY at edge BEFORE touch started
      const hasOverflow = contentLayer.scrollHeight > contentLayer.clientHeight + 2;
      if (hasOverflow) {
        if (goingDown && !wasAtBottom) return;
        if (goingUp && !wasAtTop) return;
      }

      if (goingDown && index < SECTIONS.length - 1) {
        goTo(SECTIONS[index + 1]);
      } else if (goingUp && index > 0) {
        goTo(SECTIONS[index - 1]);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [current, goTo]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
      if (cooldownTimerRef.current !== null) {
        window.clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  return {
    current,
    animating,
    goTo,
    sections: SECTIONS,
  };
}
