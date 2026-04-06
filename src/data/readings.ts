import { TBook } from "@/types";

export const books: TBook[] = [
  {
    slug: "the-internet-of-money-two",
    title: "The Internet of Money Volume Two",
    author: "Andreas M. Antonopoulos",
    cover: "/books/the-internet-of-money-two.jpg",
    description:
      "A collection of talks exploring the why of Bitcoin and open blockchains, covering their philosophical, social, and historical implications.",
    dateRead: "2026-04",
    tags: ["crypto", "technology"],
    rating: 0,
    status: "reading",
  },
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
