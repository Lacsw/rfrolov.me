import { Metadata } from "next";

import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import { mdxComponents } from "@/components/sections/Blog";
import { ProjectContent, ProjectDetailLayout } from "@/components/sections/Projects";
import { JsonLd } from "@/components/seo";
import { SITE_URL } from "@/constants";
import { locales, TLocale } from "@/i18n/config";
import { extractHeadings } from "@/lib/blog";
import { generateProjectJsonLd } from "@/lib/jsonld";
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

  const description = project.longDescription || project.description;
  const url = `${SITE_URL}/${locale}/projects/${id}`;

  return {
    title: `${project.title} | Roman Frolov`,
    description,
    openGraph: {
      title: project.title,
      description,
      url,
      type: "article",
      locale: locale === "de" ? "de_DE" : "en_US",
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/projects/${id}`,
        de: `${SITE_URL}/de/projects/${id}`,
      },
    },
  };
}

const rehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: "plaintext",
};

export default async function ProjectDetailPage({ params }: TProps) {
  const { id, locale: localeParam } = await params;
  const locale = localeParam as TLocale;
  const project = getProjectById(id, locale);

  if (!project) {
    notFound();
  }

  const { content, ...projectMeta } = project;
  const headings = extractHeadings(content);
  const relatedProjects = getRelatedProjects(project, locale);

  return (
    <main className="pt-16">
      <JsonLd data={generateProjectJsonLd(projectMeta, locale)} />
      <ProjectDetailLayout project={projectMeta} relatedProjects={relatedProjects} headings={headings}>
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
      </ProjectDetailLayout>
    </main>
  );
}
