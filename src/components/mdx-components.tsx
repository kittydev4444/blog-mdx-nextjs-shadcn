import { CodeBlock } from "@/components/ui/code-block";
import { FileTree } from "@/components/ui/file-tree";
import { BlogImage } from "@/components/ui/blog-image";
import {
  StickyScrollDemo,
  BasicStickyExample,
  MultiStickyDemo,
  InteractiveStickyDemo,
  StickyScrollConclusion
} from "@/components/ui/sticky-scroll-demo";
import {
  StickySection,
  StickyWrapper,
  StickyContent,
  ScrollContent
} from "@/components/ui/sticky-section";
import type { MDXComponents } from "mdx/types";

interface PreComponentProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

interface CodeComponentProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

interface ImgComponentProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  title?: string;
  [key: string]: unknown;
}

export const mdxComponents: MDXComponents = {
  pre: ({ children, ...props }: PreComponentProps) => {
    // Extract language from className (e.g., "language-javascript" -> "javascript")
    const child = Array.isArray(children) ? children[0] : children;
    let language = "";

    if (
      child &&
      typeof child === "object" &&
      child !== null &&
      "props" in child
    ) {
      const reactElement = child as {
        props: { className?: string; children?: React.ReactNode };
      };
      const className = reactElement.props?.className || "";
      const match = className.match(/language-(\w+)/);
      language = match ? match[1] : "";
    }

    // Check if this is a file tree
    const content =
      child && typeof child === "object" && child !== null && "props" in child
        ? (child as { props: { children?: React.ReactNode } }).props.children
        : children;

    const contentStr = typeof content === "string" ? content : "";

    // Handle explicit "tree" language or detect tree patterns
    const isFileTree =
      language === "tree" ||
      (!language &&
        (contentStr.includes("├──") ||
          contentStr.includes("└──") ||
          contentStr.includes("│") ||
          contentStr.includes("├─") ||
          contentStr.includes("└─") ||
          (contentStr.includes("content/") && contentStr.includes(".mdx"))));

    if (isFileTree) {
      return <FileTree>{contentStr}</FileTree>;
    }

    return (
      <CodeBlock data-language={language} {...props}>
        {content}
      </CodeBlock>
    );
  },
  code: ({ children, className, ...props }: CodeComponentProps) => {
    // Handle inline code
    if (!className) {
      return (
        <code
          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
          {...props}>
          {children}
        </code>
      );
    }

    // This will be handled by the pre component above for code blocks
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  img: ({ src, alt, width, height, title, ...props }: ImgComponentProps) => {
    if (!src || !alt) {
      return null;
    }

    return (
      <BlogImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        caption={title}
        {...props}
      />
    );
  },
  Image: BlogImage,
  StickyScrollDemo,
  BasicStickyExample,
  MultiStickyDemo,
  InteractiveStickyDemo,
  StickyScrollConclusion,
  StickySection,
  StickyWrapper,
  StickyContent,
  ScrollContent,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
