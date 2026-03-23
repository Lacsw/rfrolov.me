import { useTranslations } from "next-intl";

export function CVAbout() {
  const t = useTranslations("experiencePage.about");

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground">{t("title")}</h2>
      <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
        <p>
          Engineer with a background that started in security and networks before moving fully into software. That path
          shaped how I think: I care about systems, not just interfaces — about what happens when things break, not just
          when they work.
        </p>
        <p>
          I build product-facing web applications with React and TypeScript. I&apos;ve shipped tools used by millions of
          students, dashboards for enterprise real estate clients, and full-stack projects in Go. I&apos;m drawn to work
          where the code connects to something real.
        </p>
      </div>
    </div>
  );
}
