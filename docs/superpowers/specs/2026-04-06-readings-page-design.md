# Readings Page — Design Spec

A new "Readings" section for the portfolio to track books read, with covers, descriptions, and personal reflections.

## Purpose

Personal archive of books read, with short reflections on each. Primarily for the author to review in the past, secondarily for visitors to browse.

## Routes

English only — no locale data variants needed.

- **`/en/readings`** — listing page
- **`/en/readings/[slug]`** — individual book detail page

## Data Model

### Type Definition

```typescript
// src/types/index.ts
type TBook = {
  slug: string;
  title: string;
  author: string;
  cover: string;          // relative path: "/books/atomic-habits.jpg"
  description: string;    // short book description for listing cards
  dateRead: string;       // "2025-01" format (year-month)
  tags: string[];         // e.g. ["self-improvement", "habits"]
  rating: number;         // 1-5, stored but NOT displayed
  status: "reading" | "finished";
};
```

### Static Data

`src/data/readings.ts` — a single TypeScript file exporting `books: TBook[]`.

No locale splitting. No external API dependencies. Getter functions live in `src/lib/readings.ts`.

### Reflections (MDX)

Personal reflections stored as MDX files at `src/content/readings/{slug}.mdx`.

Frontmatter: none needed (all metadata lives in `readings.ts`). The MDX file is pure prose — the reflection text.

Parsed using the same `gray-matter` + `next-mdx-remote` pattern as blog posts and project details.

### Book Covers

Self-hosted in `public/books/{slug}.jpg`. Downloaded manually or via script. No runtime API calls.

## Listing Page (`/en/readings`)

### Structure

1. **Page header** — `SectionHeader` with title "Readings"
2. **Currently Reading banner** — renders only if a book has `status: "reading"`
   - Featured card: larger cover (60×86px area), title, author, short description, arrow link
   - Background card with border, visually separated from the grid below
   - Links to the book's detail page
3. **Year-grouped card grid** — finished books only
   - Grouped by year extracted from `dateRead`, most recent year first
   - Year heading with book count (e.g. "2025 · 4 books")
   - 2-column responsive grid (`grid-cols-1 md:grid-cols-2`)
   - Each card contains: small cover thumbnail, title, author, short description, one tag, date
   - Each card links to `/en/readings/[slug]`

### Card Design

Each book card:
- Background card with border (using existing `CARD_BASE` pattern)
- Small cover thumbnail (36×50px area) left-aligned
- Title (font-weight 600) and author (muted) beside cover
- Short description below (2-3 lines, muted text)
- Footer row: first tag as pill + date right-aligned

## Detail Page (`/en/readings/[slug]`)

### Structure

1. **Back link** — "← Back to readings" linking to `/en/readings`
2. **Sidebar cover layout**
   - Left: cover image (larger, ~150×220px)
   - Right: title (h1), author, date read, tags as pills
   - Below the two-column header: book description paragraph
3. **Divider**
4. **"My Thoughts" section**
   - Section label: uppercase "My Thoughts" (matching site's label style)
   - MDX-rendered content from `src/content/readings/{slug}.mdx`
   - Uses same MDX components as blog (paragraphs, emphasis, links)

### Metadata

Each detail page generates its own `<title>` and `<meta description>` from the book data.

## Components

```
src/components/sections/Readings/
├── index.ts                    # barrel export
├── ReadingsList.tsx            # listing page: currently reading + year grid
├── BookCard.tsx                # individual card in the grid
├── CurrentlyReading.tsx        # featured banner component
└── BookDetail.tsx              # detail page: sidebar cover + MDX reflection
```

All components are server components unless interactivity is needed. Use existing UI components (`Container`, `SectionHeader`, `AnimatedSection`, `Tag`).

## Navigation

Add to `src/constants/routes.ts`:
```typescript
NAV_LINKS: { key: "readings", href: "/readings" }
STATIC_ROUTES: add "/readings"
```

Add translation key to `src/messages/en.json`:
```json
{ "nav": { "readings": "Readings" } }
```

Add translation key to `src/messages/de.json` too (nav renders in both locales):
```json
{ "nav": { "readings": "Readings" } }
```

## Lib Functions

`src/lib/readings.ts`:
- `getBooks(): TBook[]` — all books
- `getBookBySlug(slug: string): TBook | undefined`
- `getCurrentlyReading(): TBook | undefined`
- `getBooksByYear(): Map<number, TBook[]>` — grouped and sorted
- `getBookReflection(slug: string): Promise<string>` — reads and parses MDX

## Animations

- Framer Motion stagger on the card grid (consistent with other sections)
- `AnimatedSection` wrapper on main content blocks
- Respects `prefers-reduced-motion`

## Sitemap & SEO

- Add `/en/readings` and individual book pages to `src/app/sitemap.ts`
- JSON-LD `Article` or `Review` schema on detail pages via `src/lib/jsonld.ts`

## Out of Scope

- German locale content
- Search or filter functionality
- Goodreads/external API integration
- Social sharing features
- Rating display
