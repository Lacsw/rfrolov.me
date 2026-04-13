"use client";

import { useCallback } from "react";

import { useLocale, useTranslations } from "next-intl";

import { HOVER_TEXT_COLOR } from "@/constants";
import { useTactileSurface } from "@/hooks";
import { defaultLocale, isLocale, locales, TLocale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const localeRaw = useLocale();
  const locale: TLocale = isLocale(localeRaw) ? localeRaw : defaultLocale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");
  const isTactile = useTactileSurface("language-switcher");

  const handleLocaleChange = useCallback(
    (newLocale: TLocale) => {
      if (newLocale !== locale) {
        router.replace(pathname, { locale: newLocale });
      }
    },
    [locale, pathname, router]
  );

  if (isTactile) {
    return (
      <div role="radiogroup" aria-label={t("languageSelector")} className="flex items-center gap-1">
        {locales.map((loc) => {
          const isCurrent = locale === loc;
          const languageName = t(loc);

          return (
            <button
              key={loc}
              type="button"
              role="radio"
              aria-checked={isCurrent}
              onClick={() => handleLocaleChange(loc)}
              aria-label={isCurrent ? t("currentLanguage", { language: languageName }) : t("switchTo", { language: languageName })}
              className="tactile-surface tactile-surface--ghost tactile-surface--sm"
            >
              <span>{loc.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Legacy branch — untouched.
  return (
    <div
      role="group"
      aria-label={t("languageSelector")}
      className="flex items-center text-sm"
    >
      {locales.map((loc) => {
        const isCurrent = locale === loc;
        const languageName = t(loc);

        return (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            aria-label={isCurrent ? t("currentLanguage", { language: languageName }) : t("switchTo", { language: languageName })}
            aria-current={isCurrent ? "true" : undefined}
            className={cn(
              "px-1.5 py-1 cursor-pointer transition-colors duration-300",
              isCurrent ? "text-foreground" : HOVER_TEXT_COLOR
            )}
          >
            {loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
