"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";

export function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold tracking-tight">
        {ABOUT_CONTENT.title}
      </h2>

      <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl">
        {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </motion.div>
  );
}
