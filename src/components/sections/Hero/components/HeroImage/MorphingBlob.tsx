"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks";

import { ANIMATION_CONFIG } from "../../constants";

export function MorphingBlob() {
  const prefersReducedMotion = useReducedMotion();
  const { morphingBlob } = ANIMATION_CONFIG;

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-4 bg-linear-to-br from-neutral-200 via-neutral-100 to-neutral-300 opacity-60"
        style={{ borderRadius: morphingBlob.borderRadius[0] }}
      />
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{
        borderRadius: morphingBlob.borderRadius,
        rotate: morphingBlob.rotate,
      }}
      transition={{
        duration: morphingBlob.duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute inset-4 bg-linear-to-br from-neutral-200 via-neutral-100 to-neutral-300 opacity-60"
    />
  );
}
