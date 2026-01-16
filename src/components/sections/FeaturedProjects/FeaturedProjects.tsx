"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  AnimatedCard,
  AnimatedSection,
  CategoryWithYear,
  Container,
  ProjectHighlight,
  SectionHeader,
  TechTags,
} from "@/components/ui";
import { TProject } from "@/types";

type TProps = {
  projects: TProject[];
};

export function FeaturedProjects({ projects }: TProps) {
  const t = useTranslations("projects");

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <AnimatedSection className="space-y-6">
          <SectionHeader
            title={t("featuredTitle")}
            link={{ href: "/projects", label: t("viewAll") }}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, index) => (
              <AnimatedCard
                key={project.id}
                index={index}
                href={project.href || project.github}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <CategoryWithYear
                        category={project.category}
                        year={project.year}
                        size="sm"
                      />
                      <h3 className="font-medium text-sm">{project.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.github && (
                        <Github className="h-4 w-4 text-muted-foreground" />
                      )}
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs line-clamp-2">
                    {project.description}
                  </p>
                  {project.highlight && (
                    <ProjectHighlight highlight={project.highlight} />
                  )}
                  <TechTags
                    technologies={project.technologies}
                    limit={3}
                    size="sm"
                    className="pt-1"
                  />
                </div>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
