"use client";

import { useEffect, useRef } from "react";

import { useTranslations } from "next-intl";

import { useToast } from "@/components/ui/Toast";

const HINT_SEEN_KEY = "rf-tactile-hint-seen";
const TACTILE_KEY = "rf-tactile";
const SHOW_AFTER_MS = 4000;

export function TactileFirstVisitHint() {
  const t = useTranslations("tactile.hint");
  const { showToast } = useToast();
  const shownRef = useRef(false);

  useEffect(() => {
    if (shownRef.current) return;

    let alreadySeen = false;
    let alreadyChosen = false;

    try {
      alreadySeen = window.localStorage.getItem(HINT_SEEN_KEY) === "true";
      alreadyChosen = window.localStorage.getItem(TACTILE_KEY) !== null;
    } catch {
      /* ignore */
    }

    if (alreadySeen || alreadyChosen) return;

    const timer = window.setTimeout(() => {
      shownRef.current = true;

      try {
        window.localStorage.setItem(HINT_SEEN_KEY, "true");
      } catch {
        /* ignore */
      }

      showToast(t("message"));
    }, SHOW_AFTER_MS);

    return () => window.clearTimeout(timer);
  }, [showToast, t]);

  return null;
}
