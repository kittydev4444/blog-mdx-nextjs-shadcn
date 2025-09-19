import { mdxComponents } from "@/components/mdx-components";
import { PostMeta } from "@/components/post-meta";
import { defaultLanguage, isValidLanguage } from "@/lib/i18n";
import {
  getAllSlugs,
  getPostAvailableLanguages,
  getPostBySlug,
} from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";
import { BlogPostClient } from "./blog-post-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Generate for both languages
  const enSlugs = getAllSlugs("en");
  const thSlugs = getAllSlugs("th");

  return [
    ...enSlugs.map((slug) => ({ slug })),
    ...thSlugs.map((slug) => ({ slug })),
  ];
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  // Get language from cookie or default
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get("preferred-language")?.value;
  const language =
    savedLanguage && isValidLanguage(savedLanguage)
      ? savedLanguage
      : defaultLanguage;

  const post = getPostBySlug(slug, language);
  const availableLanguages = getPostAvailableLanguages(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostClient availableLanguages={availableLanguages} />
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <PostMeta
            date={post.date}
            readingTime={post.readingTime}
            availableLanguages={availableLanguages}
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
    </>
  );
}
