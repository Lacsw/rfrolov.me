import { TExperience } from "@/types";

export const experiences: TExperience[] = [
  {
    id: "purpose-green",
    company: "Purpose Green",
    position: "Software Engineer",
    startDate: "Jul 2025",
    endDate: "Aktuell",
    location: "Berlin, Deutschland",
    description:
      "Aufbau des Green+ Portals — interaktive Tools für das ESG-Management von Immobilien. Energiebewertungsrechner und Portfolio-Dashboards, die Immobilienbesitzern helfen, Sanierungskosten um bis zu 35% zu senken.",
    technologies: ["React", "TypeScript", "Next.js"],
    isCurrent: true,
    highlights: [
      "Interaktive ESG-Bewertungsrechner von Grund auf architekturiert",
      "Portfolio-Dashboards für Enterprise-Immobilienkunden entwickelt",
    ],
    metrics: ["35% Kostensenkung"],
  },
  {
    id: "happy-numbers",
    company: "Happy Numbers",
    position: "Software Engineer",
    startDate: "Nov 2023",
    endDate: "Jun 2025",
    location: "Remote",
    description:
      "Interaktive Mathematik-Lernerfahrungen für 2M+ Schüler entwickelt. Adaptive Spielmechaniken entworfen, die Lehrern die Erstellung personalisierter Inhalte ermöglichen. Testabdeckung gepflegt und neue Entwickler eingearbeitet.",
    technologies: ["JavaScript", "TypeScript", "React", "Figma"],
    highlights: [
      "Adaptive Spielmechaniken für personalisierte Mathe-Inhalte entworfen",
      "Hohe Testabdeckung über alle Lernmodule hinweg gepflegt",
      "Neue Entwickler im Team eingearbeitet und betreut",
    ],
    metrics: ["2M+ Schüler"],
    transition: "Vollständig remote, Fokus auf Ed-Tech",
  },
  {
    id: "designforall",
    company: "DesignForAll",
    position: "Software Engineer",
    startDate: "Dez 2022",
    endDate: "Okt 2023",
    location: "Remote",
    description:
      "Eine Design-Wissensdatenbank von Grund auf aufgebaut. Frontend nach Feature-Sliced Design Methodik architekturiert, Zustandsverwaltung implementiert und die Build-Konfiguration vollständig verantwortet.",
    technologies: ["React", "TypeScript", "SCSS", "React Query", "Redux", "Vite"],
    highlights: [
      "Frontend nach Feature-Sliced Design Methodik architekturiert",
      "Build-Konfiguration und CI-Pipeline vollständig verantwortet",
    ],
    transition: "Erste reine Frontend-Rolle nach dem Wechsel aus der Security",
  },
  {
    id: "ciogd",
    company: "SPb GKU CIOGD",
    position: "IT-Sicherheitsspezialist",
    startDate: "Apr 2021",
    endDate: "Okt 2022",
    location: "St. Petersburg, Russland",
    description:
      "Unternehmenssicherheitsinfrastruktur verwaltet: DLP-Systeme, Cisco ASA Firewalls und kryptographische Gateways. Eine interne Zertifikatsverwaltungsanwendung in Django entwickelt, die Arbeitsabläufe für digitale Signaturen optimierte.",
    technologies: ["Python", "Django", "PostgreSQL", "Docker", "Nginx"],
    highlights: [
      "Interne Zertifikatsverwaltungsanwendung in Django entwickelt",
      "Arbeitsabläufe für digitale Signaturen organisationsweit optimiert",
    ],
    transition: "Wechsel von Netzwerktechnik zu Security Engineering",
  },
  {
    id: "er-telecom",
    company: "ER-Telecom",
    position: "Senior Technical Support Engineer",
    startDate: "Dez 2018",
    endDate: "Mär 2021",
    location: "St. Petersburg, Russland",
    description:
      "Enterprise-Support beim zweitgrößten ISP Russlands. Komplexe L2/L3-VPN-Probleme diagnostiziert, OSPF- und BGP-Routing konfiguriert und eine Wissensdatenbank aufgebaut, die zum Onboarding-Standard des Teams wurde.",
    technologies: ["Networking", "OSPF", "BGP", "MPLS", "Bash"],
    highlights: [
      "Wissensdatenbank aufgebaut, die zum Onboarding-Standard wurde",
      "Komplexe L2/L3-VPN-Probleme für Enterprise-Kunden diagnostiziert",
    ],
  },
];
