"use client";

import { motion } from "framer-motion";

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
      </div>
    </motion.div>
  );
}
