"use client";

import { ReactNode } from "react";

import { MotionConfig } from "framer-motion";

type TProps = {
  children: ReactNode;
};

/**
 * Tell Framer Motion to honor the user's `prefers-reduced-motion` setting
 * globally — transitions collapse to 0 duration, layout animations skip,
 * exit animations play instantly. Individual components can still opt out
 * via their own `useReducedMotion()` checks.
 */
export function MotionProvider({ children }: TProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
