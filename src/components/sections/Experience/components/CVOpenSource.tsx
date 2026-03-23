import { ArrowUpRight, Github } from "lucide-react";
import { useTranslations } from "next-intl";

import { EXTERNAL_LINK_PROPS } from "@/constants";
import { openSourceProjects } from "@/data/open-source";
import { cn } from "@/lib/utils";

export function CVOpenSource() {
  const t = useTranslations("experiencePage.openSource");

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground">{t("title")}</h2>
      <div className="space-y-4">
        {openSourceProjects.map((project) => (
          <div key={project.id} className="space-y-1">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
                <p className="text-xs text-muted-foreground/60">{project.tech}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {project.url !== project.repoUrl && (
                  <a
                    href={project.url}
                    {...EXTERNAL_LINK_PROPS}
                    className={cn("text-muted-foreground hover:text-foreground transition-colors")}
                    aria-label={`${project.name} live site`}
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                <a
                  href={project.repoUrl}
                  {...EXTERNAL_LINK_PROPS}
                  className={cn("text-muted-foreground hover:text-foreground transition-colors")}
                  aria-label={`${project.name} repository`}
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
