"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { TechTags } from "@/components/ui";
import { cn } from "@/lib/utils";
import { TExperience } from "@/types";

import { EXPERIENCE_ANIMATION } from "../constants";
import { LiveIndicator } from "./LiveIndicator";

type TExperienceCardProps = {
  experience: TExperience;
  isLast?: boolean;
};

export function ExperienceCard({ experience, isLast }: TExperienceCardProps) {
  const isCurrentPosition = experience.isCurrent ?? false;
  const hasHighlights = experience.highlights && experience.highlights.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={EXPERIENCE_ANIMATION.item}
      className={cn("relative pl-6", isLast ? "pb-0" : "pb-8")}
    >
      <LiveIndicator isLive={isCurrentPosition} />
      <div className="absolute left-[3px] top-4 bottom-0 w-px bg-muted last:hidden" />

      <div className="space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="font-medium text-sm">{experience.position}</h3>
          <span className="text-xs text-muted-foreground">
            {experience.startDate} — {experience.endDate}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {experience.company} · {experience.location}
        </p>

        <p className="text-xs text-muted-foreground pt-1">{experience.description}</p>

        <TechTags technologies={experience.technologies} limit={4} size="sm" className="pt-2" />

        {hasHighlights && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 pt-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              />
              <span>{isExpanded ? "Less" : "Key achievements"}</span>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden space-y-1 pt-1"
                >
                  {experience.highlights!.map((highlight, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
}
