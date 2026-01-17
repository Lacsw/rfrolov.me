import { cn } from "@/lib/utils";

const INDICATOR_SIZE = "h-2 w-2";

type TLiveIndicatorProps = {
  isLive?: boolean;
};

export function LiveIndicator({ isLive = false }: TLiveIndicatorProps) {
  if (isLive) {
    return (
      <span className={cn("absolute left-0 top-1.5 flex", INDICATOR_SIZE)}>
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
          )}
        />
        <span className={cn("relative inline-flex rounded-full bg-red-500", INDICATOR_SIZE)} />
      </span>
    );
  }

  return (
    <div
      className={cn("absolute left-0 top-1.5 rounded-full bg-muted-foreground", INDICATOR_SIZE)}
    />
  );
}
