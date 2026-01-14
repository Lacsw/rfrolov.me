"use client";

import { TechIcon } from "@/components/ui/TechIcon";
import { SKILLS } from "../constants";

export function SkillsGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
      {SKILLS.map((skill) => (
        <div
          key={skill.name}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-default"
        >
          <TechIcon slug={skill.icon} className="h-3.5 w-3.5" />
          <span className="text-xs">{skill.name}</span>
        </div>
      ))}
    </div>
  );
}
