import { Container, Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <main className="pt-16">
      {/* Hero skeleton */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16 lg:py-20">
        <Container>
          <div className="space-y-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-20 w-full max-w-xl" />
          </div>
        </Container>
      </section>
    </main>
  );
}
