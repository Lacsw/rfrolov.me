export const locales = ["en", "de"] as const;

export type TLocale = (typeof locales)[number];

export function isLocale(value: unknown): value is TLocale {
  return typeof value === "string" && locales.includes(value as TLocale);
}

export const defaultLocale: TLocale = "en";

export const localeNames: Record<TLocale, string> = {
  en: "English",
  de: "Deutsch",
};
