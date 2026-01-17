import { TBlogPostMeta } from "@/types";

const BASE_URL = "https://rfrolov.me";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Roman Frolov",
    url: BASE_URL,
    jobTitle: "Frontend Developer",
    sameAs: [
      "https://github.com/Lacsw",
      "https://www.linkedin.com/in/r-frolov",
    ],
  };
}

export function generateBlogPostSchema(post: TBlogPostMeta, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Roman Frolov",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Roman Frolov",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    // Approximate word count based on reading time (200 words per minute)
    wordCount: post.readingTime * 200,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Roman Frolov",
    url: BASE_URL,
    author: {
      "@type": "Person",
      name: "Roman Frolov",
    },
  };
}
