"use client";

import { useLanguage } from "@/contexts/language-context";
import { type Language } from "@/lib/mdx";
import { useEffect } from "react";

interface BlogPostClientProps {
  availableLanguages: Language[];
}

export function BlogPostClient({ availableLanguages }: BlogPostClientProps) {
  const { setAvailableLanguages } = useLanguage();

  useEffect(() => {
    if (setAvailableLanguages) {
      setAvailableLanguages(availableLanguages);
    }
  }, [availableLanguages, setAvailableLanguages]);

  return null;
}