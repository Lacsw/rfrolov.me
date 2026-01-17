import { ExternalLink, Github } from "lucide-react";
import { useTranslations } from "next-intl";

import { EXTERNAL_LINK_PROPS, HOVER_OPACITY, ICON_SIZE, TEXT_SIZE } from "@/constants";
import { cn } from "@/lib/utils";
import { TProjectDetailMeta } from "@/types";

type TProps = {
  project: TProjectDetailMeta;
};

type TMetaItemProps = {
  label: string;
  value: string;
};

function MetaItem({ label, value }: TMetaItemProps) {
  return (
    <div className="space-y-1">
      <dt className={cn("text-muted-foreground", TEXT_SIZE.label)}>{label}</dt>
      <dd className={TEXT_SIZE.body}>{value}</dd>
    </div>
  );
}

export function ProjectMeta({ project }: TProps) {
  const t = useTranslations("projects");

  const hasMetadata = project.role || project.duration || project.team;
  const hasLinks = project.href || project.github;

  if (!hasMetadata && !hasLinks) {
    return null;
  }

  return (
    <aside className="space-y-6">
      {hasMetadata && (
        <dl className="space-y-4">
          {project.role && <MetaItem label={t("role")} value={project.role} />}
          {project.duration && <MetaItem label={t("duration")} value={project.duration} />}
          {project.team && <MetaItem label={t("team")} value={project.team} />}
        </dl>
      )}

      {hasLinks && (
        <div className="flex flex-col gap-3">
          {project.href && (
            <a
              href={project.href}
              {...EXTERNAL_LINK_PROPS}
              className={cn(
                "inline-flex items-center gap-2",
                TEXT_SIZE.body,
                HOVER_OPACITY
              )}
            >
              <ExternalLink className={ICON_SIZE.sm} />
              {t("viewLive")}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              {...EXTERNAL_LINK_PROPS}
              className={cn(
                "inline-flex items-center gap-2",
                TEXT_SIZE.body,
                HOVER_OPACITY
              )}
            >
              <Github className={ICON_SIZE.sm} />
              {t("viewSource")}
            </a>
          )}
        </div>
      )}
    </aside>
  );
}
