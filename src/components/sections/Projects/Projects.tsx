"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Container, SectionHeader } from "@/components/ui";
import { CATEGORY_FILTER_OPTIONS, FADE_IN, FADE_IN_TRANSITION } from "@/constants";
import { cn } from "@/lib/utils";
import { TProject, TProjectCategory } from "@/types";

import { ProjectCard } from "./ProjectCard";

type TProps = {
  projects: TProject[];
};

export function Projects({ projects }: TProps) {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<TProjectCategory | "all">("all");

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  const [firstProject, ...restProjects] = filteredProjects;

  return (
    <section className="min-h-[calc(100vh-4rem)] py-12 lg:py-16">
      <Container>
        <motion.div
          {...FADE_IN}
          transition={FADE_IN_TRANSITION}
          className="space-y-12"
        >
          <div className="space-y-6">
            <SectionHeader
              title={t("title")}
              description={t("description")}
              as="h1"
            />

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
