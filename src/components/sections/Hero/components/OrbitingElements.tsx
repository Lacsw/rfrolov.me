"use client";

import { motion } from "framer-motion";
import { ORBITING_ICONS } from "../constants";

export function OrbitingElements() {
  return (
    <>
      {ORBITING_ICONS.map((item, index) => (
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
