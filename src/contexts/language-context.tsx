"use client";

import { isValidLanguage } from "@/lib/i18n";
import { Language } from "@/lib/mdx";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  availableLanguages?: Language[];
  setAvailableLanguages?: (languages: Language[]) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage: Language;
}

export function LanguageProvider({
  children,
  initialLanguage,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [availableLanguages, setAvailableLanguagesState] = useState<Language[]>(
    ["en", "th"]
  );
  const router = useRouter();

  useEffect(() => {
    // Only check localStorage on mount (server already provided cookie value)
    const savedLanguage = localStorage.getItem("preferred-language");
    if (
      savedLanguage &&
      isValidLanguage(savedLanguage) &&
      savedLanguage !== initialLanguage
    ) {
      setLanguageState(savedLanguage);
      // Update cookie to match localStorage
      document.cookie = `preferred-language=${savedLanguage}; path=/; max-age=31536000`;
    }
  }, [initialLanguage]);

  const setLanguage = async (newLanguage: Language) => {
    // Check if the new language is available for current content
    if (
      availableLanguages.length > 0 &&
      !availableLanguages.includes(newLanguage)
    ) {
      console.warn(`Language ${newLanguage} is not available for this content`);
      return;
    }

    setLanguageState(newLanguage);
    localStorage.setItem("preferred-language", newLanguage);

    // Set cookie directly for server-side language detection
    document.cookie = `preferred-language=${newLanguage}; path=/; max-age=31536000`;

    // Use router refresh instead of window.location.reload for smoother transition
    router.refresh();
  };

  const setAvailableLanguages = (languages: Language[]) => {
    setAvailableLanguagesState(languages);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        availableLanguages,
        setAvailableLanguages,
      }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
