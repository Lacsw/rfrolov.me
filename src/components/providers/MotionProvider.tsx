"use client";

import { ReactNode } from "react";

import { domMax, LazyMotion, MotionConfig } from "framer-motion";

type TProps = {
  children: ReactNode;
};

/**
 * Two things in one wrapper:
 *
 * 1. `LazyMotion` with `domMax` features — lets every component import the
 *    lightweight `m.*` variants from framer-motion. The full animation
 *    feature chunk loads once at the app root instead of being bundled into
 *    every component's split. `domMax` covers layout animations (needed by
 *    the navbar active-pill layoutId) on top of the standard `domAnimation`
 *    bundle.
 * 2. `MotionConfig reducedMotion="user"` — honors the user's
 *    `prefers-reduced-motion: reduce` system preference globally.
 *    Per-component `useReducedMotion()` calls still work as finer-grained
 *    opt-outs on top of the global default.
 */
export function MotionProvider({ children }: TProps) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
