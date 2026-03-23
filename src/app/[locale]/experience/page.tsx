import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { CVAbout, CVHeader, CVLanguages, CVOpenSource } from "@/components/sections/Experience/components";
import { SkillsGrouped } from "@/components/sections/SkillsGrouped";
import { JsonLd } from "@/components/seo";
import { SITE_URL } from "@/constants";
import { getEducation } from "@/data/education";
import { getExperiences } from "@/data/experience";
import { isLocale, locales } from "@/i18n/config";
import { generateExperiencePageSchema } from "@/lib";

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
  const experiences = getExperiences(locale);
  const education = getEducation(locale);

  return (
    <main className="pt-16">
      <JsonLd data={generateExperiencePageSchema(locale)} />
      <CVHeader />
      <CVAbout />
      <SkillsGrouped />
      <Experience experiences={experiences} />
      <Education education={education} />
      <CVOpenSource />
      <CVLanguages />
      <div className="pb-12 lg:pb-16" />
    </main>
  );
}
