import { useState, useEffect } from "react";

import { CURSOR_BLINK_INTERVAL } from "../constants";

export function useBlinkingCursor() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), CURSOR_BLINK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return showCursor;
}
