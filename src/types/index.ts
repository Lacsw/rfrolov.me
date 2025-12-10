export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  href?: string;
  github?: string;
  featured?: boolean;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}
