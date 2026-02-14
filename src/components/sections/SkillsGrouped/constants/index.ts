import { ANIMATION_DURATION, createStaggerAnimation } from "@/constants";
import { TSkillCategory } from "@/types";

export const SKILL_CATEGORIES: TSkillCategory[] = [
  {
    key: "frontend",
    skills: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "Next.js", icon: "nextdotjs", color: "hsl(var(--foreground))" },
      { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
      { name: "Redux", icon: "redux", color: "#764ABC" },
      { name: "Framer Motion", icon: "framer", color: "#0055FF" },
    ],
  },
  {
    key: "backend",
    skills: [
      { name: "Node.js", icon: "nodedotjs", color: "#339933" },
      { name: "GraphQL", icon: "graphql", color: "#E10098" },
    ],
  },
  {
    key: "tools",
    skills: [
      { name: "Git", icon: "git", color: "#F05032" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "GitHub", icon: "github", color: "hsl(var(--foreground))" },
      { name: "Jest", icon: "jest", color: "#C21325" },
      { name: "Vite", icon: "vite", color: "#646CFF" },
      { name: "Bun", icon: "bun", color: "hsl(var(--foreground))" },
      { name: "Figma", icon: "figma", color: "#F24E1E" },
    ],
  },
];

export const SKILLS_GROUPED_ANIMATION = createStaggerAnimation({
  staggerChildren: 0.04,
  offset: 10,
  duration: ANIMATION_DURATION.normal,
});
