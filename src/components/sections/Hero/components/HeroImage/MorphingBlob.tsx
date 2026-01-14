"use client";

import { motion } from "framer-motion";

import { ANIMATION_CONFIG } from "../../constants";

export function MorphingBlob() {
  const { morphingBlob } = ANIMATION_CONFIG;

  return (
    <motion.div
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
