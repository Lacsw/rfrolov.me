import type { TLocale } from "@/i18n/config";
import { TExperience } from "@/types";

import { experiences as experiencesDE } from "./de";
import { experiences as experiencesEN } from "./en";

const experiencesByLocale: Record<TLocale, TExperience[]> = {
  en: experiencesEN,
  de: experiencesDE,
};

export function getExperiences(locale: TLocale): TExperience[] {
  return experiencesByLocale[locale] || experiencesByLocale.en;
}
