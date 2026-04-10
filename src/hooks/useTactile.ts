"use client";

import { createContext, useContext } from "react";

export type TTactileContextValue = {
  tactile: boolean;
  toggleTactile: () => void;
  setTactile: (value: boolean) => void;
  disabledSurfaces: ReadonlySet<string>;
  disableSurface: (surfaceId: string) => void;
  enableSurface: (surfaceId: string) => void;
};

export const TactileContext = createContext<TTactileContextValue | null>(null);

export function useTactile(): TTactileContextValue {
  const ctx = useContext(TactileContext);

  if (!ctx) {
    throw new Error("useTactile must be used inside <TactileProvider>");
  }

  return ctx;
}

export function useTactileSurface(surfaceId: string): boolean {
  const { tactile, disabledSurfaces } = useTactile();

  return tactile && !disabledSurfaces.has(surfaceId);
}
