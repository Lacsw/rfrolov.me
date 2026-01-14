import { Clock } from "lucide-react";

type TReadingTimeProps = {
  minutes: number;
  showLabel?: boolean;
};

export function ReadingTime({ minutes, showLabel = false }: TReadingTimeProps) {
  return (
    <span className="inline-flex items-center gap-1">
      <Clock className="h-3 w-3" />
      {minutes} min{showLabel && " read"}
    </span>
  );
}
