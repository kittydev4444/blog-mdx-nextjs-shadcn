import { mdxComponents } from "@/components/mdx-components";
import { getAllSlugs, getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote-client/rsc";
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
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>{post.year}</span>
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
