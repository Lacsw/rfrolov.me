"use client";

import { motion } from "framer-motion";

import { FloatingImage } from "./FloatingImage";
import { MorphingBlob } from "./MorphingBlob";
import { ANIMATION_CONFIG } from "../../constants";

export function HeroImage() {
  const { scaleIn } = ANIMATION_CONFIG;

  return (
    <motion.div
      initial={scaleIn.initial}
      animate={scaleIn.animate}
      transition={{ duration: scaleIn.duration, delay: scaleIn.delay }}
      className="relative shrink-0 mx-auto lg:mx-0"
    >
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
        <MorphingBlob />
        <FloatingImage />
      </div>
    </motion.div>
  );
}
