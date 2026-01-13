export type TProject = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  href?: string;
  github?: string;
  featured?: boolean;
};

export type TSocialLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type TSkill = {
  name: string;
  icon: string;
};

export type TExperience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  technologies: string[];
};
