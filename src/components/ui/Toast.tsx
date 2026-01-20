"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

type TToast = {
  id: number;
  message: string;
};

type TToastContext = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<TToastContext | null>(null);

const TOAST_DURATION_MS = 2000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<TToast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg border border-muted bg-background px-4 py-2 shadow-lg"
            >
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
