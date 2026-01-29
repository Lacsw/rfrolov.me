import { useMemo } from "react";

import { TCommand } from "../types";

export type TGroupedCommands = {
  navigation: TCommand[];
  actions: TCommand[];
  blog: TCommand[];
};

export function useCommandFilter(commands: TCommand[], query: string) {
  const filteredCommands = useMemo(() => {
    if (!query) return commands;

    return commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));
  }, [commands, query]);

  const groupedCommands = useMemo(() => {
    const navigation = filteredCommands.filter((cmd) => cmd.group === "navigation");
    const actions = filteredCommands.filter((cmd) => cmd.group === "actions");
    const blog = filteredCommands.filter((cmd) => cmd.group === "blog");

    return { navigation, actions, blog };
  }, [filteredCommands]);

  const flatCommands = useMemo(
    () => [...groupedCommands.navigation, ...groupedCommands.actions, ...groupedCommands.blog],
    [groupedCommands]
  );

  return { filteredCommands, groupedCommands, flatCommands };
}
