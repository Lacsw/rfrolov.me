"use client";

import { ReactNode } from "react";

import { motion } from "framer-motion";

import { FADE_IN, FADE_IN_TRANSITION } from "@/constants";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

type TProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedSection({ children, className }: TProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div {...FADE_IN} transition={FADE_IN_TRANSITION} className={cn(className)}>
      {children}
    </motion.div>
  );
}
