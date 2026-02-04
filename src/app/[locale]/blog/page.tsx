import { notFound } from "next/navigation";

import { isLocale, locales } from "@/i18n/config";
import { getAllPosts, getAllTags } from "@/lib/blog";

import { BlogPageClient } from "./BlogPageClient";

type TProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({ params }: TProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  const posts = getAllPosts(locale);
  const tags = getAllTags(locale);

  return (
    <main className="pt-16">
      <BlogPageClient posts={posts} tags={tags} />
    </main>
  );
}
