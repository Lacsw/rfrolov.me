import { useMemo } from "react";

import { TCommand } from "../types";

type TGroupedCommands = {
  recent: TCommand[];
  navigation: TCommand[];
  actions: TCommand[];
  blog: TCommand[];
};

type TUseCommandFilterOptions = {
  recentIds?: string[];
};

export function useCommandFilter(
  commands: TCommand[],
  query: string,
  { recentIds = [] }: TUseCommandFilterOptions = {}
) {
  const filteredCommands = useMemo(() => {
    if (!query) return commands;

    return commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));
  }, [commands, query]);

  const groupedCommands = useMemo<TGroupedCommands>(() => {
    const navigation = filteredCommands.filter((cmd) => cmd.group === "navigation");
    const actions = filteredCommands.filter((cmd) => cmd.group === "actions");
    const blog = filteredCommands.filter((cmd) => cmd.group === "blog");

    // Recent only surfaces when there's no active query — when the user is
    // searching they want the literal match list, not a top-of-list shortcut.
    const recent = query
      ? []
      : recentIds
          .map((id) => commands.find((cmd) => cmd.id === id))
          .filter((cmd): cmd is TCommand => Boolean(cmd));

    return { recent, navigation, actions, blog };
  }, [filteredCommands, commands, query, recentIds]);

  const flatCommands = useMemo(
    () => [
      ...groupedCommands.recent,
      ...groupedCommands.navigation,
      ...groupedCommands.actions,
      ...groupedCommands.blog,
    ],
    [groupedCommands]
  );

  return { groupedCommands, flatCommands };
}
