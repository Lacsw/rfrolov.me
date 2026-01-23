import { BlogList } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { JsonLd } from "@/components/seo";
import { getExperiences } from "@/data/experience";
import { getFeaturedProjects } from "@/data/projects";
import { locales, TLocale } from "@/i18n/config";
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
  const locale = localeParam as TLocale;
  const featuredPosts = getFeaturedPosts(locale, 2);
  const experiences = getExperiences(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const projectsWithDetails = getAllProjectIdsWithContent(locale);

  return (
    <main className="pt-16">
      <JsonLd data={generatePersonSchema()} />
      <JsonLd data={generateWebsiteSchema()} />
      <Hero />
      <Skills />
      <Experience experiences={experiences} />
      <FeaturedProjects projects={featuredProjects} projectsWithDetails={projectsWithDetails} />
      <BlogList posts={featuredPosts} />
      <Contact />
    </main>
  );
}
