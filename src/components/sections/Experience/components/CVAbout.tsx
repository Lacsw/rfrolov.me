import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";

type TProps = {
  id?: string;
};

export function CVAbout({ id }: TProps) {
  const t = useTranslations("experiencePage.about");

  return (
    <section id={id} className="py-8 lg:py-10">
      <Container>
        <AnimatedSection className="space-y-6">
          <SectionHeader title={t("title")} />
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>
              Engineer with a background that started in security and networks before moving fully into software. That path shaped how I think: I care about systems, not just interfaces — about what happens when things break, not just when they work.
            </p>
            <p>
              I build product-facing web applications with React and TypeScript. I&apos;ve shipped tools used by millions of students, dashboards for enterprise real estate clients, and full-stack projects in Go. I&apos;m drawn to work where the code connects to something real.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
