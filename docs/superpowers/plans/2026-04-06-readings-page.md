# Readings Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Readings" page to the portfolio for tracking books read, with a listing page (card grid grouped by year) and individual detail pages (cover + description + MDX reflections).

**Architecture:** English-only page with static data in `src/data/readings.ts`, MDX reflection files in `src/content/readings/`, and two routes: `/en/readings` (listing) and `/en/readings/[slug]` (detail). Follows existing projects/blog patterns exactly.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion, next-mdx-remote, next-intl

---

### Task 1: Add TBook type

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add TBook type to types file**

Add at the end of `src/types/index.ts`:

```typescript
export type TBook = {
  slug: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  dateRead: string;
  tags: string[];
  rating: number;
  status: "reading" | "finished";
};
```

- [ ] **Step 2: Commit**

```bash
git add src/types/index.ts
git commit -m "feat(readings): add TBook type"
```

---

### Task 2: Add readings data file with sample book

**Files:**
- Create: `src/data/readings.ts`

- [ ] **Step 1: Create data file with one sample book**

Create `src/data/readings.ts`:

```typescript
import { TBook } from "@/types";

export const books: TBook[] = [
  {
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/books/atomic-habits.jpg",
    description:
      "An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.",
    dateRead: "2025-01",
    tags: ["self-improvement"],
    rating: 4,
    status: "finished",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/readings.ts
git commit -m "feat(readings): add readings data file with sample book"
```

---

### Task 3: Add readings lib functions

**Files:**
- Modify: `src/constants/paths.ts`
- Create: `src/lib/readings.ts`

- [ ] **Step 1: Add readings content path**

In `src/constants/paths.ts`, add the readings path:

```typescript
export const CONTENT_PATHS = {
  blog: path.join(CONTENT_DIR, "blog"),
  projects: path.join(CONTENT_DIR, "projects"),
  readings: path.join(CONTENT_DIR, "readings"),
} as const;
```

- [ ] **Step 2: Create lib/readings.ts**

Create `src/lib/readings.ts`:

```typescript
import path from "path";

import { CONTENT_PATHS } from "@/constants";
import { books } from "@/data/readings";
import { TBook } from "@/types";

import { fileExists, parseMDXFile } from "./content";

export function getBooks(): TBook[] {
  return books;
}

export function getBookBySlug(slug: string): TBook | undefined {
  return books.find((book) => book.slug === slug);
}

export function getCurrentlyReading(): TBook | undefined {
  return books.find((book) => book.status === "reading");
}

export function getBooksByYear(): Map<number, TBook[]> {
  const finished = books.filter((book) => book.status === "finished");
  const grouped = new Map<number, TBook[]>();

  for (const book of finished) {
    const year = parseInt(book.dateRead.split("-")[0], 10);
    const existing = grouped.get(year) || [];
    existing.push(book);
    grouped.set(year, existing);
  }

  return new Map([...grouped.entries()].sort((a, b) => b[0] - a[0]));
}

export function getAllBookSlugs(): string[] {
  return books.map((book) => book.slug);
}

export function getBookReflection(slug: string): string | null {
  const filePath = path.join(CONTENT_PATHS.readings, `${slug}.mdx`);

  if (!fileExists(filePath)) {
    return null;
  }

  const { content } = parseMDXFile(filePath);
  return content;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/constants/paths.ts src/lib/readings.ts
git commit -m "feat(readings): add lib functions and content path"
```

---

### Task 4: Add sample MDX reflection and book cover placeholder

**Files:**
- Create: `src/content/readings/atomic-habits.mdx`
- Create: `public/books/.gitkeep`

- [ ] **Step 1: Create readings content directory and sample MDX**

Create `src/content/readings/atomic-habits.mdx`:

```mdx
Changed how I think about building routines. The compound effect framing clicked for me more than any productivity book before. The idea that habits are not about having something but about becoming someone was the real takeaway.
```

- [ ] **Step 2: Create public/books directory**

```bash
mkdir -p public/books
touch public/books/.gitkeep
```

- [ ] **Step 3: Commit**

```bash
git add src/content/readings/atomic-habits.mdx public/books/.gitkeep
git commit -m "feat(readings): add sample reflection and book covers directory"
```

---

### Task 5: Add navigation and translation keys

**Files:**
- Modify: `src/constants/routes.ts`
- Modify: `src/messages/en.json`
- Modify: `src/messages/de.json`
- Modify: `src/components/ui/BackLink.tsx`

- [ ] **Step 1: Add readings to routes**

In `src/constants/routes.ts`:

```typescript
export const STATIC_ROUTES = ["", "/experience", "/blog", "/projects", "/readings"] as const;

export type TStaticRoute = (typeof STATIC_ROUTES)[number];

export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "blog", href: "/blog" },
  { key: "experience", href: "/experience" },
  { key: "projects", href: "/projects" },
  { key: "readings", href: "/readings" },
] as const;

export type TNavLink = (typeof NAV_LINKS)[number];
```

- [ ] **Step 2: Add translation keys to en.json**

Add `"readings"` to the `nav` object:

```json
"nav": {
  ...existing keys,
  "readings": "Readings"
}
```

Add new top-level `readings` section:

```json
"readings": {
  "title": "Readings",
  "description": "Books that shaped my thinking",
  "currentlyReading": "Currently Reading",
  "books": "{count} {count, plural, one {book} other {books}}",
  "backToReadings": "Back to Readings",
  "myThoughts": "My Thoughts"
}
```

Add metadata keys:

```json
"metadata": {
  ...existing keys,
  "readingsTitle": "Readings - Roman Frolov",
  "readingsDescription": "Books I've read with personal reflections."
}
```

- [ ] **Step 3: Add translation keys to de.json**

Add `"readings"` to the `nav` object:

```json
"nav": {
  ...existing keys,
  "readings": "Readings"
}
```

Add new top-level `readings` section (keep English since content is English-only):

```json
"readings": {
  "title": "Readings",
  "description": "Books that shaped my thinking",
  "currentlyReading": "Currently Reading",
  "books": "{count} {count, plural, one {book} other {books}}",
  "backToReadings": "Back to Readings",
  "myThoughts": "My Thoughts"
}
```

Add metadata keys:

```json
"metadata": {
  ...existing keys,
  "readingsTitle": "Readings - Roman Frolov",
  "readingsDescription": "Books I've read with personal reflections."
}
```

- [ ] **Step 4: Update BackLink to accept /readings**

In `src/components/ui/BackLink.tsx`, update the `href` type:

```typescript
type TProps = {
  href: "/blog" | "/projects" | "/readings" | "/";
  children: string;
};
```

- [ ] **Step 5: Commit**

```bash
git add src/constants/routes.ts src/messages/en.json src/messages/de.json src/components/ui/BackLink.tsx
git commit -m "feat(readings): add navigation, translations, and route config"
```

---

### Task 6: Create BookCard component

**Files:**
- Create: `src/components/sections/Readings/BookCard.tsx`

- [ ] **Step 1: Create BookCard component**

Create `src/components/sections/Readings/BookCard.tsx`:

```tsx
"use client";

import { memo } from "react";

import Image from "next/image";

import { AnimatedCard, Tag } from "@/components/ui";
import { TBook } from "@/types";

type TProps = {
  book: TBook;
  index: number;
};

export const BookCard = memo(function BookCard({ book, index }: TProps) {
  const date = new Date(book.dateRead + "-01");
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <AnimatedCard index={index} href={`/readings/${book.slug}`} internal>
      <div className="flex gap-3">
        <div className="relative h-[72px] w-[48px] flex-shrink-0 overflow-hidden rounded-sm">
          <Image
            src={book.cover}
            alt={`${book.title} cover`}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <div>
            <h3 className="font-medium text-sm">{book.title}</h3>
            <p className="text-xs text-muted-foreground">{book.author}</p>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{book.description}</p>
          <div className="mt-auto flex items-center justify-between pt-1">
            {book.tags[0] && <Tag size="sm">{book.tags[0]}</Tag>}
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
});
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Readings/BookCard.tsx
git commit -m "feat(readings): add BookCard component"
```

---

### Task 7: Create CurrentlyReading component

**Files:**
- Create: `src/components/sections/Readings/CurrentlyReading.tsx`

- [ ] **Step 1: Create CurrentlyReading component**

Create `src/components/sections/Readings/CurrentlyReading.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { ArrowRight } from "lucide-react";

import { CARD_BASE, CARD_BORDER, CARD_HOVER, ICON_SIZE } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { TBook } from "@/types";

type TProps = {
  book: TBook;
};

export function CurrentlyReading({ book }: TProps) {
  const t = useTranslations("readings");

  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
        {t("currentlyReading")}
      </p>
      <Link href={`/readings/${book.slug}`}>
        <div
          className={cn(
            "group flex items-center gap-4",
            CARD_BASE,
            CARD_HOVER,
            CARD_BORDER.featured
          )}
        >
          <div className="relative h-[86px] w-[60px] flex-shrink-0 overflow-hidden rounded-sm">
            <Image
              src={book.cover}
              alt={`${book.title} cover`}
              fill
              className="object-cover"
              sizes="60px"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{book.description}</p>
          </div>
          <ArrowRight
            className={cn(
              ICON_SIZE.md,
              "flex-shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
            )}
          />
        </div>
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Readings/CurrentlyReading.tsx
git commit -m "feat(readings): add CurrentlyReading banner component"
```

---

### Task 8: Create ReadingsList component

**Files:**
- Create: `src/components/sections/Readings/ReadingsList.tsx`

- [ ] **Step 1: Create ReadingsList component**

Create `src/components/sections/Readings/ReadingsList.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { TBook } from "@/types";

import { BookCard } from "./BookCard";
import { CurrentlyReading } from "./CurrentlyReading";

type TProps = {
  booksByYear: [number, TBook[]][];
  currentlyReading: TBook | undefined;
};

export function ReadingsList({ booksByYear, currentlyReading }: TProps) {
  const t = useTranslations("readings");

  return (
    <section className="min-h-[calc(100vh-4rem)] py-12 lg:py-16">
      <Container>
        <AnimatedSection className="space-y-12">
          <SectionHeader title={t("title")} description={t("description")} as="h1" />

          {currentlyReading && <CurrentlyReading book={currentlyReading} />}

          {booksByYear.map(([year, books]) => (
            <div key={year} className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {year} · {t("books", { count: books.length })}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {books.map((book, index) => (
                  <BookCard key={book.slug} book={book} index={index} />
                ))}
              </div>
            </div>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Readings/ReadingsList.tsx
git commit -m "feat(readings): add ReadingsList component with year grouping"
```

---

### Task 9: Create barrel export for Readings section

**Files:**
- Create: `src/components/sections/Readings/index.ts`

- [ ] **Step 1: Create barrel export**

Create `src/components/sections/Readings/index.ts`:

```typescript
export { BookCard } from "./BookCard";
export { CurrentlyReading } from "./CurrentlyReading";
export { ReadingsList } from "./ReadingsList";
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Readings/index.ts
git commit -m "feat(readings): add Readings section barrel export"
```

---

### Task 10: Create readings listing page

**Files:**
- Create: `src/app/[locale]/readings/page.tsx`

- [ ] **Step 1: Create the listing page**

Create `src/app/[locale]/readings/page.tsx`:

```tsx
import { Metadata } from "next";

import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { ReadingsList } from "@/components/sections/Readings";
import { SITE_URL } from "@/constants";
import { isLocale, locales } from "@/i18n/config";
import { getBooksByYear, getCurrentlyReading } from "@/lib/readings";

type TProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  const url = `${SITE_URL}/${locale}/readings`;

  return {
    title: t("readingsTitle"),
    description: t("readingsDescription"),
    openGraph: {
      title: t("readingsTitle"),
      description: t("readingsDescription"),
      url,
      type: "website",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ReadingsPage({ params }: TProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  setRequestLocale(locale);

  const booksByYear = [...getBooksByYear().entries()];
  const currentlyReading = getCurrentlyReading();

  return (
    <main className="pt-16">
      <ReadingsList booksByYear={booksByYear} currentlyReading={currentlyReading} />
    </main>
  );
}
```

- [ ] **Step 2: Verify the dev server runs**

```bash
bun run build
```

Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\\[locale\\]/readings/page.tsx
git commit -m "feat(readings): add readings listing page"
```

---

### Task 11: Create BookDetail component

**Files:**
- Create: `src/components/sections/Readings/BookDetail.tsx`

- [ ] **Step 1: Create BookDetail component**

Create `src/components/sections/Readings/BookDetail.tsx`:

```tsx
"use client";

import { ReactNode } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

import { BackLink, Container, Tag } from "@/components/ui";
import { ANIMATION_DURATION, TEXT_SIZE } from "@/constants";
import { cn } from "@/lib/utils";
import { TBook } from "@/types";

type TProps = {
  book: TBook;
  children: ReactNode;
};

export function BookDetail({ book, children }: TProps) {
  const t = useTranslations("readings");

  const date = new Date(book.dateRead + "-01");
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.slower }}
          className="max-w-2xl space-y-8"
        >
          <BackLink href="/readings">{t("backToReadings")}</BackLink>

          <header className="flex gap-6">
            <div className="relative h-[220px] w-[150px] flex-shrink-0 overflow-hidden rounded">
              <Image
                src={book.cover}
                alt={`${book.title} cover`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>
            <div className="space-y-3">
              <h1 className={cn("font-semibold tracking-tight", TEXT_SIZE.title)}>{book.title}</h1>
              <p className="text-muted-foreground">{book.author}</p>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
              <div className="flex flex-wrap gap-1.5">
                {book.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </header>

          <p className="text-muted-foreground">{book.description}</p>

          <hr className="border-muted" />

          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              {t("myThoughts")}
            </p>
            <div className="prose-custom">{children}</div>
          </div>
        </motion.article>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Update barrel export**

Add to `src/components/sections/Readings/index.ts`:

```typescript
export { BookDetail } from "./BookDetail";
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Readings/BookDetail.tsx src/components/sections/Readings/index.ts
git commit -m "feat(readings): add BookDetail component with sidebar cover layout"
```

---

### Task 12: Create book detail page route

**Files:**
- Create: `src/app/[locale]/readings/[slug]/page.tsx`

- [ ] **Step 1: Create the detail page**

Create `src/app/[locale]/readings/[slug]/page.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\\[locale\\]/readings/\\[slug\\]/page.tsx
git commit -m "feat(readings): add book detail page with MDX reflections"
```

---

### Task 13: Add readings to sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update sitemap**

In `src/app/sitemap.ts`, add import and readings URL generation:

Add import:
```typescript
import { getBooks } from "@/lib/readings";
```

Add after `projectUrls`:
```typescript
const readingUrls = locales.flatMap((locale) =>
  getBooks()
    .filter((book) => book.status === "finished")
    .map((book) => ({
      url: `${SITE_URL}/${locale}/readings/${book.slug}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
);
```

Update return:
```typescript
return [...staticUrls, ...blogUrls, ...projectUrls, ...readingUrls];
```

- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(readings): add book pages to sitemap"
```

---

### Task 14: Add JSON-LD schema for book detail pages

**Files:**
- Modify: `src/lib/jsonld.ts`
- Modify: `src/app/[locale]/readings/[slug]/page.tsx`

- [ ] **Step 1: Add book review schema generator**

Add to `src/lib/jsonld.ts`:

```typescript
import { TBlogPostMeta, TBook, TProjectDetailMeta } from "@/types";

// ... existing functions ...

export function generateBookReviewSchema(book: TBook, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Book",
      name: book.title,
      author: {
        "@type": "Person",
        name: book.author,
      },
    },
    author: {
      "@type": "Person",
      name: "Roman Frolov",
      url: SITE_URL,
    },
    url: `${SITE_URL}/${locale}/readings/${book.slug}`,
    inLanguage: "en-US",
  };
}
```

- [ ] **Step 2: Add JsonLd to detail page**

In `src/app/[locale]/readings/[slug]/page.tsx`, add import:

```typescript
import { JsonLd } from "@/components/seo";
import { generateBookReviewSchema } from "@/lib/jsonld";
```

Add before `<BookDetail>` in the return:

```tsx
<JsonLd data={generateBookReviewSchema(book, locale)} />
```

- [ ] **Step 3: Verify build**

```bash
bun run build
```

Expected: build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/jsonld.ts src/app/\\[locale\\]/readings/\\[slug\\]/page.tsx
git commit -m "feat(readings): add JSON-LD book review schema"
```

---

### Task 15: Final verification

- [ ] **Step 1: Run lint**

```bash
bun run lint
```

Expected: no errors.

- [ ] **Step 2: Run build**

```bash
bun run build
```

Expected: build succeeds, `/en/readings` and `/en/readings/atomic-habits` are generated.

- [ ] **Step 3: Manual smoke test**

```bash
bun run dev
```

Verify:
- `/en/readings` shows the listing page with "Atomic Habits" card
- Clicking the card navigates to `/en/readings/atomic-habits`
- Detail page shows cover placeholder, title, author, date, tags, description, and reflection
- "Back to Readings" link works
- Navigation bar shows "Readings" link
- Both `/en/readings` and `/de/readings` routes work
