"use client";

import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

type TProps = {
  minutes: number;
  showLabel?: boolean;
};

export function ReadingTime({ minutes, showLabel = false }: TProps) {
  const t = useTranslations("blog.readingTime");

  return (
    <span className="inline-flex items-center gap-1">
      <Clock className="h-3 w-3" />
      {showLabel ? t("minRead", { minutes }) : t("min", { minutes })}
    </span>
  );
}
