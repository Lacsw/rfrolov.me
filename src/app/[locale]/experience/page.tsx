import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { KeyStats } from "@/components/sections/KeyStats";
import { SkillsGrouped } from "@/components/sections/SkillsGrouped";
import { JsonLd } from "@/components/seo";
import { Container, SectionHeader } from "@/components/ui";
import { SITE_URL, SPACING } from "@/constants";
import { getEducation } from "@/data/education";
import { getExperiences } from "@/data/experience";
import { isLocale, locales } from "@/i18n/config";
import { generateExperiencePageSchema } from "@/lib/jsonld";

type TProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("experienceTitle"),
    description: t("experienceDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/experience`,
      languages: {
        en: `${SITE_URL}/en/experience`,
        de: `${SITE_URL}/de/experience`,
      },
    },
  };
}

export default async function ExperiencePage({ params }: TProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "experiencePage" });
  const experiences = getExperiences(locale);
  const education = getEducation(locale);

  return (
    <main className="pt-16">
      <JsonLd data={generateExperiencePageSchema(locale)} />

      <section className={SPACING.section}>
        <Container>
          <SectionHeader title={t("title")} description={t("description")} as="h1" />
        </Container>
      </section>

      <KeyStats />
      <SkillsGrouped />
      <Experience experiences={experiences} />
      <Education education={education} />
    </main>
  );
}
