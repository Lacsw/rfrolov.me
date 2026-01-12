import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <Skills />
      <FeaturedProjects />
      <Contact />
    </main>
  );
}
