import { Code } from "lucide-react";
import {
  siReact,
  siTypescript,
  siNextdotjs,
  siTailwindcss,
  siNodedotjs,
  siGraphql,
  siFramer,
  siGit,
  siDocker,
  siFigma,
  siJest,
  siVite,
  siRedux,
  siBun,
  siGithub,
} from "simple-icons";

const ICONS: Record<string, { path: string }> = {
  react: siReact,
  typescript: siTypescript,
  nextdotjs: siNextdotjs,
  tailwindcss: siTailwindcss,
  nodedotjs: siNodedotjs,
  graphql: siGraphql,
  framer: siFramer,
  git: siGit,
  docker: siDocker,
  figma: siFigma,
  jest: siJest,
  vite: siVite,
  redux: siRedux,
  bun: siBun,
  github: siGithub,
};

const ICON_LABELS: Record<string, string> = {
  react: "React",
  typescript: "TypeScript",
  nextdotjs: "Next.js",
  tailwindcss: "Tailwind CSS",
  nodedotjs: "Node.js",
  graphql: "GraphQL",
  framer: "Framer Motion",
  git: "Git",
  docker: "Docker",
  figma: "Figma",
  jest: "Jest",
  vite: "Vite",
  redux: "Redux",
  bun: "Bun",
  github: "GitHub",
};

type TTechIconProps = {
  slug: string;
  className?: string;
};

export function TechIcon({ slug, className }: TTechIconProps) {
  const icon = ICONS[slug];
  const label = ICON_LABELS[slug] || slug;

  if (!icon) {
    return <Code className={className} aria-label={label} />;
  }

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <title>{label}</title>
      <path d={icon.path} />
    </svg>
  );
}
