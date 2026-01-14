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

export const SKILLS_ANIMATION = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  },
} as const;
