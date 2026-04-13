"use client";

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { TactileContext, TTactileContextValue } from "@/hooks/useTactile";

const STORAGE_KEY = "rf-tactile";
const DISABLED_KEY = "rf-tactile-disabled";

function readDisabledFromStorage(): Set<string> {
  if (typeof window === "undefined") return new Set();

  try {
    const raw = window.localStorage.getItem(DISABLED_KEY);

    if (!raw) return new Set();
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((v): v is string => typeof v === "string"));
    }
  } catch {
    /* ignore */
  }

  return new Set();
}

function readDisabledFromUrl(): Set<string> {
  if (typeof window === "undefined") return new Set();

  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("tactile-off");

    if (!raw) return new Set();

    return new Set(raw.split(",").map((s) => s.trim()).filter(Boolean));
  } catch {
    return new Set();
  }
}

function writeDisabledToStorage(set: Set<string>) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(DISABLED_KEY, JSON.stringify(Array.from(set)));
  } catch {
    /* ignore */
  }
}

function syncDocumentAttribute(tactile: boolean) {
  if (typeof document === "undefined") return;

  if (tactile) {
    document.documentElement.setAttribute("data-tactile", "on");
  } else {
    document.documentElement.removeAttribute("data-tactile");
  }
}

type TProps = {
  children: ReactNode;
};

export function TactileProvider({ children }: TProps) {
  const [tactile, setTactileState] = useState(false);
  const [storageDisabled, setStorageDisabled] = useState<Set<string>>(readDisabledFromStorage);
  const [urlDisabled] = useState<Set<string>>(readDisabledFromUrl);

  // Hydrate the tactile boolean on mount. The disabled sets are lazy-initialized above.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved === "on") {
        setTactileState(true);
        syncDocumentAttribute(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persistTactile = useCallback((value: boolean) => {
    syncDocumentAttribute(value);

    try {
      if (value) {
        window.localStorage.setItem(STORAGE_KEY, "on");
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setTactile = useCallback((value: boolean) => {
    setTactileState(value);
    persistTactile(value);
  }, [persistTactile]);

  const toggleTactile = useCallback(() => {
    setTactileState((prev) => {
      const next = !prev;

      persistTactile(next);

      return next;
    });
  }, [persistTactile]);

  const disableSurface = useCallback((surfaceId: string) => {
    setStorageDisabled((prev) => {
      if (prev.has(surfaceId)) return prev;
      const next = new Set(prev);
      next.add(surfaceId);
      writeDisabledToStorage(next);

      return next;
    });
  }, []);

  const enableSurface = useCallback((surfaceId: string) => {
    setStorageDisabled((prev) => {
      if (!prev.has(surfaceId)) return prev;
      const next = new Set(prev);
      next.delete(surfaceId);
      writeDisabledToStorage(next);

      return next;
    });
  }, []);

  // Shift+T global keyboard shortcut.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (target?.isContentEditable) return;

      if (
        event.shiftKey &&
        (event.key === "T" || event.key === "t") &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        event.preventDefault();
        toggleTactile();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTactile]);

  // window.__rfTactile escape hatch (power user / debugging).
  useEffect(() => {
    type RfTactileGlobal = {
      disable: (surfaceId: string) => void;
      enable: (surfaceId: string) => void;
      reset: () => void;
    };
    const api: RfTactileGlobal = {
      disable: disableSurface,
      enable: enableSurface,
      reset: () => {
        setStorageDisabled(new Set());
        writeDisabledToStorage(new Set());
      },
    };
    (window as unknown as { __rfTactile: RfTactileGlobal }).__rfTactile = api;

    return () => {
      delete (window as unknown as { __rfTactile?: RfTactileGlobal }).__rfTactile;
    };
  }, [disableSurface, enableSurface]);

  // Combined disabled set: localStorage + URL.
  const disabledSurfaces = useMemo<ReadonlySet<string>>(() => {
    if (urlDisabled.size === 0) return storageDisabled;
    const merged = new Set<string>(storageDisabled);

    urlDisabled.forEach((id) => merged.add(id));

    return merged;
  }, [storageDisabled, urlDisabled]);

  const value = useMemo<TTactileContextValue>(
    () => ({
      tactile,
      toggleTactile,
      setTactile,
      disabledSurfaces,
      disableSurface,
      enableSurface,
    }),
    [tactile, toggleTactile, setTactile, disabledSurfaces, disableSurface, enableSurface]
  );

  return <TactileContext.Provider value={value}>{children}</TactileContext.Provider>;
}
