"use client";

import { ReactNode } from "react";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { PAGE_TRANSITION, PAGE_TRANSITION_DURATION } from "@/constants";

type TProps = {
  children: ReactNode;
};

export function PageTransition({ children }: TProps) {
  const locale = useLocale();

  return (
    <motion.div
      key={locale}
      initial={PAGE_TRANSITION.initial}
      animate={PAGE_TRANSITION.animate}
      exit={PAGE_TRANSITION.exit}
      transition={{ duration: PAGE_TRANSITION_DURATION }}
    >
      {children}
    </motion.div>
  );
}
