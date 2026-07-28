"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "./LocaleProvider";
import { MetadataUpdater } from "./MetadataUpdater";
import { ThemeProvider } from "./ThemeProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <LocaleProvider>
      <MetadataUpdater />
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </LocaleProvider>
  );
}
