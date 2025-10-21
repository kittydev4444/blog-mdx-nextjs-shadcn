import { cn } from "@/lib/utils";
import Image from "next/image";

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
  if (caption) {
    return (
      <span className="block my-4 md:my-8 space-y-2 max-w-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={cn(
            "h-auto w-full max-w-full object-contain transition-all duration-300 mb-4"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />

        <span className="block text-center text-xs md:text-sm text-muted-foreground italic">
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
        "my-4 md:my-8 h-auto w-full max-w-full object-contain rounded-lg border",
        "hover:shadow-lg transition-all duration-300",
        className
      )}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
    />
  );
}
