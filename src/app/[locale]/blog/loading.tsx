import { CardSkeleton, Container, Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <main className="pt-16">
      <section className="min-h-[calc(100vh-4rem)] py-12 lg:py-16">
        <Container>
          <div className="space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-5 w-64" />
                </div>
                <Skeleton className="h-9 w-20" />
              </div>

              {/* Search */}
              <Skeleton className="h-10 w-full max-w-md" />

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-16 rounded-full" />
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
