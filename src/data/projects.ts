import { TProject } from "@/types";

export const projects: TProject[] = [
  {
    id: "project-1",
    title: "Project One",
    description:
      "A brief description of your first project. Explain what problem it solves and what technologies you used.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    href: "https://project-one.com",
    github: "https://github.com/romanfrolov/project-one",
    featured: true,
  },
  {
    id: "project-2",
    title: "Project Two",
    description:
      "Description of your second project. Highlight the key features and your role in building it.",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
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
    github: "https://github.com/romanfrolov/project-three",
    featured: false,
  },
];
