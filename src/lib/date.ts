type TDateFormatOptions = {
  month?: "short" | "long";
  locale?: string;
};

export function formatDate(date: string | Date, options: TDateFormatOptions = {}): string {
  const { month = "short", locale = "en-US" } = options;

  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month,
    day: "numeric",
  });
}
