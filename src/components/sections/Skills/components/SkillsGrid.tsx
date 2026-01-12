"use client";

import { motion } from "framer-motion";
import { SKILLS_CONTENT, SKILLS, SKILLS_ANIMATION } from "../constants";
import { SkillCard } from "./SkillCard";

export function SkillsGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">
          {SKILLS_CONTENT.title}
        </h2>
        <p className="text-sm text-muted-foreground">{SKILLS_CONTENT.subtitle}</p>
      </div>

      <motion.div
        variants={SKILLS_ANIMATION.container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-2"
      >
        {SKILLS.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </motion.div>
    </motion.div>
  );
}
