import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ROUTES, type TerminalLine } from "../constants";

export function useTerminalInput() {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [commandResult, setCommandResult] = useState<TerminalLine | null>(null);
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
      for (const route of ROUTES) {
        if (route.path.startsWith(pathInput) && route.path !== pathInput) {
          setSuggestion(route.path.slice(pathInput.length));
          return;
        }
      }
    }

    setSuggestion("");
  }, [inputValue]);

  const executeCommand = useCallback(
    (command: string) => {
      const cmd = command.trim();

      if (!cmd) return;

      // Parse command - expect "cd /path" format
      const cdMatch = cmd.match(/^cd\s+(.+)$/);
      if (cdMatch) {
        const path = cdMatch[1];
        const matchedRoute = ROUTES.find((r) => r.path === path);

        if (matchedRoute) {
          setCommandResult({ type: "success", text: `Navigating to ${matchedRoute.path}...` });
          setTimeout(() => router.push(matchedRoute.path), 500);
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
