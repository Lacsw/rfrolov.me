import { Container } from "@/components/ui/Container";
import { HeroContent, HeroImage } from "./components";

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center py-20 lg:py-32">
      <Container>
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          <HeroContent />
          <HeroImage />
        </div>
      </Container>
    </section>
  );
}
