import { TExperience } from "@/types";

export const experiences: TExperience[] = [
  {
    id: "purpose-green",
    company: "Purpose Green",
    position: "Software Engineer",
    startDate: "Jul 2025",
    endDate: "Present",
    location: "Berlin, Germany",
    description:
      "Building the Green+ portal — interactive tools for real estate ESG management. Energy assessment calculators and portfolio dashboards that help property owners cut refurbishment costs by up to 35%.",
    technologies: ["React", "TypeScript", "Next.js"],
    isCurrent: true,
  },
  {
    id: "happy-numbers",
    company: "Happy Numbers",
    position: "Software Engineer",
    startDate: "Nov 2023",
    endDate: "Jun 2025",
    location: "Remote",
    description:
      "Built interactive math learning experiences for 2M+ students. Designed adaptive game mechanics that let educators create personalized content. Maintained test coverage and onboarded new engineers.",
    technologies: ["JavaScript", "TypeScript", "React", "Figma"],
  },
  {
    id: "designforall",
    company: "DesignForAll",
    position: "Software Engineer",
    startDate: "Dec 2022",
    endDate: "Oct 2023",
    location: "Remote",
    description:
      "Built a design knowledge base from scratch. Architected the frontend using Feature-Sliced Design, implemented state management, and owned the build tooling configuration end to end.",
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
      "Managed enterprise security infrastructure: DLP systems, Cisco ASA firewalls, and cryptographic gateways. Built an internal certificate management app in Django that streamlined digital signature workflows.",
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
      "Enterprise support at Russia's second-largest ISP. Diagnosed complex L2/L3 VPN issues, configured OSPF and BGP routing, and built a knowledge base that became the team's onboarding standard.",
    technologies: ["Networking", "OSPF", "BGP", "MPLS", "Bash"],
  },
];
