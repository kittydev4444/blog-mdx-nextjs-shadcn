"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  "data-language"?: string;
}

export function CodeBlock({
  children,
  className,
  "data-language": language,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof children === "string") {
      await navigator.clipboard.writeText(children);
    } else {
      // Extract text content from React node
      const textContent = extractTextContent(children);
      await navigator.clipboard.writeText(textContent);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to extract text content from React nodes
  const extractTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return node.toString();
    if (Array.isArray(node)) return node.map(extractTextContent).join("");
    if (node && typeof node === "object" && "props" in node) {
      const reactElement = node as { props: { children?: React.ReactNode } };
      return extractTextContent(reactElement.props.children);
    }
    return "";
  };

  return (
    <div className="relative group">
      {language && (
        <div className="flex items-center justify-between bg-[#212b38] border rounded-t-lg px-4 py-2 -mb-px">
          <span className="text-sm font-medium text-muted-foreground">
            {language}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? (
              <Check className="h-3 w-3 text-[#79c07b]" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      )}

      <pre
        className={cn(
          "bg-[#171e27] border p-4 text-sm font-mono leading-relaxed overflow-x-auto relative !my-0",
          language ? "rounded-t-none rounded-b-lg" : "rounded-lg",
          className
        )}>
        {!language && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? (
              <Check className="h-3 w-3 text-[#79c07b]" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        )}
        <code className={cn("text-foreground", className)}>{children}</code>
      </pre>
    </div>
  );
}
