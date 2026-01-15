import { useCallback, useEffect, useState } from "react";

import { useRouter } from "@/i18n/routing";

import { type TTerminalLine } from "../constants";

const ROUTES = ["/", "/projects"];

export function useTerminalInput() {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [commandResult, setCommandResult] = useState<TTerminalLine | null>(null);
  const router = useRouter();

  // Update suggestion based on input
  useEffect(() => {
    if (!inputValue) {
      setSuggestion("");

      return;
    }

    const input = inputValue.toLowerCase();

    // Suggest "cd" command
    if ("cd".startsWith(input) && input !== "cd") {
      setSuggestion("cd".slice(input.length) + " /");

      return;
    }

    // If typing "cd " or "cd /...", suggest paths
    const cdMatch = input.match(/^cd\s+(.*)$/);

    if (cdMatch) {
      const pathInput = cdMatch[1];

      for (const path of ROUTES) {
        if (path.startsWith(pathInput) && path !== pathInput) {
          setSuggestion(path.slice(pathInput.length));

          return;
        }
      }
    }

    setSuggestion("");
  }, [inputValue]);

  const executeCommand = useCallback(
    (command: string) => {
      const cmd = command.trim();

      if (!cmd) {return;}

      // Parse command - expect "cd /path" format
      const cdMatch = cmd.match(/^cd\s+(.+)$/);

      if (cdMatch) {
        const path = cdMatch[1];
        const isValidPath = ROUTES.includes(path);

        if (isValidPath) {
          setCommandResult({ type: "success", text: `Navigating to ${path}...` });
          setTimeout(() => router.push(path as "/" | "/projects"), 500);
        } else {
          setCommandResult({ type: "error", text: `bash: cd: ${path}: No such file or directory` });
        }
      } else {
        setCommandResult({ type: "error", text: `bash: ${cmd.split(" ")[0]}: command not found` });
      }
    },
    [router]
  );

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setCommandResult(null);
  }, []);

  const handleSubmit = useCallback(() => {
    executeCommand(inputValue);
    setInputValue("");
    setSuggestion("");
  }, [executeCommand, inputValue]);

  const handleTabComplete = useCallback(() => {
    if (suggestion) {
      setInputValue(inputValue + suggestion);
      setSuggestion("");
    }
  }, [inputValue, suggestion]);

  return {
    inputValue,
    suggestion,
    commandResult,
    handleInputChange,
    handleSubmit,
    handleTabComplete,
  };
}
