import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const FILENAME_REGEX = /^(\d+)_(.+)\.(en|de)\.mdx$/;

function getNextOrderNumber(): number {
  if (!fs.existsSync(BLOG_DIR)) {
    return 1;
  }

  const files = fs.readdirSync(BLOG_DIR);
  let maxOrder = 0;

  for (const file of files) {
    const match = file.match(FILENAME_REGEX);

    if (match) {
      const order = parseInt(match[1], 10);
      maxOrder = Math.max(maxOrder, order);
    }
  }

  return maxOrder + 1;
}

function padOrder(order: number): string {
  return order.toString().padStart(3, "0");
}

function createArticle(slug: string): void {
  const order = getNextOrderNumber();
  const paddedOrder = padOrder(order);
  const today = new Date().toISOString().split("T")[0];

  const template = (locale: string) => `---
title: "${locale === "en" ? "Article Title" : "Artikeltitel"}"
description: "${locale === "en" ? "Article description" : "Artikelbeschreibung"}"
date: "${today}"
tags: []
draft: true
---

${locale === "en" ? "Write your article here..." : "Schreiben Sie Ihren Artikel hier..."}
`;

  const enPath = path.join(BLOG_DIR, `${paddedOrder}_${slug}.en.mdx`);
  const dePath = path.join(BLOG_DIR, `${paddedOrder}_${slug}.de.mdx`);

  if (fs.existsSync(enPath) || fs.existsSync(dePath)) {
    console.error(`Error: Article with slug "${slug}" already exists`);
    process.exit(1);
  }

  fs.writeFileSync(enPath, template("en"));
  fs.writeFileSync(dePath, template("de"));

  console.log(`Created new article (#${order}):`);
  console.log(`  ${paddedOrder}_${slug}.en.mdx`);
  console.log(`  ${paddedOrder}_${slug}.de.mdx`);
  console.log(`\nDon't forget to set draft: false when ready to publish!`);
}

// Main
const slug = process.argv[2];

if (!slug) {
  console.error("Usage: bun run blog:new <slug>");
  console.error("Example: bun run blog:new my-awesome-article");
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error("Error: Slug must contain only lowercase letters, numbers, and hyphens");
  process.exit(1);
}

createArticle(slug);
