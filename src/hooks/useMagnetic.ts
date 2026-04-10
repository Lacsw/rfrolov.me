"use client";

import { RefObject, useEffect } from "react";

import { useMotionValue, useSpring, MotionValue } from "framer-motion";

type TUseMagneticOptions = {
  ref: RefObject<HTMLElement | null>;
  strength?: number;
  range?: number;
};

type TUseMagneticResult = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

export function useMagnetic({
  ref,
  strength = 0.4,
  range = 80,
}: TUseMagneticOptions): TUseMagneticResult {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleMouseMove(event: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    }

    function handleMouseLeave() {
      x.set(0);
      y.set(0);
    }

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength, range, x, y]);

  return { x: smoothX, y: smoothY };
}
