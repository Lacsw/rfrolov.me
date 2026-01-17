import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import { mdxComponents } from "@/components/sections/Blog";
import {
  ProjectContent,
  ProjectHero,
  ProjectMeta,
  RelatedProjects,
} from "@/components/sections/Projects";
import { Container } from "@/components/ui";
import { locales, TLocale } from "@/i18n/config";
import { getAllProjectIdsWithContent, getProjectById, getRelatedProjects } from "@/lib/projects";

type TProps = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllProjectIdsWithContent(locale).map((id) => ({
      locale,
      id,
    }))
  );
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { id, locale } = await params;
  const project = getProjectById(id, locale as TLocale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  if (!project) {
    return {
      title: t("title"),
    };
  }

  return {
    title: `${project.title} | Roman Frolov`,
    description: project.longDescription || project.description,
  };
}

const rehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
};

export default async function ProjectDetailPage({ params }: TProps) {
  const { id } = await params;
  const locale = (await getLocale()) as TLocale;
  const project = getProjectById(id, locale);

  if (!project) {
    notFound();
  }

  const { content, ...projectMeta } = project;
  const relatedProjects = getRelatedProjects(project, locale);

  return (
    <main className="pt-16">
      <section className="py-12 lg:py-16">
        <Container>
          <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-10 xl:grid-cols-[1fr_250px]">
            <article className="max-w-2xl space-y-8">
              <ProjectHero project={projectMeta} />

              <hr className="border-muted" />

              <ProjectContent>
                <MDXRemote
                  source={content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypePrettyCodeOptions]],
                    },
                  }}
                />
              </ProjectContent>

              <RelatedProjects projects={relatedProjects} />
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <ProjectMeta project={projectMeta} />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
