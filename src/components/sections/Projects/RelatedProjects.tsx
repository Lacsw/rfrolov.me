"use client";

import { useTranslations } from "next-intl";

import { RelatedItemsList, TechTags } from "@/components/ui";
import { TProject } from "@/types";

type TProps = {
  projects: TProject[];
};

export function RelatedProjects({ projects }: TProps) {
  const t = useTranslations("projects");

  return (
    <RelatedItemsList
      items={projects}
      title={t("relatedProjects")}
      getKey={(project) => project.id}
      getHref={(project) => `/projects/${project.id}`}
      renderTags={(project) => <TechTags technologies={project.technologies} limit={3} size="sm" />}
    />
  );
}
