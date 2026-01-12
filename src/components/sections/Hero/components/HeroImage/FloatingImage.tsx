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
      className="absolute inset-8 sm:inset-10 lg:inset-12"
    >
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-background">
        <motion.div
          initial={{ filter: "grayscale(100%)" }}
          animate={{ filter: "grayscale(0%)" }}
          transition={{ duration: 0.7, delay: 1 }}
          className="w-full h-full"
        >
          <Image
            src="/images/hero.png"
            alt="Roman Frolov"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
