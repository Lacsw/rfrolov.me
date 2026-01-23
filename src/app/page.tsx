"use client";

import { useEffect } from "react";

import { defaultLocale } from "@/i18n/config";

export default function RootPage() {
  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    window.location.replace(`${basePath}/${defaultLocale}`);
  }, []);

  return null;
}
