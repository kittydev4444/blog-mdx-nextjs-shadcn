"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLanguageLabel, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const allLanguages: Language[] = ["en", "th"];

  // Extract current language from pathname
  const currentLanguage = pathname.startsWith("/th") ? "th" : "en";

  const handleLanguageChange = (newLanguage: Language) => {
    // Build new path with the selected language
    let newPath: string;

    if (pathname.startsWith("/en")) {
      // Replace /en with new language
      newPath = pathname.replace("/en", `/${newLanguage}`);
    } else if (pathname.startsWith("/th")) {
      // Replace /th with new language
      newPath = pathname.replace("/th", `/${newLanguage}`);
    } else {
      // Should not happen due to middleware, but fallback
      newPath = `/${newLanguage}${pathname}`;
    }

    // Navigate to new language URL - no refresh needed!
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 hover:bg-accent hover:text-accent-foreground w-auto sm:w-24 justify-start focus-visible:ring-0 focus-visible:ring-offset-0">
          <Languages className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline text-sm">
            {getLanguageLabel(currentLanguage)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        {allLanguages.map((lang) => {
          // All languages are always available - server will handle fallback if content doesn't exist
          const isAvailable = true;
          const isDisabled = false;

          return (
            <DropdownMenuItem
              key={lang}
              onClick={() => isAvailable && handleLanguageChange(lang)}
              disabled={isDisabled}
              className={cn(
                currentLanguage === lang ? "bg-accent" : "",
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              )}>
              <span className="flex items-center justify-between w-full">
                {getLanguageLabel(lang)}
                {isDisabled && (
                  <span className="text-xs text-muted-foreground ml-2">
                    (Not available)
                  </span>
                )}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
