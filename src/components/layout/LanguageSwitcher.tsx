"use client";

import { useLocale, useTranslations } from "next-intl";

import { HOVER_TEXT_COLOR } from "@/constants";
import { locales, TLocale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale() as TLocale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  const handleLocaleChange = (newLocale: TLocale) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

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
