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
  color: string;
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
  isCurrent?: boolean;
};

export type TBlogPostSeries = {
  name: string;
  order: number;
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
  series?: TBlogPostSeries;
  readingTime: number;
  content: string;
};

export type TBlogPostMeta = Omit<TBlogPost, "content">;

export type THeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type TProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type TEducation = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  description?: string;
  isCurrent?: boolean;
};

export type TKeyStat = {
  id: string;
  value: string;
  labelKey: string;
};

export type TSkillCategory = {
  key: string;
  skills: TSkill[];
};

export type TProjectDetailMeta = TProject & {
  longDescription?: string;
  role?: string;
  duration?: string;
  team?: string;
  screenshots?: TProjectScreenshot[];
};

export type TProjectDetail = TProjectDetailMeta & {
  content: string;
};
