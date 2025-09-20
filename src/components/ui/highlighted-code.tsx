"use client";

import { CodeBlock } from "./code-block";

interface HighlightedCodeProps {
  code: string;
  language?: string;
  className?: string;
}

// Simple version that uses basic highlighting
export function SimpleHighlightedCode({
  code,
  language = "javascript",
  className,
}: HighlightedCodeProps) {
  // Basic syntax highlighting for TypeScript/JavaScript
  const highlightCode = (code: string, lang: string) => {
    if (!['typescript', 'tsx', 'javascript', 'jsx'].includes(lang)) {
      return code;
    }

    const highlighted = code
      // Keywords
      .replace(
        /\b(interface|type|function|export|import|const|let|var|if|else|return|extends|implements|class|new|this|async|await)\b/g,
        '<span class="hljs-keyword">$1</span>'
      )
      // Types and built-ins
      .replace(
        /\b(React\.ReactNode|React\.ButtonHTMLAttributes|HTMLButtonElement|string|number|boolean|void|undefined|null)\b/g,
        '<span class="hljs-built_in">$1</span>'
      )
      // Strings (improved regex)
      .replace(
        /(['"`])([^'"`]*?)\1/g,
        '<span class="hljs-string">$1$2$1</span>'
      )
      // Comments
      .replace(
        /\/\/.*$/gm,
        '<span class="hljs-comment">$&</span>'
      )
      // Function names
      .replace(
        /\b([A-Z][a-zA-Z0-9]*)\s*\(/g,
        '<span class="hljs-title class_">$1</span>('
      )
      // Properties and attributes
      .replace(
        /(\w+)(?=:)/g,
        '<span class="hljs-attr">$1</span>'
      );

    return highlighted;
  };

  const highlightedCode = highlightCode(code, language);

  return (
    <CodeBlock data-language={language} className={className}>
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </CodeBlock>
  );
}