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
      <span className="block my-4 md:my-8 space-y-2 w-full overflow-hidden">
        <span className="relative block w-full" style={{ aspectRatio: `${width} / ${height}` }}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={cn(
              "object-contain transition-all duration-300"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
        </span>

        <span className="block text-center text-xs md:text-sm text-muted-foreground italic">
          {caption}
        </span>
      </span>
    );
  }

  return (
    <span className="relative block my-4 md:my-8 w-full overflow-hidden rounded-lg border" style={{ aspectRatio: `${width} / ${height}` }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          "object-contain hover:shadow-lg transition-all duration-300",
          className
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
      />
    </span>
  );
}
