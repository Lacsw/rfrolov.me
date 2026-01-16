import { ArrowUpRight, Github } from "lucide-react";

import { ICON_SIZE } from "@/constants";

import { LinkButton } from "../LinkButton";

type TProjectLinksProps = {
  href?: string;
  github?: string;
};

export function ProjectLinks({ href, github }: TProjectLinksProps) {
  if (!href && !github) return null;

  return (
    <div className="flex items-center gap-2 pt-2">
      {href && (
        <LinkButton href={href}>
          Live
          <ArrowUpRight className={ICON_SIZE.xs} />
        </LinkButton>
      )}
      {github && (
        <LinkButton href={github} variant="outline">
          <Github className={ICON_SIZE.xs} />
          GitHub
        </LinkButton>
      )}
    </div>
  );
}
