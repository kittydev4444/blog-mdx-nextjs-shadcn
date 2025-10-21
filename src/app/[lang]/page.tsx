import { PostDate, PostMeta } from "@/components/post-meta";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Language } from "@/lib/i18n";
import { getAllPosts, getPostAvailableLanguages } from "@/lib/mdx";
import Link from "next/link";

interface HomeProps {
  params: Promise<{ lang: Language }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const posts = getAllPosts(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-purple-green">
          Welcome to My Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts on web development, Next.js, and modern tooling.
        </p>
      </div>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {posts.map((post) => (
          <Card
            key={`${post.year}-${post.slug}`}
            className="group relative overflow-hidden border-0 glass hover:shadow-solana transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <Link href={`/${lang}/blog/${post.slug}`} className="block">
              <CardHeader className="relative space-y-4 pb-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </CardTitle>
                  </div>

                  {post.excerpt && (
                    <CardDescription className="text-sm md:text-base leading-relaxed text-muted-foreground/90">
                      {post.excerpt}
                    </CardDescription>
                  )}
                </div>
              </CardHeader>

              <CardContent className="relative pt-0">
                <PostMeta
                  date={post.date}
                  readingTime={post.readingTime}
                  variant="compact"
                  availableLanguages={getPostAvailableLanguages(post.slug)}
                />
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}