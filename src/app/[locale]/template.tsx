"use client";

import { ReactNode } from "react";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks";

type TProps = {
  children: ReactNode;
};

export default function Template({ children }: TProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
