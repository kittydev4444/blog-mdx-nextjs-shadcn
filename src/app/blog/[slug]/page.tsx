import { mdxComponents } from "@/components/mdx-components";
import { Button } from "@/components/ui/button";
import { getAllSlugs, getPostBySlug } from "@/lib/mdx";
import { PostMeta } from "@/components/post-meta";
import { ChevronLeft } from "lucide-react";
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
        <PostMeta
          date={post.date}
          readingTime={post.readingTime}
          variant="full"
        />
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
