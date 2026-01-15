import { getLocale } from "next-intl/server";

import { TLocale } from "@/i18n/config";
import { getAllPosts, getAllTags } from "@/lib/blog";

import { BlogPageClient } from "./BlogPageClient";

export default async function BlogPage() {
  const locale = (await getLocale()) as TLocale;
  const posts = getAllPosts(locale);
  const tags = getAllTags(locale);

  return (
    <main className="pt-16">
      <BlogPageClient posts={posts} tags={tags} />
    </main>
  );
}
