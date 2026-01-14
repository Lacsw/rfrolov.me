"use client";

import { Badge } from "@/components/ui/Badge";
import { ProjectHighlight } from "@/components/ui/ProjectHighlight";
import { ProjectLinks } from "@/components/ui/ProjectLinks";
import { CategoryWithYear } from "@/components/ui/CategoryWithYear";
import { TechTags } from "@/components/ui/TechTags";
import { FADE_IN, getFadeInTransition } from "@/constants/animations";
import { cn } from "@/lib/utils";
import { TProject } from "@/types";
import { motion } from "framer-motion";

type TProjectCardProps = {
  project: TProject;
  index: number;
  large?: boolean;
};

export function ProjectCard({ project, index, large = false }: TProjectCardProps) {
  return (
    <motion.div
      {...FADE_IN}
      transition={getFadeInTransition(index)}
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
                {project.featured && <Badge>Featured</Badge>}
                <CategoryWithYear category={project.category} year={project.year} />
              </div>
              <h3 className={cn("font-medium", large && "text-lg")}>{project.title}</h3>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>

          {project.highlight && (
            <ProjectHighlight highlight={project.highlight} />
          )}
        </div>

        <div className={cn("flex flex-col gap-3", large && "md:items-end md:justify-between")}>
          <TechTags
            technologies={project.technologies}
            className={cn("gap-2", large && "md:flex-col md:items-end md:gap-1.5")}
          />
          <ProjectLinks href={project.href} github={project.github} />
        </div>
      </div>
    </motion.div>
  );
}
