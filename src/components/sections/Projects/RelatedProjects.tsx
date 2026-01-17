"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { TechTags } from "@/components/ui";
import { ARROW_HOVER, ICON_SIZE, TEXT_SIZE } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { TProject } from "@/types";

type TProps = {
  projects: TProject[];
};

export function RelatedProjects({ projects }: TProps) {
  const t = useTranslations("projects");

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-muted">
      <h2 className={cn("font-semibold tracking-tight mb-6", TEXT_SIZE.heading)}>
        {t("relatedProjects")}
      </h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}` as "/projects"}
            className={cn(
              "group flex items-center justify-between gap-4 p-4 -mx-4 rounded-lg",
              "hover:bg-muted/50 transition-colors cursor-pointer"
            )}
          >
            <div className="space-y-2 min-w-0">
              <h3 className="font-medium group-hover:text-foreground/80 transition-colors truncate">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
              <TechTags technologies={project.technologies} limit={3} size="sm" />
            </div>
            <ArrowRight
              className={cn(ICON_SIZE.sm, "shrink-0 text-muted-foreground", ARROW_HOVER.right)}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
