import { getLocale } from "next-intl/server";

import { BlogList } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { getExperiences } from "@/data/experience";
import { getFeaturedProjects } from "@/data/projects";
import { TLocale } from "@/i18n/config";
import { getFeaturedPosts } from "@/lib/blog";

export default async function Home() {
  const locale = (await getLocale()) as TLocale;
  const featuredPosts = getFeaturedPosts(locale, 2);
  const experiences = getExperiences(locale);
  const featuredProjects = getFeaturedProjects(locale);

  return (
    <main className="pt-16">
      <Hero />
      <Skills />
      <Experience experiences={experiences} />
      <FeaturedProjects projects={featuredProjects} />
      <BlogList posts={featuredPosts} />
      <Contact />
    </main>
  );
}
