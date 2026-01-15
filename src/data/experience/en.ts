import { TExperience } from "@/types";

export const experiences: TExperience[] = [
  {
    id: "purpose-green",
    company: "Purpose Green",
    position: "Frontend Developer",
    startDate: "Jul 2025",
    endDate: "Present",
    location: "Berlin, Germany",
    description:
      "Building the Green+ portal and interactive tools for real estate ESG management. Developing energy assessment calculators and portfolio dashboards that help property owners reduce refurbishment costs by up to 35%.",
    technologies: ["React", "TypeScript", "Next.js"],
  },
  {
    id: "happy-numbers",
    company: "Happy Numbers",
    position: "JavaScript Developer",
    startDate: "Nov 2023",
    endDate: "Jun 2025",
    location: "Remote",
    description:
      "Built interactive math learning experiences for a platform serving 2M+ students. Designed game mechanics enabling educators to create personalized adaptive content. Maintained codebase, wrote tests, and onboarded team members.",
    technologies: ["JavaScript", "TypeScript", "React", "Figma"],
  },
  {
    id: "designforall",
    company: "DesignForAll",
    position: "Frontend Developer",
    startDate: "Dec 2022",
    endDate: "Oct 2023",
    location: "Remote",
    description:
      "Built a design knowledge base web app from scratch. Architected frontend using Feature-Sliced Design methodology, implemented state management, and configured build tooling.",
    technologies: ["React", "TypeScript", "SCSS", "React Query", "Redux", "Vite"],
  },
  {
    id: "ciogd",
    company: "SPb GKU CIOGD",
    position: "Information Security Specialist",
    startDate: "Apr 2021",
    endDate: "Oct 2022",
    location: "St Petersburg, Russia",
    description:
      "Managed enterprise security infrastructure: DLP systems, firewalls (Cisco ASA), and cryptographic gateways. Built an internal certificate management web app with Django that streamlined digital signature workflows.",
    technologies: ["Python", "Django", "PostgreSQL", "Docker", "Nginx"],
  },
  {
    id: "er-telecom",
    company: "ER-Telecom",
    position: "Senior Technical Support Engineer",
    startDate: "Dec 2018",
    endDate: "Mar 2021",
    location: "St Petersburg, Russia",
    description:
      "Supported enterprise clients at Russia's second-largest broadband provider. Diagnosed complex network issues across L2-L3 VPN infrastructure, configured routing protocols, and built a knowledge base that became the team's training standard.",
    technologies: ["Networking", "OSPF", "BGP", "MPLS", "Bash"],
  },
];
