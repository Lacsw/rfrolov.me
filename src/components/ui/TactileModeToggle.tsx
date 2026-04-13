"use client";

import { useTranslations } from "next-intl";

import { useTactile } from "@/hooks";

export function TactileModeToggle() {
  const { tactile, toggleTactile } = useTactile();
  const t = useTranslations("tactile");

  return (
    <button
      type="button"
      onClick={toggleTactile}
      aria-pressed={tactile}
      aria-label={tactile ? t("disable") : t("enable")}
      className="tactile-surface tactile-surface--ghost tactile-surface--sm"
    >
      <span>{t("label")}</span>
    </button>
  );
}
