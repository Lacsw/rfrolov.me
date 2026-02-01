import { TExperience } from "@/types";

export const experiences: TExperience[] = [
  {
    id: "purpose-green",
    company: "Purpose Green",
    position: "Frontend-Entwickler",
    startDate: "Jul 2025",
    endDate: "Aktuell",
    location: "Berlin, Deutschland",
    description:
      "Entwicklung des Green+ Portals und interaktiver Tools für das ESG-Management von Immobilien. Entwicklung von Energiebewertungsrechnern und Portfolio-Dashboards, die Immobilienbesitzern helfen, Sanierungskosten um bis zu 35% zu senken.",
    technologies: ["React", "TypeScript", "Next.js"],
    isCurrent: true,
  },
  {
    id: "happy-numbers",
    company: "Happy Numbers",
    position: "JavaScript-Entwickler",
    startDate: "Nov 2023",
    endDate: "Jun 2025",
    location: "Remote",
    description:
      "Entwicklung interaktiver Mathematik-Lernerfahrungen für eine Plattform mit über 2 Millionen Schülern. Gestaltung von Spielmechaniken, die Pädagogen die Erstellung personalisierter adaptiver Inhalte ermöglichen. Pflege der Codebasis, Schreiben von Tests und Einarbeitung von Teammitgliedern.",
    technologies: ["JavaScript", "TypeScript", "React", "Figma"],
  },
  {
    id: "designforall",
    company: "DesignForAll",
    position: "Frontend-Entwickler",
    startDate: "Dez 2022",
    endDate: "Okt 2023",
    location: "Remote",
    description:
      "Aufbau einer Design-Wissensdatenbank-Webanwendung von Grund auf. Architektur des Frontends nach der Feature-Sliced Design Methodik, Implementierung der Zustandsverwaltung und Konfiguration der Build-Tools.",
    technologies: ["React", "TypeScript", "SCSS", "React Query", "Redux", "Vite"],
  },
  {
    id: "ciogd",
    company: "SPb GKU CIOGD",
    position: "IT-Sicherheitsspezialist",
    startDate: "Apr 2021",
    endDate: "Okt 2022",
    location: "St. Petersburg, Russland",
    description:
      "Verwaltung der Unternehmenssicherheitsinfrastruktur: DLP-Systeme, Firewalls (Cisco ASA) und kryptographische Gateways. Entwicklung einer internen Zertifikatsverwaltungs-Webanwendung mit Django, die Arbeitsabläufe für digitale Signaturen optimierte.",
    technologies: ["Python", "Django", "PostgreSQL", "Docker", "Nginx"],
  },
  {
    id: "er-telecom",
    company: "ER-Telecom",
    position: "Senior Technical Support Engineer",
    startDate: "Dez 2018",
    endDate: "Mär 2021",
    location: "St. Petersburg, Russland",
    description:
      "Unterstützung von Unternehmenskunden bei Russlands zweitgrößtem Breitbandanbieter. Diagnose komplexer Netzwerkprobleme in der L2-L3 VPN-Infrastruktur, Konfiguration von Routing-Protokollen und Aufbau einer Wissensdatenbank, die zum Schulungsstandard des Teams wurde.",
    technologies: ["Networking", "OSPF", "BGP", "MPLS", "Bash"],
  },
];
