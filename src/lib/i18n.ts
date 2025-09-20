import { type Language } from "./mdx";

export type { Language };

export const languageNames: Record<Language, string> = {
  en: "English",
  th: "ไทย",
};

export const languageLabels: Record<
  Language,
  { name: string; nativeName: string }
> = {
  en: { name: "English", nativeName: "English" },
  th: { name: "Thai", nativeName: "ไทย" },
};

export function getLanguageLabel(language: Language): string {
  return languageLabels[language].name;
}

export function isValidLanguage(lang: string): lang is Language {
  return lang === "en" || lang === "th";
}

export const defaultLanguage: Language = "en";
