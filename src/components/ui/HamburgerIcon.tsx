"use client";

import { motion } from "framer-motion";

import { ANIMATION_DURATION } from "@/constants";

type THamburgerIconProps = {
  isOpen: boolean;
};

export function HamburgerIcon({ isOpen }: THamburgerIconProps) {
  const lineProps = {
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke" as const,
    initial: false,
    transition: { duration: ANIMATION_DURATION.fast },
  };

  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="text-foreground"
    >
      <motion.line
        x1="4"
        y1="6"
        x2="20"
        y2="6"
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        style={{ originX: "12px", originY: "6px" }}
        {...lineProps}
      />
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        {...lineProps}
      />
      <motion.line
        x1="4"
        y1="18"
        x2="20"
        y2="18"
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        style={{ originX: "12px", originY: "18px" }}
        {...lineProps}
      />
    </motion.svg>
  );
}
