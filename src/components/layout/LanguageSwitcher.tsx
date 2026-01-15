"use client";

import { useLocale } from "next-intl";

import { locales, TLocale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale() as TLocale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: TLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={cn(
            "px-2 py-1 rounded transition-colors cursor-pointer",
            locale === loc
              ? "text-foreground bg-muted"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
