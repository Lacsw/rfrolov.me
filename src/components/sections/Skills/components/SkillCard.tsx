"use client";

import { motion } from "framer-motion";
import { TSkill } from "@/types";
import { TechIcon } from "@/components/ui/TechIcon";
import { SKILLS_ANIMATION } from "../constants";

type TSkillCardProps = {
  skill: TSkill;
};

export function SkillCard({ skill }: TSkillCardProps) {
  return (
    <motion.div
      variants={SKILLS_ANIMATION.item}
      className="flex flex-col items-center gap-2 p-4 rounded-lg
                 border border-transparent hover:border-muted
                 hover:bg-muted/50 transition-all duration-300
                 group cursor-default"
    >
      <TechIcon
        slug={skill.icon}
        className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors"
      />
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
        {skill.name}
      </span>
    </motion.div>
  );
}
