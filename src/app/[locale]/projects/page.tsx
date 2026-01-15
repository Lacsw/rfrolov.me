import { getLocale } from "next-intl/server";

import { Projects } from "@/components/sections/Projects";
import { getProjects } from "@/data/projects";
import { TLocale } from "@/i18n/config";

export default async function ProjectsPage() {
  const locale = (await getLocale()) as TLocale;
  const projects = getProjects(locale);

  return (
    <main className="pt-16">
      <Projects projects={projects} />
    </main>
  );
}
