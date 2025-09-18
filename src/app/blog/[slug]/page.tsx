import { mdxComponents } from "@/components/mdx-components";
import { Button } from "@/components/ui/button";
import { getAllSlugs, getPostBySlug } from "@/lib/mdx";
import { formatWordCount } from "@/lib/reading-time";
import { ChevronLeft, Clock, FileText } from "lucide-react";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-8" asChild>
        <Link href="/" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={post.date} className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime.text}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span>{formatWordCount(post.readingTime.words)}</span>
          </div>
        </div>
      </header>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
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
    </article>
  );
}
