import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlogPageClient } from "./BlogPageClient";

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <main className="pt-16">
      <BlogPageClient posts={posts} tags={tags} />
    </main>
  );
}
