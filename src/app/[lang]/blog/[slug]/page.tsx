import { mdxComponents } from "@/components/mdx-components";
import { PostMeta } from "@/components/post-meta";
import { type Language } from "@/lib/i18n";
import {
  getAllSlugs,
  getPostAvailableLanguages,
  getPostBySlug,
} from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

export async function generateStaticParams() {
  // Generate for both languages
  const enSlugs = getAllSlugs("en");
  const thSlugs = getAllSlugs("th");

  return [
    ...enSlugs.map((slug) => ({ lang: "en", slug })),
    ...thSlugs.map((slug) => ({ lang: "th", slug })),
  ];
}

export default async function BlogPost({ params }: PageProps) {
  const { lang, slug } = await params;

  const post = getPostBySlug(slug, lang);
  const availableLanguages = getPostAvailableLanguages(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <PostMeta
          date={post.date}
          readingTime={post.readingTime}
          availableLanguages={availableLanguages}
          variant="full"
        />
      </header>

      <div className="prose prose-zinc dark:prose-invert max-w-4xl min-w-full mx-auto [&_.sticky-section-full-width]:max-w-none [&_.sticky-section-full-width]:mx-0">
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
