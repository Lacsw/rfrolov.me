"use client";

import { useEffect } from "react";

import { AlertCircle, RotateCcw } from "lucide-react";

type TProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: TProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 font-mono antialiased flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-neutral-800 overflow-hidden bg-neutral-900">
            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800 border-b border-neutral-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-neutral-400 ml-2">terminal — error</span>
            </div>

            <div className="p-6 text-sm space-y-4">
              <div className="flex items-center gap-3 text-red-500">
                <AlertCircle className="h-6 w-6 shrink-0" />
                <span className="font-semibold">Something went wrong</span>
              </div>

              <p className="text-neutral-400 text-xs leading-relaxed">
                A critical error occurred. Please try again.
              </p>

              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs bg-white text-black cursor-pointer hover:opacity-90 transition-opacity"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
