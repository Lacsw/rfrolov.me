type TDateFormatOptions = {
  month?: "short" | "long";
};

export function formatDate(
  date: string | Date,
  options: TDateFormatOptions = {}
): string {
  const { month = "short" } = options;

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: "numeric",
  });
}
