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
  // Use consistent aspect ratio (2:1) for all images based on default 800x400
  const consistentAspectRatio = "2 / 1";

  if (caption) {
    return (
      <span className="block my-4 md:my-8 space-y-2 w-full min-w-[280px] md:min-w-[500px] overflow-hidden">
        <span className="relative block w-full" style={{ aspectRatio: consistentAspectRatio }}>
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
    <span className="relative block my-4 md:my-8 w-full min-w-[280px] md:min-w-[500px] overflow-hidden rounded-lg border" style={{ aspectRatio: consistentAspectRatio }}>
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
