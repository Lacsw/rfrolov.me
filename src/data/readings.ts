import { TBook } from "@/types";

export const books: TBook[] = [
  {
    slug: "philosophy-of-bitcoin",
    title: "The Philosophy of Bitcoin",
    author: "Álvaro D. María",
    isbn: "9798987636428",
    cover: "/books/philosophy-of-bitcoin.webp",
    description:
      "A philosophical exploration of Bitcoin — what money is, the crisis of state-backed currencies, and why digital scarcity independent of any third party matters.",
    dateRead: "2026-06",
    tags: ["bitcoin", "crypto", "philosophy"],
    rating: 0,
    status: "reading",
  },
  {
    slug: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "0132350882",
    cover: "/books/clean-code.webp",
    description:
      "A handbook of agile software craftsmanship — principles, patterns, and practices for writing code that humans can read and maintain.",
    dateRead: "2025-11",
    tags: ["programming", "engineering"],
    rating: 0,
    status: "finished",
  },
  {
    slug: "the-internet-of-money-two",
    title: "The Internet of Money Volume Two",
    author: "Andreas M. Antonopoulos",
    isbn: "194791006X",
    cover: "/books/the-internet-of-money-two.webp",
    description:
      "A collection of talks exploring the why of Bitcoin and open blockchains, covering their philosophical, social, and historical implications.",
    dateRead: "2026-05",
    tags: ["bitcoin", "crypto", "technology"],
    rating: 0,
    status: "finished",
  },
  {
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "0735211299",
    cover: "/books/atomic-habits.webp",
    description:
      "An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.",
    dateRead: "2025-01",
    tags: ["self-improvement"],
    rating: 4,
    status: "finished",
  },
];
