"use client";

import { Container } from "@/components/ui/Container";
import { CATEGORY_FILTER_OPTIONS } from "@/constants/categories";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { TProjectCategory } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";

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
              {CATEGORY_FILTER_OPTIONS.map((option) => (
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
