import { notFound } from "next/navigation";

import { getLocale, getTranslations } from "next-intl/server";

import { BlogPostListItem } from "@/components/sections/Blog";
import { BackLink, Container } from "@/components/ui";
import { locales, TLocale } from "@/i18n/config";
import { getAllTags, getPostsByTag } from "@/lib/blog";

type TProps = {
  params: Promise<{ tag: string; locale: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllTags(locale).map((tag) => ({
      locale,
      tag: tag.toLowerCase(),
    }))
  );
}

export default async function TagPage({ params }: TProps) {
  const { tag } = await params;
  const locale = (await getLocale()) as TLocale;
  const t = await getTranslations("blog");
  const tCommon = await getTranslations("common");
  const posts = getPostsByTag(tag, locale);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="pt-16">
      <section className="py-12 lg:py-16">
        <Container>
          <BackLink href="/blog">{tCommon("backToBlog")}</BackLink>

          <header className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              {t("taggedWith", { tag })}
            </h1>
            <p className="text-muted-foreground">
              {t("postsFound", { count: posts.length })}
            </p>
          </header>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <BlogPostListItem key={post.slug} post={post} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
