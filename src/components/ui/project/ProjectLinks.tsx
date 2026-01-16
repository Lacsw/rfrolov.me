import { ArrowUpRight, Github } from "lucide-react";

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
          <ArrowUpRight className="h-3 w-3" />
        </LinkButton>
      )}
      {github && (
        <LinkButton href={github} variant="outline">
          <Github className="h-3 w-3" />
          GitHub
        </LinkButton>
      )}
    </div>
  );
}
