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

        cooldownTimerRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
        }, COOLDOWN_MS);
      }, TRANSITION_MS);
    },
    [current]
  );

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const index = SECTIONS.indexOf(current);

      if (event.deltaY > 0 && index < SECTIONS.length - 1) {
        goTo(SECTIONS[index + 1]);
      } else if (event.deltaY < 0 && index > 0) {
        goTo(SECTIONS[index - 1]);
      }
    };

    let touchStartY = 0;

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const delta = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;

      const index = SECTIONS.indexOf(current);
      if (delta > 0 && index < SECTIONS.length - 1) {
        goTo(SECTIONS[index + 1]);
      } else if (delta < 0 && index > 0) {
        goTo(SECTIONS[index - 1]);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

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
