import Link from "next/link";

import { getTagColor } from "@/components/sections/Blog/constants";
import { BackLink, Container } from "@/components/ui";
import { getTagsWithCounts } from "@/lib/blog";
import { getTagUrl } from "@/lib/urls";
import { cn } from "@/lib/utils";

export default function TagsPage() {
  const tagsWithCounts = getTagsWithCounts();

  return (
    <main className="pt-16">
      <section className="py-12 lg:py-16">
        <Container>
          <BackLink href="/blog">Back to blog</BackLink>

          <header className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              All Tags
            </h1>
            <p className="text-muted-foreground">
              Browse posts by topic
            </p>
          </header>

          <div className="flex flex-wrap gap-3">
            {tagsWithCounts.map(({ tag, count }) => (
              <Link
                key={tag}
                href={getTagUrl(tag)}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:opacity-70 transition-opacity cursor-pointer",
                  getTagColor(tag)
                )}
              >
                <span>{tag}</span>
                <span className="text-xs opacity-70">({count})</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
