"use client";

import { Download, Github, Linkedin, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { EXTERNAL_LINK_PROPS } from "@/constants";
import { cn } from "@/lib/utils";

export function CVHeader() {
  const t = useTranslations("experiencePage.contact");

  function handleDownload() {
    window.print();
  }

  return (
    <div className="border border-muted rounded-lg p-6 space-y-4 bg-muted/20">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Roman Frolov</h1>
        <p className="text-muted-foreground">Software Engineer</p>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>Berlin, Germany</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="https://github.com/Lacsw"
          {...EXTERNAL_LINK_PROPS}
          className={cn(
            "inline-flex items-center gap-1.5 text-sm",
            "text-muted-foreground hover:text-foreground transition-colors"
          )}
        >
          <Github className="h-3.5 w-3.5" />
          {t("github")}
        </a>

        <a
          href="https://linkedin.com/in/r-frolov"
          {...EXTERNAL_LINK_PROPS}
          className={cn(
            "inline-flex items-center gap-1.5 text-sm",
            "text-muted-foreground hover:text-foreground transition-colors"
          )}
        >
          <Linkedin className="h-3.5 w-3.5" />
          {t("linkedin")}
        </a>

        <button
          onClick={handleDownload}
          className={cn(
            "inline-flex items-center gap-1.5 text-sm cursor-pointer",
            "text-muted-foreground hover:text-foreground transition-colors"
          )}
        >
          <Download className="h-3.5 w-3.5" />
          {t("downloadCV")}
        </button>
      </div>
    </div>
  );
}
