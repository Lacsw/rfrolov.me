import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const FILENAME_REGEX = /^(\d+)_(.+)\.(en|de)\.mdx$/;

type TArticleInfo = {
  order: number;
  slug: string;
  hasEn: boolean;
  hasDe: boolean;
};

function checkArticles(): void {
  if (!fs.existsSync(BLOG_DIR)) {
    console.log("Blog directory not found");
    return;
  }

  const files = fs.readdirSync(BLOG_DIR);
  const articles = new Map<string, TArticleInfo>();

  for (const file of files) {
    const match = file.match(FILENAME_REGEX);

    if (!match) {
      continue;
    }

    const order = parseInt(match[1], 10);
    const slug = match[2];
    const locale = match[3];
    const key = `${order}_${slug}`;

    if (!articles.has(key)) {
      articles.set(key, { order, slug, hasEn: false, hasDe: false });
    }

    const article = articles.get(key)!;

    if (locale === "en") {
      article.hasEn = true;
    } else if (locale === "de") {
      article.hasDe = true;
    }
  }

  const sorted = Array.from(articles.values()).sort((a, b) => a.order - b.order);

  let hasErrors = false;
  const missingEn: TArticleInfo[] = [];
  const missingDe: TArticleInfo[] = [];

  for (const article of sorted) {
    if (!article.hasEn) {
      missingEn.push(article);
      hasErrors = true;
    }

    if (!article.hasDe) {
      missingDe.push(article);
      hasErrors = true;
    }
  }

  console.log(`Found ${articles.size} articles\n`);

  if (missingEn.length > 0) {
    console.log("Missing EN translations:");

    for (const a of missingEn) {
      console.log(`  ${a.order.toString().padStart(3, "0")}_${a.slug}.en.mdx`);
    }

    console.log();
  }

  if (missingDe.length > 0) {
    console.log("Missing DE translations:");

    for (const a of missingDe) {
      console.log(`  ${a.order.toString().padStart(3, "0")}_${a.slug}.de.mdx`);
    }

    console.log();
  }

  if (!hasErrors) {
    console.log("All articles have both EN and DE translations!");
  }

  // Show summary
  console.log("\nArticles:");

  for (const article of sorted) {
    const enStatus = article.hasEn ? "EN" : "--";
    const deStatus = article.hasDe ? "DE" : "--";
    console.log(`  ${article.order.toString().padStart(3, "0")} ${article.slug} [${enStatus}|${deStatus}]`);
  }

  if (hasErrors) {
    process.exit(1);
  }
}

checkArticles();
