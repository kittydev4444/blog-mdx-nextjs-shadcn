import { defaultLanguage, isValidLanguage } from "@/lib/i18n";
import { redirect } from "next/navigation";

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  const { lang } = await params;

  // Validate language parameter - redirect to default language if invalid
  if (!isValidLanguage(lang)) {
    redirect(`/${defaultLanguage}`);
  }

  return <>{children}</>;
}
