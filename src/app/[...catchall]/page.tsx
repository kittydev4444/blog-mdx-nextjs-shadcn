import { defaultLanguage, isValidLanguage } from "@/lib/i18n";
import { redirect } from "next/navigation";

interface CatchAllPageProps {
  params: Promise<{ catchall: string[] }>;
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { catchall } = await params;

  if (!catchall || catchall.length === 0) {
    // This shouldn't happen, but fallback to default language
    redirect(`/${defaultLanguage}`);
  }

  const [possibleLang, ...restPath] = catchall;

  // If it's an invalid language, redirect to default language with the same path
  if (!isValidLanguage(possibleLang)) {
    const newPath = `/${defaultLanguage}/${restPath.join('/')}`;
    redirect(newPath);
  }

  // If we get here, something went wrong - redirect to home
  redirect(`/${defaultLanguage}`);
}