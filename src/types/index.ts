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
