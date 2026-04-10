"use client";

import { useEffect, useRef, useState } from "react";

import { useInView, useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks";

type TCountUpProps = {
  value: number;
  duration?: number;
  className?: string;
};

export function CountUp({ value, duration = 1.5, className }: TCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const smooth = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplayValue(value);

      return;
    }
    motionValue.set(value);
  }, [isInView, value, motionValue, prefersReducedMotion]);

  useEffect(() => {
    return smooth.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [smooth]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
