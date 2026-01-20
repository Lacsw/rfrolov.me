"use client";

import { ReactNode } from "react";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

import {
  BlogTag,
  MobileTOC,
  PostNavigation,
  RelatedPosts,
  SeriesNavigation,
  TableOfContents,
} from "@/components/sections/Blog";
import { BackLink, Container, ReadingProgress } from "@/components/ui";
import { ANIMATION_DURATION } from "@/constants";
import { TAdjacentPosts, TSeriesInfo } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import { TBlogPostMeta, THeading } from "@/types";

type TBlogPostLayoutProps = {
  post: TBlogPostMeta;
  headings: THeading[];
  adjacentPosts: TAdjacentPosts;
  relatedPosts: TBlogPostMeta[];
  seriesInfo: TSeriesInfo | null;
  children: ReactNode;
};

export function BlogPostLayout({
  post,
  headings,
  adjacentPosts,
  relatedPosts,
  seriesInfo,
  children,
}: TBlogPostLayoutProps) {
  const formattedDate = formatDate(post.date, { month: "long" });

  return (
    <>
      <ReadingProgress showPercentage />
      <section className="py-12 lg:py-16">
        <Container>
          <div className="relative lg:grid lg:grid-cols-[1fr_200px] lg:gap-10 xl:grid-cols-[1fr_250px]">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: ANIMATION_DURATION.slower }}
              className="max-w-2xl"
            >
              <BackLink href="/blog">Back to blog</BackLink>

              <header className="mb-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <time dateTime={post.date}>{formattedDate}</time>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {post.readingTime} min read
                  </span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>

                <p className="text-lg text-muted-foreground">{post.description}</p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <BlogTag key={tag} tag={tag} />
                  ))}
                </div>
              </header>

              {seriesInfo && <SeriesNavigation series={seriesInfo} />}

              <hr className="border-muted mb-8" />

              <div className="prose-custom">{children}</div>

              <PostNavigation previous={adjacentPosts.previous} next={adjacentPosts.next} />

              <RelatedPosts posts={relatedPosts} />
            </motion.article>

            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}
          </div>
        </Container>
      </section>

      <MobileTOC headings={headings} />
    </>
  );
}
