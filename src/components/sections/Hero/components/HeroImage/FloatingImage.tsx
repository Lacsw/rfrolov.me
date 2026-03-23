"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks";
import { getImagePath } from "@/lib/utils";

import { ANIMATION_CONFIG } from "../../constants";

export function FloatingImage() {
  const { floatingImage } = ANIMATION_CONFIG;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={prefersReducedMotion ? {} : { y: floatingImage.y }}
      transition={
        prefersReducedMotion
          ? {}
          : {
              duration: floatingImage.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      className="absolute inset-8 sm:inset-10 lg:inset-12"
    >
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-background">
        <Image
          src={getImagePath("/images/hero.png")}
          alt="Roman Frolov"
          fill
          priority
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}
