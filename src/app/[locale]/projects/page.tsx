import { Projects } from "@/components/sections/Projects";
import { getProjects } from "@/data/projects";
import { locales, TLocale } from "@/i18n/config";
import { getAllProjectIdsWithContent } from "@/lib/projects";

type TProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ProjectsPage({ params }: TProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as TLocale;
  const projects = getProjects(locale);
  const projectsWithDetails = getAllProjectIdsWithContent(locale);

  return (
    <main className="pt-16">
      <Projects projects={projects} projectsWithDetails={projectsWithDetails} />
    </main>
  );
}
