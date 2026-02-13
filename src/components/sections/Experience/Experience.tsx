"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { SPACING } from "@/constants";
import { TExperience } from "@/types";

import { ExperienceCard } from "./components";
import { EXPERIENCE_ANIMATION } from "./constants";

type TProps = {
  experiences: TExperience[];
};

export function Experience({ experiences }: TProps) {
  const t = useTranslations("experience");

  return (
    <section className={SPACING.section}>
      <Container>
        <AnimatedSection className="space-y-6">
          <SectionHeader title={t("title")} />

          <motion.div variants={EXPERIENCE_ANIMATION.container} initial="hidden" animate="show">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isLast={index === experiences.length - 1}
              />
            ))}
          </motion.div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
