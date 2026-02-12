import { JetBrains_Mono } from "next/font/google";

import { RootNotFoundContent } from "@/components/sections/NotFound";

import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootNotFound() {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-mono antialiased">
        <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
          <RootNotFoundContent />
        </main>
      </body>
    </html>
  );
}
