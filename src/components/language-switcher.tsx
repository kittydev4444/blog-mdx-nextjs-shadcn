"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-context";
import { getLanguageLabel } from "@/lib/i18n";
import { type Language } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const allLanguages: Language[] = ["en", "th"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 hover:bg-accent hover:text-accent-foreground w-auto sm:w-24 justify-start focus-visible:ring-0 focus-visible:ring-offset-0">
          <Languages className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline text-sm">
            {getLanguageLabel(language)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        {allLanguages.map((lang) => {
          const isAvailable = !availableLanguages || availableLanguages.includes(lang);
          const isDisabled = !isAvailable;

          return (
            <DropdownMenuItem
              key={lang}
              onClick={() => isAvailable && setLanguage(lang)}
              disabled={isDisabled}
              className={cn(
                language === lang ? "bg-accent" : "",
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
