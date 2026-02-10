"use client";

import { Suspense } from "react";

import { useCronitor } from "@cronitorio/cronitor-rum-nextjs";

function CronitorTracker() {
  useCronitor("cf5f8d50760561f9b66534d30b7d6f68");

  return null;
}

export function CronitorProvider() {
  return (
    <Suspense fallback={null}>
      <CronitorTracker />
    </Suspense>
  );
}
