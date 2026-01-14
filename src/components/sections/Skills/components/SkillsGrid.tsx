"use client";

import { motion } from "framer-motion";
import { SKILLS, SKILLS_ANIMATION } from "../constants";
import { SkillCard } from "./SkillCard";

export function SkillsGrid() {
  return (
    <motion.div
      variants={SKILLS_ANIMATION.container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap justify-center gap-3"
    >
      {SKILLS.map((skill) => (
        <SkillCard key={skill.name} skill={skill} />
      ))}
    </motion.div>
  );
}
