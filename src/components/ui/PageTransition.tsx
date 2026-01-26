"use client";

import { ReactNode } from "react";

import { motion } from "framer-motion";

import { PAGE_TRANSITION, PAGE_TRANSITION_DURATION } from "@/constants";

type TProps = {
  children: ReactNode;
};

export function PageTransition({ children }: TProps) {
  return (
    <motion.div
      initial={PAGE_TRANSITION.initial}
      animate={PAGE_TRANSITION.animate}
      exit={PAGE_TRANSITION.exit}
      transition={{ duration: PAGE_TRANSITION_DURATION }}
    >
      {children}
    </motion.div>
  );
}
