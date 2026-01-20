import { ANIMATION_DURATION, createStaggerAnimation } from "@/constants";
import { TSkill } from "@/types";

export const SKILLS: TSkill[] = [
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "GraphQL", icon: "graphql" },
  { name: "Framer Motion", icon: "framer" },
  { name: "Figma", icon: "figma" },
  { name: "Git", icon: "git" },
  { name: "Docker", icon: "docker" },
  { name: "GitHub", icon: "github" },
  { name: "Jest", icon: "jest" },
  { name: "Vite", icon: "vite" },
  { name: "Redux", icon: "redux" },
  { name: "Bun", icon: "bun" },
];

export const SKILLS_ANIMATION = createStaggerAnimation({
  staggerChildren: 0.04,
  offset: 10,
  duration: ANIMATION_DURATION.normal,
});
