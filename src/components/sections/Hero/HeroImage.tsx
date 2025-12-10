"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const orbitingIcons = [
  { icon: "⚛️", size: 32, duration: 12, delay: 0, radius: 160 },
  { icon: "📱", size: 28, duration: 15, delay: 2, radius: 180 },
  { icon: "🎨", size: 26, duration: 18, delay: 4, radius: 150 },
  { icon: "⚡", size: 30, duration: 14, delay: 1, radius: 170 },
  { icon: "🚀", size: 24, duration: 16, delay: 3, radius: 165 },
];

export function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
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

function MorphingBlob() {
  return (
    <motion.div
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute inset-4 bg-linear-to-br from-neutral-200 via-neutral-100 to-neutral-300 opacity-60"
    />
  );
}

function OrbitingElements() {
  return (
    <>
      {orbitingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
            delay: item.delay,
          }}
          style={{ width: item.radius * 2, height: item.radius * 2 }}
        >
          <motion.span
            className="absolute flex items-center justify-center bg-background rounded-full shadow-lg border border-muted"
            style={{
              fontSize: item.size,
              width: item.size + 16,
              height: item.size + 16,
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}
            animate={{ rotate: -360 }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "linear",
              delay: item.delay,
            }}
          >
            {item.icon}
          </motion.span>
        </motion.div>
      ))}
    </>
  );
}

function OrbitRings() {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full animate-spin-slow opacity-20">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="8 8"
        />
      </svg>
      <svg className="absolute inset-0 w-full h-full animate-spin-reverse opacity-10">
        <circle
          cx="50%"
          cy="50%"
          r="38%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 12"
        />
      </svg>
    </>
  );
}

function FloatingImage() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 5,
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
