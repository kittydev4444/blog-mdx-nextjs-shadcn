export interface ReadingTimeResult {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export function calculateReadingTime(content: string): ReadingTimeResult {
  // Remove MDX/HTML tags and get clean text
  const cleanText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace markdown links with just text
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Count words (split by whitespace and filter out empty strings)
  const words = cleanText.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return {
    text: `${minutes} min read`,
    minutes,
    time: minutes * 60 * 1000, // in milliseconds
    words: wordCount,
  };
}

export function formatWordCount(count: number): string {
  if (count < 1000) {
    return `${count} words`;
  }
  const thousands = Math.round(count / 100) / 10;
  return `${thousands}k words`;
}