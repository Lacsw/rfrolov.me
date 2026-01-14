"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui";
import { experiences } from "@/data/experience";
import { useToggle } from "@/hooks";
import { cn } from "@/lib/utils";

import { ExperienceCard } from "./components";
import { EXPERIENCE_ANIMATION } from "./constants";

const VISIBLE_COUNT = 3;
const initialExperiences = experiences.slice(0, VISIBLE_COUNT);
const hiddenExperiences = experiences.slice(VISIBLE_COUNT);

export function Experience() {
  const [isExpanded, { toggle }] = useToggle();
  const hasMore = experiences.length > VISIBLE_COUNT;

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-lg font-semibold tracking-tight">Experience</h2>

          <div>
            <motion.div
              variants={EXPERIENCE_ANIMATION.container}
              initial="hidden"
              animate="show"
            >
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
              className="flex items-center gap-1 text-sm text-muted-foreground hover:opacity-70 transition-opacity cursor-pointer"
            >
              <span>{isExpanded ? "Show less" : `Show ${hiddenExperiences.length} more`}</span>
              <ChevronDown
                className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180")}
              />
            </button>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
