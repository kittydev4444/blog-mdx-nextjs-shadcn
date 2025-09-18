import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from '@/components/ui/code-block'

export const mdxComponents: MDXComponents = {
  pre: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
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

    return (
      <CodeBlock data-language={language} {...props}>
        {child &&
        typeof child === "object" &&
        child !== null &&
        "props" in child
          ? (child as { props: { children?: React.ReactNode } }).props
              .children
          : children}
      </CodeBlock>
    );
  },
  code: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
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
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  }
}