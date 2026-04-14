import { ArrowUpRight, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { BlogList } from "@/components/sections/Blog";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo";
import { Container } from "@/components/ui";
import { EXTERNAL_LINK_PROPS, HOVER_OPACITY, ICON_SIZE } from "@/constants";
import { getFeaturedProjects } from "@/data/projects";
import { isLocale, locales } from "@/i18n/config";
import { getFeaturedPosts } from "@/lib/blog";
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/jsonld";
import { getAllProjectIdsWithContent } from "@/lib/projects";
import { cn } from "@/lib/utils";

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
  const t = await getTranslations({ locale, namespace: "talkBanner" });

  return (
    <main className="pt-16">
      <JsonLd data={generatePersonSchema()} />
      <JsonLd data={generateWebsiteSchema()} />
      <Hero />
      <section className="pt-6 lg:pt-8">
        <Container>
          <a
            href="https://webinale.com/generative-ai/human-centered-ai-frontend-development/"
            {...EXTERNAL_LINK_PROPS}
            className={cn(
              "group flex items-start gap-2 rounded-lg bg-muted px-4 py-3 text-xs sm:items-center",
              HOVER_OPACITY
            )}
          >
            <MapPin className={cn(ICON_SIZE.sm, "mt-0.5 shrink-0 text-muted-foreground sm:mt-0")} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
              <span className="font-medium">{t("label")}</span>
              <span className="hidden text-muted-foreground sm:inline">·</span>
              <span className="text-muted-foreground sm:truncate">{t("title")}</span>
              <span className="shrink-0 text-muted-foreground sm:ml-auto">{t("meta")}</span>
            </div>
            <ArrowUpRight className={cn(ICON_SIZE.sm, "mt-0.5 shrink-0 text-muted-foreground sm:mt-0")} />
          </a>
        </Container>
      </section>
      <BlogList posts={featuredPosts} />
      <FeaturedProjects projects={featuredProjects} projectsWithDetails={projectsWithDetails} />
    </main>
  );
}
