"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { ANIMATION_CONFIG } from "../../constants";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function FloatingImage() {
  const { floatingImage } = ANIMATION_CONFIG;

  return (
    <motion.div
      initial={false}
      animate={{ y: floatingImage.y }}
      transition={{
        duration: floatingImage.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute inset-8 sm:inset-10 lg:inset-12"
    >
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-background">
        <Image src={`${basePath}/images/hero.png`} alt="Roman Frolov" fill priority className="object-cover" />
      </div>
    </motion.div>
  );
}
