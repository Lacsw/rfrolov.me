import { Container } from "@/components/ui/Container";
import { HeroContent, HeroImage } from "./components";

export function Hero() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          <HeroContent />
          <HeroImage />
        </div>
      </Container>
    </section>
  );
}
