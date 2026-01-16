"use client";

import { motion } from "framer-motion";

import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import { TExperience } from "@/types";

import { EXPERIENCE_ANIMATION } from "../constants";

type TExperienceCardProps = {
  experience: TExperience;
  isLast?: boolean;
};

export function ExperienceCard({ experience, isLast }: TExperienceCardProps) {
  const isCurrentPosition = experience.endDate === "Present";

  return (
    <motion.div variants={EXPERIENCE_ANIMATION.item} className={cn("relative pl-6", isLast ? "pb-0" : "pb-8")}>
      {isCurrentPosition ? (
        <span className="absolute left-0 top-1.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      ) : (
        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-muted-foreground" />
      )}
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

        <div className="flex flex-wrap gap-1.5 pt-2">
          {experience.technologies.slice(0, 4).map((tech) => (
            <Tag key={tech} size="sm">
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
