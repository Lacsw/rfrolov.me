"use client";

import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { TProject, TProjectCategory } from "@/types";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const CATEGORY_LABELS: Record<TProjectCategory, string> = {
  personal: "Personal",
  work: "Work",
  opensource: "Open Source",
};

function ProjectCard({ project, index, large = false }: { project: TProject; index: number; large?: boolean }) {
  return (
    <motion.a
      href={project.href || project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group block rounded-lg border bg-background p-6 cursor-pointer transition-all duration-300 hover:shadow-sm ${
        large ? "md:col-span-2" : ""
      } ${project.featured ? "border-muted-foreground/30 hover:border-muted-foreground/50" : "border-muted hover:border-muted-foreground/20"}`}
    >
      <div className={`flex flex-col h-full ${large ? "md:flex-row md:gap-8" : "gap-3"}`}>
        <div className={`flex-1 space-y-3 ${large ? "md:space-y-4" : ""}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                {project.featured && (
                  <span className="text-xs text-foreground bg-foreground/10 px-2 py-0.5 rounded font-medium">
                    Featured
                  </span>
                )}
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {CATEGORY_LABELS[project.category]}
                </span>
                <span className="text-xs text-muted-foreground">{project.year}</span>
              </div>
              <h3 className={`font-medium ${large ? "text-lg" : ""}`}>{project.title}</h3>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {project.github && (
                <Github className="h-4 w-4 text-muted-foreground" />
              )}
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          <p className={`text-muted-foreground ${large ? "text-sm" : "text-sm"}`}>
            {project.description}
          </p>

          {project.highlight && (
            <p className="text-xs text-foreground/80 font-medium">
              ✦ {project.highlight}
            </p>
          )}
        </div>

        <div className={`flex flex-wrap gap-2 ${large ? "md:flex-col md:items-end md:justify-end md:gap-1.5" : "pt-2"}`}>
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export function Projects() {
  const [firstProject, ...restProjects] = projects;

  return (
    <section className="min-h-[calc(100vh-4rem)] py-20 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
            <p className="text-muted-foreground text-sm mt-2">
              A collection of things I&apos;ve built
            </p>
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
