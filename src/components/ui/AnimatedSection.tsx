"use client";

import { ReactNode } from "react";

import { m } from "framer-motion";

import { FADE_IN, FADE_IN_TRANSITION } from "@/constants";
import { useHydrated, useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

type TProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedSection({ children, className }: TProps) {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();

  // Pre-hydration + reduced-motion skip the m.div wrapper so the first
  // client render matches SSR exactly.
  if (prefersReducedMotion || !hydrated) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <m.div {...FADE_IN} transition={FADE_IN_TRANSITION} className={cn(className)}>
      {children}
    </m.div>
  );
}
