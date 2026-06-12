import { notFound } from "next/navigation";

import { BlogList } from "@/components/sections/Blog";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo";
import { getFeaturedProjects } from "@/data/projects";
import { isLocale, locales } from "@/i18n/config";
import { getFeaturedPosts } from "@/lib/blog";
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/jsonld";
import { getAllProjectIdsWithContent } from "@/lib/projects";

type TProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: TProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  const featuredPosts = getFeaturedPosts(locale, 4);
  const featuredProjects = getFeaturedProjects(locale);
  const projectsWithDetails = getAllProjectIdsWithContent(locale);

  return (
    <main className="pt-16">
      <JsonLd data={generatePersonSchema()} />
      <JsonLd data={generateWebsiteSchema()} />
      <Hero />
      <BlogList posts={featuredPosts} />
      <FeaturedProjects projects={featuredProjects} projectsWithDetails={projectsWithDetails} />
    </main>
  );
}
