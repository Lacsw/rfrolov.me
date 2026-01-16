"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection, Container } from "@/components/ui";
import { HOVER_OPACITY, ICON_SIZE, SPACING, TRANSITION } from "@/constants";
import { useToggle } from "@/hooks";
import { cn } from "@/lib/utils";
import { TExperience } from "@/types";

import { ExperienceCard } from "./components";
import { EXPERIENCE_ANIMATION } from "./constants";

const VISIBLE_COUNT = 3;

type TProps = {
  experiences: TExperience[];
};

export function Experience({ experiences }: TProps) {
  const t = useTranslations("experience");
  const [isExpanded, { toggle }] = useToggle();

  const initialExperiences = experiences.slice(0, VISIBLE_COUNT);
  const hiddenExperiences = experiences.slice(VISIBLE_COUNT);
  const hasMore = experiences.length > VISIBLE_COUNT;

  return (
    <section className={SPACING.section}>
      <Container>
        <AnimatedSection className="space-y-6">
          <h2 className="text-lg font-semibold tracking-tight">{t("title")}</h2>

          <div>
            <motion.div variants={EXPERIENCE_ANIMATION.container} initial="hidden" animate="show">
              {initialExperiences.map((exp, index) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  isLast={!isExpanded && index === initialExperiences.length - 1}
                />
              ))}
            </motion.div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {hiddenExperiences.map((exp, index) => (
                    <ExperienceCard
                      key={exp.id}
                      experience={exp}
                      isLast={index === hiddenExperiences.length - 1}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {hasMore && (
            <button
              onClick={toggle}
              className={cn("flex items-center gap-1 text-sm text-muted-foreground", HOVER_OPACITY)}
            >
              <span>
                {isExpanded ? t("showLess") : t("showMore", { count: hiddenExperiences.length })}
              </span>
              <ChevronDown
                className={cn(
                  ICON_SIZE.sm,
                  "transition-transform",
                  TRANSITION.normal,
                  isExpanded && "rotate-180"
                )}
              />
            </button>
          )}
        </AnimatedSection>
      </Container>
    </section>
  );
}
