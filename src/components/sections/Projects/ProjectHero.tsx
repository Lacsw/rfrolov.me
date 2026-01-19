import { ExternalLink, GithubIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { BackLink, TechTags } from "@/components/ui";
import { CategoryWithYear } from "@/components/ui/project";
import { EXTERNAL_LINK_PROPS, HOVER_OPACITY, ICON_SIZE, TEXT_SIZE } from "@/constants";
import { cn } from "@/lib/utils";
import { TProjectDetailMeta } from "@/types";

type TProps = {
  project: TProjectDetailMeta;
};

export function ProjectHero({ project }: TProps) {
  const t = useTranslations("projects");
  const hasLinks = project.href || project.github;

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

        {hasLinks && (
          <div className="flex items-center gap-4 pt-2 lg:hidden">
            {project.href && (
              <a
                href={project.href}
                {...EXTERNAL_LINK_PROPS}
                aria-label={`${t("viewLive")} - ${project.title} (opens in new tab)`}
                className={cn("inline-flex items-center gap-2", TEXT_SIZE.body, HOVER_OPACITY)}
              >
                <ExternalLink className={ICON_SIZE.sm} aria-hidden="true" />
                {t("viewLive")}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                {...EXTERNAL_LINK_PROPS}
                aria-label={`${t("viewSource")} - ${project.title} (opens in new tab)`}
                className={cn("inline-flex items-center gap-2", TEXT_SIZE.body, HOVER_OPACITY)}
              >
                <GithubIcon className={ICON_SIZE.sm} aria-hidden="true" />
                {t("viewSource")}
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
