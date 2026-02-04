import { notFound } from "next/navigation";

import { Projects } from "@/components/sections/Projects";
import { getProjects } from "@/data/projects";
import { isLocale, locales } from "@/i18n/config";
import { getAllProjectIdsWithContent } from "@/lib/projects";

type TProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ProjectsPage({ params }: TProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  const projects = getProjects(locale);
  const projectsWithDetails = getAllProjectIdsWithContent(locale);

  return (
    <main className="pt-16">
      <Projects projects={projects} projectsWithDetails={projectsWithDetails} />
    </main>
  );
}
