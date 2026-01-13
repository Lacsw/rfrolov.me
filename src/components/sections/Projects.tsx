"use client";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { TProject, TProjectCategory } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";

const CATEGORY_LABELS: Record<TProjectCategory, string> = {
  personal: "Personal",
  work: "Work",
  opensource: "Open Source",
};

const CATEGORY_COLORS: Record<TProjectCategory, string> = {
  personal: "bg-emerald-500/10 text-emerald-600",
  work: "bg-blue-500/10 text-blue-600",
  opensource: "bg-purple-500/10 text-purple-600",
};

const FILTER_OPTIONS: { value: TProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "personal", label: "Personal" },
  { value: "work", label: "Work" },
  { value: "opensource", label: "Open Source" },
];

function ProjectCard({ project, index, large = false }: { project: TProject; index: number; large?: boolean }) {
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

export function Projects() {
  const [filter, setFilter] = useState<TProjectCategory | "all">("all");

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  const [firstProject, ...restProjects] = filteredProjects;

  return (
    <section className="min-h-[calc(100vh-4rem)] py-12 lg:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
              <p className="text-muted-foreground text-sm mt-2">
                A collection of things I&apos;ve built
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all",
                    filter === option.value
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:opacity-70"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {firstProject && (
              <ProjectCard project={firstProject} index={0} large />
            )}
            {restProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index + 1}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
