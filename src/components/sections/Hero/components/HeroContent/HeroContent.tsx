"use client";

import { motion } from "framer-motion";

import { SocialLink } from "@/components/ui";
import { socialLinks } from "@/data/social-links";

import { HERO_CONTENT, ANIMATION_CONFIG } from "../../constants";

export function HeroContent() {
  const { fadeIn } = ANIMATION_CONFIG;

  return (
    <motion.div
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={{ duration: fadeIn.duration }}
      className="space-y-3 lg:max-w-lg"
    >
      <p className="text-sm text-muted-foreground">{HERO_CONTENT.greeting}</p>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
        {HERO_CONTENT.name}
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground">
        {HERO_CONTENT.role}
      </p>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {HERO_CONTENT.description}
      </p>

      <motion.div
        className="flex gap-4 pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {socialLinks.map((link) => (
          <SocialLink key={link.name} {...link} />
        ))}
      </motion.div>
    </motion.div>
  );
}
