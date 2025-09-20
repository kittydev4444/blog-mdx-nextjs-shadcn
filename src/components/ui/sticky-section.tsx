import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypeHighlight from "rehype-highlight";
import { mdxComponents } from "../mdx-components";

interface StickySectionProps {
  children: ReactNode;
  stickyContent: ReactNode;
  className?: string;
  stickyClassName?: string;
  contentClassName?: string;
  side?: "left" | "right";
}

export function StickySection({
  children,
  stickyContent,
  className,
  stickyClassName,
  contentClassName,
  side = "left",
}: StickySectionProps) {
  const stickyElement = (
    <div className={cn("flex-1", stickyClassName)}>
      <div className="lg:sticky lg:top-8">
        {stickyContent}
      </div>
    </div>
  );

  const contentElement = (
    <div className={cn("flex-1 space-y-6 prose prose-zinc dark:prose-invert max-w-none", contentClassName)}>
      {children}
    </div>
  );

  return (
    <div className={cn("sticky-section-full-width flex flex-col lg:flex-row gap-8 my-12 lg:min-h-screen not-prose", className)}>
      {side === "left" ? (
        <>
          {stickyElement}
          {contentElement}
        </>
      ) : (
        <>
          {contentElement}
          {stickyElement}
        </>
      )}
    </div>
  );
}

interface StickyImageSectionProps {
  src: string;
  alt: string;
  children: ReactNode;
  caption?: string;
  imageClassName?: string;
  contentClassName?: string;
  side?: "left" | "right";
}

export function StickyImageSection({
  src,
  alt,
  children,
  caption,
  imageClassName,
  contentClassName,
  side = "left",
}: StickyImageSectionProps) {
  const imageContent = (
    <div className={cn("space-y-4", imageClassName)}>
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className="w-full h-auto rounded-lg shadow-lg"
      />
      {caption && (
        <p className="text-sm text-muted-foreground text-center italic">
          {caption}
        </p>
      )}
    </div>
  );

  const textContent = (
    <div className={cn("flex-1 space-y-6 prose prose-zinc dark:prose-invert max-w-none", contentClassName)}>
      {children}
    </div>
  );

  if (side === "right") {
    return (
      <div className="sticky-section-full-width flex flex-col lg:flex-row gap-8 my-12 lg:min-h-screen not-prose">
        {/* Content on left */}
        <div className="flex-1">
          {textContent}
        </div>
        {/* Sticky Image on right */}
        <div className="flex-1">
          <div className="lg:sticky lg:top-8">
            {imageContent}
          </div>
        </div>
      </div>
    );
  }

  // Default: image on left (existing behavior)
  return (
    <StickySection
      stickyContent={imageContent}
      contentClassName={contentClassName}
    >
      {children}
    </StickySection>
  );
}

interface StickyCodeSectionProps {
  code: string;
  language?: string;
  children: ReactNode;
  title?: string;
}

export async function StickyCodeSection({
  code,
  language = "tsx",
  children,
  title,
}: StickyCodeSectionProps) {
  // Create MDX source with proper language annotation
  const mdxSource = `\`\`\`${language}\n${code}\n\`\`\``;

  return (
    <StickySection
      stickyContent={
        <div className="space-y-4">
          {title && (
            <h4 className="text-lg font-semibold">{title}</h4>
          )}
          <MDXRemote
            source={mdxSource}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypeHighlight,
                    {
                      detect: true,
                      ignoreMissing: true,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      }
    >
      {children}
    </StickySection>
  );
}