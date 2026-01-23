"use client";

import { NextIntlClientProvider } from "next-intl";

import { ThemeProvider } from "@/components/providers";
import { NotFoundTerminal } from "@/components/sections/NotFound";
import messages from "@/messages/en.json";

export default function RootNotFound() {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <ThemeProvider>
        <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-background">
          <NotFoundTerminal />
        </main>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
