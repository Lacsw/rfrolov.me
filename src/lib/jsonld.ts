import { SITE_URL } from "@/constants";
import { TBlogPostMeta, TProjectDetailMeta } from "@/types";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Roman Frolov",
    url: SITE_URL,
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
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Roman Frolov",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${post.slug}`,
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
    url: SITE_URL,
    author: {
      "@type": "Person",
      name: "Roman Frolov",
    },
  };
}

export function generateExperiencePageSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Roman Frolov",
      url: SITE_URL,
      jobTitle: "Frontend Developer",
      hasOccupation: {
        "@type": "Occupation",
        name: "Frontend Developer",
        occupationLocation: {
          "@type": "City",
          name: "Berlin",
        },
        skills: "React, TypeScript, Next.js, Tailwind CSS, Node.js",
      },
    },
    url: `${SITE_URL}/${locale}/experience`,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
  };
}

export function generateProjectJsonLd(project: TProjectDetailMeta, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.longDescription || project.description,
    applicationCategory: "WebApplication",
    author: {
      "@type": "Person",
      name: "Roman Frolov",
      url: SITE_URL,
    },
    dateCreated: `${project.year}-01-01`,
    url: project.href || `${SITE_URL}/${locale}/projects/${project.id}`,
    ...(project.github && { codeRepository: project.github }),
    keywords: project.technologies.join(", "),
    inLanguage: locale === "de" ? "de-DE" : "en-US",
  };
}
