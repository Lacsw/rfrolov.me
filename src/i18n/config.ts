export const locales = ["en", "de"] as const;

export type TLocale = (typeof locales)[number];

export const defaultLocale: TLocale = "en";

export const localeNames: Record<TLocale, string> = {
  en: "English",
  de: "Deutsch",
};
