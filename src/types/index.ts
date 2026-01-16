export type TProjectCategory = "personal" | "work" | "opensource";

export type TProject = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  year: number;
  category: TProjectCategory;
  highlight?: string;
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

export type TBlogPost = {
  slug: string;
  order: number;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  readingTime: number;
  content: string;
};

export type TBlogPostMeta = Omit<TBlogPost, "content">;

export type THeading = {
  id: string;
  text: string;
  level: 2 | 3;
};
