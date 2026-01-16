"use client";

import { useTranslations } from "next-intl";

import { AnimatedSection, Container } from "@/components/ui";
import { HOVER_OPACITY } from "@/constants";
import { Link } from "@/i18n/routing";
import { TBlogPostMeta } from "@/types";

import { BlogPostCard } from "./components";

type TProps = {
  posts: TBlogPostMeta[];
};

export function BlogList({ posts }: TProps) {
  const t = useTranslations("blog");

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <AnimatedSection className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              {t("latestPosts")}
            </h2>
            <Link
              href="/blog"
              className={`text-sm text-muted-foreground ${HOVER_OPACITY}`}
            >
              {t("viewAll")}
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
