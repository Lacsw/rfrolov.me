"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { MagneticLink, SocialLink, TextScramble } from "@/components/ui";
import { socialLinks } from "@/data/social-links";
import { useReducedMotion } from "@/hooks";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function HeroContent() {
  const t = useTranslations("hero");
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="space-y-3 lg:max-w-lg">
        <p className="text-sm text-muted-foreground">{t("greeting")}</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">{t("name")}</h1>
        <p className="text-lg sm:text-xl text-muted-foreground">{t("role")}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("description")}</p>
        <div className="flex gap-4 pt-2">
          {socialLinks.map((link) => (
            <SocialLink key={link.name} {...link} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-3 lg:max-w-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
        {t("greeting")}
      </motion.p>

      <motion.h1
        variants={itemVariants}
        className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
      >
        <TextScramble text={t("name")} />
      </motion.h1>

      <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground">
        {t("role")}
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="text-sm text-muted-foreground leading-relaxed"
      >
        {t("description")}
      </motion.p>

      <motion.div variants={itemVariants} className="flex gap-4 pt-2">
        {socialLinks.map((link) => (
          <MagneticLink key={link.name}>
            <SocialLink {...link} />
          </MagneticLink>
        ))}
      </motion.div>
    </motion.div>
  );
}
