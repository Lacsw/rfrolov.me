"use client";

import { TechIcon } from "@/components/ui";

import { SKILLS } from "../Skills/constants";

export function SkillsMarquee() {
  // Duplicate the list so the CSS animation can loop seamlessly (translate -50%)
  const doubled = [...SKILLS, ...SKILLS];

  return (
    <section
      aria-label="Tech stack"
      className="group relative overflow-hidden border-y border-muted/60 py-5"
    >
      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent"
      />

      <div className="flex w-max animate-marquee gap-x-10">
        {doubled.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex shrink-0 items-center gap-2 text-muted-foreground"
            style={{ "--skill-color": skill.color } as React.CSSProperties}
          >
            <TechIcon
              slug={skill.icon}
              className="h-4 w-4 opacity-60 transition-all duration-200 [color:var(--skill-color)] group-hover:opacity-100"
            />
            <span className="text-xs transition-colors duration-200 group-hover:[color:var(--skill-color)]">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
