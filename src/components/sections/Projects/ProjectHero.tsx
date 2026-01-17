import { useTranslations } from "next-intl";

import { BackLink, TechTags } from "@/components/ui";
import { CategoryWithYear } from "@/components/ui/project";
import { TEXT_SIZE } from "@/constants";
import { cn } from "@/lib/utils";
import { TProjectDetailMeta } from "@/types";

type TProps = {
  project: TProjectDetailMeta;
};

export function ProjectHero({ project }: TProps) {
  const t = useTranslations("projects");

  return (
    <header className="space-y-6">
      <BackLink href="/projects">{t("backToProjects")}</BackLink>

      <div className="space-y-4">
        <CategoryWithYear category={project.category} year={project.year} />

        <h1 className={cn("font-semibold tracking-tight", TEXT_SIZE.title)}>{project.title}</h1>

        <p className="text-muted-foreground max-w-2xl">
          {project.longDescription || project.description}
        </p>

        <TechTags technologies={project.technologies} />
      </div>
    </header>
  );
}
