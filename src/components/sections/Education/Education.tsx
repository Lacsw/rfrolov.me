"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { SPACING } from "@/constants";
import { TEducation } from "@/types";

import { EDUCATION_ANIMATION } from "./constants";
import { EducationCard } from "./EducationCard";

type TProps = {
  education: TEducation[];
};

export function Education({ education }: TProps) {
  const t = useTranslations("experiencePage");

  return (
    <section className={SPACING.section}>
      <Container>
        <AnimatedSection className="space-y-6">
          <SectionHeader title={t("education.title")} />

          <motion.div variants={EDUCATION_ANIMATION.container} initial="hidden" animate="show">
            {education.map((edu, index) => (
              <EducationCard
                key={edu.id}
                education={edu}
                isLast={index === education.length - 1}
              />
            ))}
          </motion.div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
