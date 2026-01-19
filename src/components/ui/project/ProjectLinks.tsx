import { ArrowRight, ArrowUpRight, GithubIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ICON_SIZE } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { LinkButton } from "../LinkButton";

type TProjectLinksProps = {
  href?: string;
  github?: string;
  detailHref?: string;
};

export function ProjectLinks({ href, github, detailHref }: TProjectLinksProps) {
  const t = useTranslations("projects");

  if (!href && !github && !detailHref) return null;

  return (
    <div className="flex items-center gap-2 pt-2">
      {detailHref && (
        <Link
          href={detailHref as "/projects"}
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md",
            "bg-foreground text-background hover:opacity-80 transition-opacity cursor-pointer"
          )}
        >
          {t("readCaseStudy")}
          <ArrowRight className={ICON_SIZE.xs} />
        </Link>
      )}
      {href && (
        <LinkButton href={href} variant={detailHref ? "outline" : "solid"}>
          {t("live")}
          <ArrowUpRight className={ICON_SIZE.xs} />
        </LinkButton>
      )}
      {github && (
        <LinkButton href={github} variant="outline">
          <GithubIcon className={ICON_SIZE.xs} />
          {t("github")}
        </LinkButton>
      )}
    </div>
  );
}
