import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { languages } from "@/data/languages";

type TProps = {
  id?: string;
};

export function CVLanguages({ id }: TProps) {
  const t = useTranslations("experiencePage.languages");

  return (
    <section id={id} className="py-8 lg:py-10">
      <Container>
        <AnimatedSection className="space-y-6">
          <SectionHeader title={t("title")} />
          <div className="space-y-2">
            {languages.map((lang) => (
              <div key={lang.name} className="flex items-center justify-between text-sm max-w-xs">
                <span>{lang.name}</span>
                <span className="text-muted-foreground">{lang.level}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
