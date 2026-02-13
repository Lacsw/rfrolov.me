import type { TLocale } from "@/i18n/config";
import { TEducation } from "@/types";

import { education as educationDE } from "./de";
import { education as educationEN } from "./en";

const educationByLocale: Record<TLocale, TEducation[]> = {
  en: educationEN,
  de: educationDE,
};

export function getEducation(locale: TLocale): TEducation[] {
  return educationByLocale[locale] || educationByLocale.en;
}
