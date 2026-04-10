"use client";

import { ReactNode, useRef } from "react";

import { motion } from "framer-motion";

import { useMagnetic, useReducedMotion } from "@/hooks";

type TMagneticLinkProps = {
  children: ReactNode;
  strength?: number;
  range?: number;
  className?: string;
};

export function MagneticLink({
  children,
  strength = 0.4,
  range = 80,
  className,
}: TMagneticLinkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = useMagnetic({ ref, strength, range });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
