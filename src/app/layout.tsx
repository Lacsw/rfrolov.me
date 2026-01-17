import type { ReactNode } from "react";

import { JetBrains_Mono } from "next/font/google";

import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

type TProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: TProps) {
  return (
    <html className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-mono antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
