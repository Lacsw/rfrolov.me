import { redirect } from "next/navigation";

import { defaultLocale } from "@/i18n/config";

export default function RootPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  redirect(`${basePath}/${defaultLocale}`);
}
