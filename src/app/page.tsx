import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { BlogList } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { getFeaturedPosts } from "@/lib/blog";

export default function Home() {
  const featuredPosts = getFeaturedPosts(2);

  return (
    <main className="pt-16">
      <Hero />
      <Skills />
      <Experience />
      <FeaturedProjects />
      <BlogList posts={featuredPosts} />
      <Contact />
    </main>
  );
}
