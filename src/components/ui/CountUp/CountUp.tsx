"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks";

type TCountUpProps = {
  value: number;
  duration?: number;
  className?: string;
};

export function CountUp({ value, duration = 1.5, className }: TCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    if (prefersReducedMotion) {
      setDisplayValue(value);

      return;
    }

    let raf = 0;

    const runAnimation = () => {
      const durationMs = duration * 1000;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplayValue(Math.round(value * eased));

        if (t < 1) {
          raf = requestAnimationFrame(tick);
        }
      };

      raf = requestAnimationFrame(tick);
    };

    // Start immediately if already in view; otherwise wait for the element
    // to cross the 50px threshold.
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        runAnimation();
      },
      { rootMargin: "-50px 0px -50px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
