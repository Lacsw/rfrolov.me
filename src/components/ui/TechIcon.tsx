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

type TTechIconProps = {
  slug: string;
  className?: string;
};

export function TechIcon({ slug, className }: TTechIconProps) {
  const icon = ICONS[slug];

  if (!icon) {
    return <div className={className} />;
  }

  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}
