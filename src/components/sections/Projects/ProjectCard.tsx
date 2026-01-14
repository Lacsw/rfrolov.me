"use client";

import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { TProject } from "@/types";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

type TProjectCardProps = {
  project: TProject;
  index: number;
  large?: boolean;
};

export function ProjectCard({ project, index, large = false }: TProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "group rounded-lg border bg-background p-6 transition-all duration-300 hover:shadow-sm hover:scale-[1.01]",
        large && "md:col-span-2",
        project.featured
          ? "border-muted-foreground/30 hover:border-muted-foreground/50"
          : "border-muted hover:border-muted-foreground/20"
      )}
    >
      <div className={cn("flex flex-col h-full", large ? "md:flex-row md:gap-8" : "gap-3")}>
        <div className={cn("flex-1 space-y-3", large && "md:space-y-4")}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                {project.featured && (
                  <span className="text-xs text-foreground bg-foreground/10 px-2 py-0.5 rounded font-medium">
                    Featured
                  </span>
                )}
                <span className={cn("text-xs px-2 py-0.5 rounded", CATEGORY_COLORS[project.category])}>
                  {CATEGORY_LABELS[project.category]}
                </span>
                <span className="text-xs text-muted-foreground">{project.year}</span>
              </div>
              <h3 className={cn("font-medium", large && "text-lg")}>{project.title}</h3>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>

          {project.highlight && (
            <p className="text-xs text-foreground/80 font-medium">
              ✦ {project.highlight}
            </p>
          )}
        </div>

        <div className={cn("flex flex-col gap-3", large && "md:items-end md:justify-between")}>
          <div className={cn("flex flex-wrap gap-2", large && "md:flex-col md:items-end md:gap-1.5")}>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-foreground text-background cursor-pointer hover:opacity-80 transition-opacity"
              >
                Live
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-muted-foreground/30 text-foreground cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Github className="h-3 w-3" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
