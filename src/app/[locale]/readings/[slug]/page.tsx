import { Metadata } from "next";

import { notFound } from "next/navigation";

import { setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/sections/Blog";
import { BookDetail } from "@/components/sections/Readings";
import { SITE_URL } from "@/constants";
import { isLocale, locales } from "@/i18n/config";
import { getAllBookSlugs, getBookBySlug, getBookReflection } from "@/lib/readings";

type TProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllBookSlugs().map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const book = getBookBySlug(slug);

  if (!book) {
    return { title: "Not Found" };
  }

  const url = `${SITE_URL}/${locale}/readings/${slug}`;

  return {
    title: `${book.title} | Roman Frolov`,
    description: book.description,
    openGraph: {
      title: `${book.title} — ${book.author}`,
      description: book.description,
      url,
      type: "article",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BookDetailPage({ params }: TProps) {
  const { slug, locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  setRequestLocale(locale);

  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const reflection = getBookReflection(slug);

  return (
    <main className="pt-16">
      <BookDetail book={book}>
        {reflection ? (
          <MDXRemote
            source={reflection}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        ) : (
          <p className="text-muted-foreground italic">No reflection yet.</p>
        )}
      </BookDetail>
    </main>
  );
}
