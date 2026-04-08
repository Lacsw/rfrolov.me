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

  const careerYears = Math.floor(
    (Date.now() - new Date("2018-12-01").getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  return (
    <section className="py-8 lg:py-10">
      <Container>
        <AnimatedSection className="space-y-6">
          <div className="space-y-2">
            <SectionHeader title={t("title")} />
            <p className="text-xs text-muted-foreground">
              {t("careerSummary", { years: careerYears, roles: experiences.length })}
            </p>
          </div>

          <motion.div variants={EXPERIENCE_ANIMATION.container} initial="hidden" animate="show">
            {experiences.map((exp, index) => (
              <div key={exp.id}>
                {exp.transition && (
                  <div className="relative pl-6 pb-4">
                    <div className="absolute left-[3px] top-0 bottom-0 w-px bg-muted" />
                    <p className="text-xs italic text-muted-foreground/60 pl-2 border-l border-muted-foreground/20">
                      {exp.transition}
                    </p>
                  </div>
                )}
                <ExperienceCard
                  experience={exp}
                  isLast={index === experiences.length - 1}
                />
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
