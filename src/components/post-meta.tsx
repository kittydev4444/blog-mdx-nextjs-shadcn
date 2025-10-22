import { formatWordCount, type ReadingTimeResult } from "@/lib/reading-time";
import { cn } from "@/lib/utils";
import { Calendar, Clock, FileText, Globe } from "lucide-react";
import { type Language } from "@/lib/mdx";
import { getLanguageLabel } from "@/lib/i18n";

interface PostMetaProps {
  date: string;
  readingTime: ReadingTimeResult;
  variant?: "full" | "compact";
  availableLanguages?: Language[];
  className?: string;
}

export function PostMeta({
  date,
  readingTime,
  variant = "compact",
  availableLanguages,
  className,
}: PostMetaProps) {
  const formatDate = (
    dateString: string,
    format: "short" | "long" = "short",
  ) => {
    return new Date(dateString).toLocaleDateString(
      "en-US",
      format === "short"
        ? { month: "short", day: "numeric", year: "numeric" }
        : { year: "numeric", month: "long", day: "numeric" },
    );
  };

  if (variant === "compact") {
    const formatShortDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    };

    return (
      <div
        className={cn(
          "flex items-center gap-3 text-xs text-muted-foreground/70",
          className,
        )}
      >
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          <span>{formatShortDate(date)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{readingTime.text}</span>
        </div>
        {availableLanguages && availableLanguages.length > 1 && (
          <div className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            <span>{availableLanguages.length} langs</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
        className,
      )}
    >
      <time dateTime={date} className="flex items-center gap-1.5">
        <Calendar className="h-4 w-4" />
        {formatDate(date, "long")}
      </time>
      <div className="flex items-center gap-1.5">
        <Clock className="h-4 w-4" />
        <span>{readingTime.text}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <FileText className="h-4 w-4" />
        <span>{formatWordCount(readingTime.words)}</span>
      </div>
      {availableLanguages && availableLanguages.length > 0 && (
        <div className="flex items-center gap-1.5">
          <Globe className="h-4 w-4" />
          <span>
            Available in:{" "}
            {availableLanguages
              .map((lang) => getLanguageLabel(lang))
              .join(", ")}
            {availableLanguages.length === 1 && " only"}
          </span>
        </div>
      )}
    </div>
  );
}

interface PostDateProps {
  date: string;
  variant?: "badge" | "inline";
  className?: string;
}

export function PostDate({
  date,
  variant = "badge",
  className,
}: PostDateProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (variant === "badge") {
    return (
      <div
        className={cn(
          "shrink-0 rounded-full bg-muted/80 px-3 py-1.5 text-xs font-medium text-muted-foreground",
          className,
        )}
      >
        <time dateTime={date}>{formatDate(date)}</time>
      </div>
    );
  }

  return (
    <time
      dateTime={date}
      className={cn("text-sm text-muted-foreground", className)}
    >
      {formatDate(date)}
    </time>
  );
}
