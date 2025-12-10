"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ANIMATION_CONFIG } from "../../constants";

export function FloatingImage() {
  const { floatingImage } = ANIMATION_CONFIG;

  return (
    <motion.div
      animate={{ y: floatingImage.y }}
      transition={{
        duration: floatingImage.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute inset-12 sm:inset-14 lg:inset-16"
    >
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-background">
        <Image
          src="/images/hero.png"
          alt="Roman Frolov"
          fill
          priority
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
        />
      </div>
    </motion.div>
  );
}
