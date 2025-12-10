"use client";

import { motion } from "framer-motion";
import { SocialLink } from "@/components/ui/SocialLink";
import { socialLinks } from "@/data/social-links";
import { HERO_CONTENT, ANIMATION_CONFIG } from "../../constants";

export function HeroContent() {
  const { fadeIn } = ANIMATION_CONFIG;

  return (
    <motion.div
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={{ duration: fadeIn.duration }}
      className="space-y-6 lg:max-w-lg"
    >
      <p className="text-muted-foreground">{HERO_CONTENT.greeting}</p>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
        {HERO_CONTENT.name}
      </h1>

      <p className="text-xl sm:text-2xl text-muted-foreground">
        {HERO_CONTENT.role}
      </p>

      <p className="text-muted-foreground leading-relaxed">
        {HERO_CONTENT.description}
      </p>

      <motion.div
        className="flex gap-5 pt-4"
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
