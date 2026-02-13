"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { AnimatedSection, Container } from "@/components/ui";
import { SPACING } from "@/constants";

import { KEY_STATS, KEY_STATS_ANIMATION } from "./constants";

export function KeyStats() {
  const t = useTranslations();

  return (
    <section className={SPACING.section}>
      <Container>
        <AnimatedSection>
          <motion.div
            variants={KEY_STATS_ANIMATION.container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {KEY_STATS.map((stat) => (
              <motion.div
                key={stat.id}
                variants={KEY_STATS_ANIMATION.item}
                className="border-l-2 border-muted pl-4"
              >
                <div className="text-3xl font-semibold">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {t(stat.labelKey)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
