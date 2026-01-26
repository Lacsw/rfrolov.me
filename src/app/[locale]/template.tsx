"use client";

import { ReactNode } from "react";

import { PageTransition } from "@/components/ui";

type TProps = {
  children: ReactNode;
};

export default function Template({ children }: TProps) {
  return <PageTransition>{children}</PageTransition>;
}
