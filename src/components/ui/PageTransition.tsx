"use client";

import { ReactNode } from "react";

import { m } from "framer-motion";

import { useReducedMotion } from "@/hooks";

type TProps = {
  children: ReactNode;
};

export function PageTransition({ children }: TProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {children}
    </m.div>
  );
}
