import { TProject } from "@/types";

export const projects: TProject[] = [
  {
    id: "portfolio",
    title: "Persönliches Portfolio",
    description:
      "Modernes Entwickler-Portfolio erstellt mit Next.js 15 und Tailwind CSS v4. Mit flüssigen Animationen, Dark Mode und einer kreativen 404-Seite mit Terminal-Emulation.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: 2025,
    category: "personal",
    highlight: "Du siehst es gerade",
    github: "https://github.com/Lacsw/rfrolov.me",
    featured: true,
  },
  {
    id: "project-2",
    title: "Projekt Zwei",
    description:
      "Beschreibung deines zweiten Projekts. Hebe die wichtigsten Funktionen und deine Rolle beim Aufbau hervor.",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    year: 2024,
    category: "work",
    highlight: "Ersetze mit deinem Projekt",
    href: "https://project-two.com",
    github: "https://github.com/romanfrolov/project-two",
    featured: true,
  },
  {
    id: "project-3",
    title: "Projekt Drei",
    description:
      "Ein weiteres Projekt, das deine Fähigkeiten zeigt. Fokus auf die Wirkung und überwundene technische Herausforderungen.",
    technologies: ["Vue.js", "GraphQL", "AWS"],
    year: 2023,
    category: "opensource",
    github: "https://github.com/romanfrolov/project-three",
    featured: false,
  },
];
