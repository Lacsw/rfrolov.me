"use client";

import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { AboutContent } from "./components";

const TorusKnotScene = dynamic(
  () => import("./components/TorusKnotScene").then((mod) => mod.TorusKnotScene),
  { ssr: false }
);

export function About() {
  return (
    <section className="min-h-[calc(100vh-4rem)] pt-8 pb-20 lg:pt-12 lg:pb-32">
      <Container>
        <div className="space-y-8">
          <TorusKnotScene />
          <AboutContent />
        </div>
      </Container>
    </section>
  );
}
