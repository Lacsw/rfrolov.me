"use client";

import { useMemo, useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { BlogPostCard, BlogPostListItem } from "@/components/sections/Blog";
import { Container, EmptyState, SearchInput, SectionHeader, ViewToggle } from "@/components/ui";
import { type TViewMode } from "@/components/ui/ViewToggle";
import { FADE_IN, FADE_IN_TRANSITION } from "@/constants";
import { usePersistedState } from "@/hooks";
import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";

type TProps = {
  posts: TBlogPostMeta[];
  tags: string[];
};

export function BlogPageClient({ posts, tags }: TProps) {
  const t = useTranslations("blog");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [view, setView] = usePersistedState<TViewMode>("blog-view-mode", "grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (selectedTag) {
      result = result.filter((post) =>
        post.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [posts, selectedTag, searchQuery]);

  const isFiltering = selectedTag !== null || searchQuery.trim() !== "";
  const showFilterCount = isFiltering && filteredPosts.length !== posts.length;

  return (
    <section className="min-h-[calc(100vh-4rem)] py-12 lg:py-16">
      <Container>
        <motion.div {...FADE_IN} transition={FADE_IN_TRANSITION} className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <SectionHeader as="h1" description={t("description")} title={t("title")} />
              <ViewToggle view={view} onViewChange={setView} />
            </div>

            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t("searchPlaceholder")}
              className="max-w-md"
            />

            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all",
                    selectedTag === null
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:opacity-70"
                  )}
                >
                  {t("filters.all")}
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all",
                      selectedTag === tag
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:opacity-70"
                    )}
                  >
                    {tag}
                  </button>
                ))}
                {showFilterCount && (
                  <span className="text-xs text-muted-foreground ml-2">
                    {t("showingCount", { count: filteredPosts.length, total: posts.length })}
                  </span>
                )}
              </div>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            view === "grid" ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredPosts.map((post, index) => (
                  <BlogPostCard key={post.slug} index={index} post={post} />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-muted -my-4">
                {filteredPosts.map((post, index) => (
                  <BlogPostListItem key={post.slug} index={index} post={post} />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              title={t("noPostsFound")}
              description={searchQuery ? t("tryDifferentSearch") : t("tryDifferentFilter")}
              variant={searchQuery ? "search" : "filter"}
            />
          )}
        </motion.div>
      </Container>
    </section>
  );
}
