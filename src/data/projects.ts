import { TProject } from "@/types";

export const projects: TProject[] = [
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "Modern developer portfolio built with Next.js 15 and Tailwind CSS v4. Features smooth animations, dark mode, and a creative 404 page with terminal emulation.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: 2025,
    category: "personal",
    highlight: "You're looking at it",
    href: "https://rfrolov.me",
    github: "https://github.com/Lacsw/rfrolov.me",
    featured: true,
  },
  {
    id: "project-2",
    title: "Project Two",
    description:
      "Description of your second project. Highlight the key features and your role in building it.",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    year: 2024,
    category: "work",
    highlight: "Replace with your project",
    href: "https://project-two.com",
    github: "https://github.com/romanfrolov/project-two",
    featured: true,
  },
  {
    id: "project-3",
    title: "Project Three",
    description:
      "Another project showcasing your skills. Focus on the impact and technical challenges overcome.",
    technologies: ["Vue.js", "GraphQL", "AWS"],
    year: 2023,
    category: "opensource",
    github: "https://github.com/romanfrolov/project-three",
    featured: false,
  },
];
