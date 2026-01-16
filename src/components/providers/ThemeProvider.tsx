"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

type TThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: TThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
