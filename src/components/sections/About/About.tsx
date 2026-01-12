import { Container } from "@/components/ui/Container";
import { AboutContent } from "./components";

export function About() {
  return (
    <section className="min-h-[calc(100vh-4rem)] pt-8 pb-20 lg:pt-12 lg:pb-32">
      <Container>
        <AboutContent />
      </Container>
    </section>
  );
}
