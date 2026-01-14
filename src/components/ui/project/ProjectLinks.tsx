import { ArrowUpRight, Github } from "lucide-react";

import { ExternalLink } from "../ExternalLink";

type TProjectLinksProps = {
  href?: string;
  github?: string;
};

export function ProjectLinks({ href, github }: TProjectLinksProps) {
  if (!href && !github) {return null;}

  return (
    <div className="flex items-center gap-2 pt-2">
      {href && (
        <ExternalLink
          href={href}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-foreground text-background hover:opacity-80 transition-opacity"
        >
          Live
          <ArrowUpRight className="h-3 w-3" />
        </ExternalLink>
      )}
      {github && (
        <ExternalLink
          href={github}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-muted-foreground/30 text-foreground hover:opacity-80 transition-opacity"
        >
          <Github className="h-3 w-3" />
          GitHub
        </ExternalLink>
      )}
    </div>
  );
}
