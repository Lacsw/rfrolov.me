import { RelatedItemsList } from "@/components/ui";
import { TBlogPostMeta } from "@/types";

import { BlogTags } from "../post";

type TRelatedPostsProps = {
  posts: TBlogPostMeta[];
  title?: string;
};

export function RelatedPosts({ posts, title = "Related Posts" }: TRelatedPostsProps) {
  return (
    <RelatedItemsList
      items={posts}
      title={title}
      getKey={(post) => post.slug}
      getHref={(post) => `/blog/${post.slug}`}
      renderTags={(post) => <BlogTags tags={post.tags} limit={2} size="sm" insideCard />}
    />
  );
}
