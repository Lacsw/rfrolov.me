"use client";

import { useTranslations } from "next-intl";

import { SocialLink } from "@/components/ui";
import { socialLinks } from "@/data/social-links";

export function HeroContent() {
  const t = useTranslations("hero");

  return (
    <div className="space-y-3 lg:max-w-lg">
      <p className="text-sm text-muted-foreground">{t("greeting")}</p>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">{t("name")}</h1>

      <p className="text-lg sm:text-xl text-muted-foreground">{t("role")}</p>

      <p className="text-sm text-muted-foreground leading-relaxed">{t("description")}</p>

      <div className="flex gap-4 pt-2">
        {socialLinks.map((link) => (
          <SocialLink key={link.name} {...link} />
        ))}
      </div>
    </div>
  );
}
