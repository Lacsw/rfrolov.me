"use client";

import { NextIntlClientProvider } from "next-intl";

import messages from "@/messages/en.json";

import { NotFoundTerminal } from "./NotFoundTerminal";

export function RootNotFoundContent() {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <NotFoundTerminal />
    </NextIntlClientProvider>
  );
}
