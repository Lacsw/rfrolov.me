"use client";

import { motion } from "framer-motion";
import { ANIMATION_CONFIG } from "../../constants";
import { MorphingBlob } from "./MorphingBlob";
import { OrbitingElements } from "./OrbitingElements";
import { OrbitRings } from "./OrbitRings";
import { FloatingImage } from "./FloatingImage";

export function HeroImage() {
  const { scaleIn } = ANIMATION_CONFIG;

  return (
    <motion.div
      initial={scaleIn.initial}
      animate={scaleIn.animate}
      transition={{ duration: scaleIn.duration, delay: scaleIn.delay }}
      className="relative shrink-0 mx-auto lg:mx-0"
    >
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
        <MorphingBlob />
        <OrbitingElements />
        <OrbitRings />
        <FloatingImage />
      </div>
    </motion.div>
  );
}
