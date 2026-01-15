import type { TLocale } from "@/i18n/config";
import { TProject } from "@/types";

import { projects as projectsDE } from "./de";
import { projects as projectsEN } from "./en";

const projectsByLocale: Record<TLocale, TProject[]> = {
  en: projectsEN,
  de: projectsDE,
};

export function getProjects(locale: TLocale): TProject[] {
  return projectsByLocale[locale] || projectsByLocale.en;
}

export function getFeaturedProjects(locale: TLocale, limit?: number): TProject[] {
  const featured = getProjects(locale).filter((p) => p.featured);

  return limit ? featured.slice(0, limit) : featured;
}
