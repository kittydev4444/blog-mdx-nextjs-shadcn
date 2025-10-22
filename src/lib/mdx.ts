import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime, type ReadingTimeResult } from "./reading-time";

const contentDirectory = path.join(process.cwd(), "content");

// Cache busting for development - forces re-read of files
const contentCache = new Map<string, { content: BlogPost; mtime: number }>();

function shouldUseCache(filePath: string, cachedMtime: number): boolean {
  if (process.env.NODE_ENV !== "development") return true;
  try {
    const stats = fs.statSync(filePath);
    return stats.mtimeMs === cachedMtime;
  } catch {
    return false;
  }
}

export type Language = "en" | "th";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  year: string;
  order: number;
  readingTime: ReadingTimeResult;
  published: boolean;
  featured: boolean;
  language: Language;
}

export function getAvailableLanguages(): Language[] {
  return ["en", "th"];
}

export function getAllYears(language: Language = "en"): string[] {
  const languageDirectory = path.join(contentDirectory, language);

  if (!fs.existsSync(languageDirectory)) {
    return [];
  }

  const years = fs
    .readdirSync(languageDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort((a, b) => parseInt(b) - parseInt(a)); // Sort years descending

  return years;
}

export function getPostsFromYear(
  year: string,
  language: Language = "en",
  includeUnpublished: boolean = false,
): BlogPost[] {
  const yearDirectory = path.join(contentDirectory, language, year);

  if (!fs.existsSync(yearDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(yearDirectory)
    .filter((name) => name.endsWith(".mdx"));

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(yearDirectory, fileName);

    // Check cache in development
    const cacheKey = `${language}-${year}-${fileName}`;
    const cached = contentCache.get(cacheKey);
    const stats = fs.statSync(fullPath);

    if (cached && shouldUseCache(fullPath, cached.mtime)) {
      return cached.content;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Extract order from filename (e.g., "1-my-post.mdx" -> 1)
    const orderMatch = fileName.match(/^(\d+)-/);
    const order = orderMatch ? parseInt(orderMatch[1]) : 0;

    // Create slug from filename without order prefix
    const slug = fileName
      .replace(/^\d+-/, "") // Remove order prefix
      .replace(/\.mdx$/, ""); // Remove extension

    const readingTime = calculateReadingTime(content);

    const post = {
      slug,
      title: data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
      content,
      year,
      order,
      readingTime,
      published: data.published ?? false,
      featured: data.featured ?? false,
      language,
    };

    // Cache the post with its modification time
    if (process.env.NODE_ENV === "development") {
      contentCache.set(cacheKey, { content: post, mtime: stats.mtimeMs });
    }

    return post;
  });

  // Filter by published status unless includeUnpublished is true
  const filteredPosts = includeUnpublished
    ? posts
    : posts.filter((post) => post.published);

  // Sort by order number
  return filteredPosts.sort((a, b) => a.order - b.order);
}

export function getAllPosts(
  language: Language = "en",
  includeUnpublished: boolean = false,
): BlogPost[] {
  const years = getAllYears(language);
  const allPosts = years.flatMap((year) =>
    getPostsFromYear(year, language, includeUnpublished),
  );

  // Sort by year (desc) then by order within year
  return allPosts.sort((a, b) => {
    if (a.year !== b.year) {
      return parseInt(b.year) - parseInt(a.year);
    }
    return a.order - b.order;
  });
}

export function getPostBySlug(
  slug: string,
  language: Language = "en",
  includeUnpublished: boolean = false,
): BlogPost | null {
  const years = getAllYears(language);

  for (const year of years) {
    const posts = getPostsFromYear(year, language, includeUnpublished);
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      return post;
    }
  }

  return null;
}

export function getAllSlugs(
  language: Language = "en",
  includeUnpublished: boolean = false,
): string[] {
  return getAllPosts(language, includeUnpublished).map((post) => post.slug);
}

export function getPostAvailableLanguages(
  slug: string,
  includeUnpublished: boolean = false,
): Language[] {
  const availableLanguages: Language[] = [];

  const languages: Language[] = ["en", "th"];
  languages.forEach((lang) => {
    const post = getPostBySlug(slug, lang, includeUnpublished);
    if (post) {
      availableLanguages.push(lang);
    }
  });

  return availableLanguages;
}

export function getFeaturedPosts(
  language: Language = "en",
  limit?: number,
): BlogPost[] {
  const allPosts = getAllPosts(language, false);
  const featured = allPosts.filter((post) => post.featured);
  return limit ? featured.slice(0, limit) : featured;
}
