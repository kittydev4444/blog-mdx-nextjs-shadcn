"use client";

import { Heart } from "lucide-react";

export function BuyMeCoffee() {
  return (
    <div className="fixed bottom-4 right-4 z-50 hidden md:block">
      <a
        href="https://www.buymeacoffee.com/SifvZUPOTV"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary hover:bg-primary/90 transition-all duration-200 shadow-solana hover:shadow-lg hover:scale-105">
        <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
        <span className="text-sm font-medium text-primary-foreground">
          Buy me a catfee
        </span>
      </a>
    </div>
  );
}