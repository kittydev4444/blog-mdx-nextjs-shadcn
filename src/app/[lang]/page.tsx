import { PostMeta } from "@/components/post-meta";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Language } from "@/lib/i18n";
import {
  getAllPosts,
  getFeaturedPosts,
  getPostAvailableLanguages,
} from "@/lib/mdx";
import Link from "next/link";

// Force dynamic rendering in development for hot reload
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface HomeProps {
  params: Promise<{ lang: Language }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const allPosts = getAllPosts(lang);
  const featuredPosts = getFeaturedPosts(lang);
  const latestPosts = allPosts.filter((post) => !post.featured).slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-purple-green">
          Welcome to My Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts on web development, Next.js, and modern tooling.
        </p>
      </div>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Featured Posts
          </h2>
          <div className="grid gap-8 max-w-4xl mx-auto">
            {featuredPosts.map((post) => (
              <Card
                key={`featured-${post.year}-${post.slug}`}
                className="group relative overflow-hidden border-0 glass hover:shadow-solana transition-all duration-300 hover:-translate-y-1"
              >
                {/* Featured Badge */}
                <Badge
                  variant="gradient"
                  className="absolute top-4 right-4 z-10 shadow-lg"
                >
                  ⭐ Featured
                </Badge>

                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Link href={`/${lang}/blog/${post.slug}`} className="block">
                  <CardHeader className="relative space-y-4 pb-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4 pr-24">
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
        </section>
      )}

      {/* Latest Posts Section */}
      {latestPosts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Latest Posts</h2>
            {/* TODO: Add "Show More" link that navigates to search/filter page */}
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Card
                key={`latest-${post.year}-${post.slug}`}
                className="group relative overflow-hidden border-0 glass hover:shadow-solana transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Link
                  href={`/${lang}/blog/${post.slug}`}
                  className="flex-1 flex flex-col"
                >
                  <CardHeader className="relative space-y-3 pb-3 flex-1">
                    <CardTitle className="text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </CardTitle>

                    {post.excerpt && (
                      <CardDescription className="text-sm leading-relaxed text-muted-foreground/90 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="relative pt-0 mt-auto">
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
        </section>
      )}
    </div>
  );
}
