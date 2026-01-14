import { Container } from "@/components/ui";
import { HeroContent, HeroImage } from "./components";

export function Hero() {
  return (
    <section className="py-8 lg:py-10">
      <Container>
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          <HeroContent />
          <HeroImage />
        </div>
      </Container>
    </section>
  );
}
