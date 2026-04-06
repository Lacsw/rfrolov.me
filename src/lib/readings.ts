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
