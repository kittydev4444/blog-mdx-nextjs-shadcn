"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  caption?: string;
  priority?: boolean;
}

export function BlogImage({
  src,
  alt,
  width = 800,
  height = 400,
  className,
  caption,
  priority = false,
}: BlogImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (caption) {
    return (
      <span className="block my-8 space-y-2">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={cn(
            "h-auto w-full object-cover transition-all duration-300 mb-4",
            isLoading && "animate-pulse bg-muted"
          )}
          onLoad={() => setIsLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </span>
        )}

        <span className="block text-center text-sm text-muted-foreground italic">
          {caption}
        </span>
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn(
        "my-8 h-auto w-full object-cover rounded-lg border",
        "hover:shadow-lg transition-all duration-300",
        isLoading && "animate-pulse bg-muted",
        className
      )}
      onLoad={() => setIsLoading(false)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
    />
  );
}
