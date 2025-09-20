"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const pathname = usePathname();

  // Extract current language from pathname
  const currentLanguage = pathname.startsWith('/th') ? 'th' : 'en';

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href={`/${currentLanguage}`}
          className="text-xl font-bold text-gradient-purple-green hover:opacity-80 transition-opacity">
          My Blog
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={`/${currentLanguage}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
