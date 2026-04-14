"use client";

import { ReactNode, useRef } from "react";

import { m, useInView } from "framer-motion";

import { useReducedMotion } from "@/hooks";

type TScrollRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  y = 16,
  duration = 0.5,
  delay = 0,
}: TScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(4px)" }
      }
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </m.div>
  );
}
