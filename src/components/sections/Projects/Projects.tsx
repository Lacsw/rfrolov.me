"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { AnimatedSection, Container, EmptyState, SectionHeader } from "@/components/ui";
import { CATEGORY_FILTER_OPTIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { TProject, TProjectCategory } from "@/types";

import { ProjectCard } from "./ProjectCard";

type TProps = {
  projects: TProject[];
  projectsWithDetails?: string[];
};

export function Projects({ projects, projectsWithDetails = [] }: TProps) {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<TProjectCategory | "all">("all");

  const detailIds = new Set(projectsWithDetails);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const [firstProject, ...restProjects] = filteredProjects;

  const showFilterCount = filter !== "all" && filteredProjects.length !== projects.length;

  return (
    <section className="min-h-[calc(100vh-4rem)] py-12 lg:py-16">
      <Container>
        <AnimatedSection className="space-y-12">
          <div className="space-y-6">
            <SectionHeader title={t("title")} description={t("description")} as="h1" />

            <div className="flex flex-wrap items-center gap-2">
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
              {showFilterCount && (
                <span className="text-xs text-muted-foreground ml-2">
                  {t("showingCount", { count: filteredProjects.length, total: projects.length })}
                </span>
              )}
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {firstProject && (
                <ProjectCard
                  project={firstProject}
                  index={0}
                  large
                  hasDetail={detailIds.has(firstProject.id)}
                />
              )}
              {restProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + 1}
                  hasDetail={detailIds.has(project.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={t("noProjectsFound")}
              description={t("tryDifferentFilter")}
              variant="filter"
            />
          )}
        </AnimatedSection>
      </Container>
    </section>
  );
}
