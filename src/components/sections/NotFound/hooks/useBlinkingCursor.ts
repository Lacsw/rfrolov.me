import { useEffect } from "react";

import { useToggle } from "@/hooks";

import { CURSOR_BLINK_INTERVAL } from "../constants";

export function useBlinkingCursor() {
  const [showCursor, { toggle }] = useToggle(true);

  useEffect(() => {
    const interval = setInterval(toggle, CURSOR_BLINK_INTERVAL);

    return () => clearInterval(interval);
  }, [toggle]);

  return showCursor;
}
