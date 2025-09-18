interface FileTreeProps {
  children: string;
}

export function FileTree({ children }: FileTreeProps) {
  // Ensure proper tree character rendering
  const formattedContent = children
    .replace(/├─/g, "├──")
    .replace(/└─/g, "└──")
    .trim();

  return (
    <div className="my-6">
      <pre
        className="bg-[#171e27] border p-4 text-sm leading-relaxed overflow-x-auto rounded-lg"
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}>
        <code
          className="text-foreground whitespace-pre"
          style={{ fontFamily: "inherit" }}>
          {formattedContent}
        </code>
      </pre>
    </div>
  );
}
