import { defaultLanguage } from "@/lib/i18n";
import { redirect } from "next/navigation";

export default function RootPage() {
  // Fallback redirect in case middleware doesn't work
  redirect(`/${defaultLanguage}`);
}