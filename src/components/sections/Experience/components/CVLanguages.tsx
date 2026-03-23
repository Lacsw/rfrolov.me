import { useTranslations } from "next-intl";

import { languages } from "@/data/languages";

export function CVLanguages() {
  const t = useTranslations("experiencePage.languages");

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground">{t("title")}</h2>
      <div className="space-y-1.5">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center justify-between text-sm">
            <span>{lang.name}</span>
            <span className="text-muted-foreground">{lang.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
