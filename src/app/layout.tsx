import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Roman Frolov - Frontend Developer",
  description:
    "Personal website of Roman Frolov, a frontend developer specializing in React, TypeScript, and modern web technologies.",
  keywords: ["frontend developer", "React", "TypeScript", "web development"],
  authors: [{ name: "Roman Frolov" }],
  openGraph: {
    title: "Roman Frolov - Frontend Developer",
    description: "Personal website of Roman Frolov",
    url: "https://rfrolov.me",
    siteName: "Roman Frolov",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Frolov - Frontend Developer",
    description: "Personal website of Roman Frolov",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="min-h-screen bg-background font-mono antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
