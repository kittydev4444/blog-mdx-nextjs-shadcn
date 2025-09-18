import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatWordCount } from "@/lib/reading-time";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
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
            className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardHeader className="relative space-y-4 pb-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors duration-200">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <div className="shrink-0 rounded-full bg-muted/80 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </div>

                {post.excerpt && (
                  <CardDescription className="text-base leading-relaxed text-muted-foreground/90">
                    {post.excerpt}
                  </CardDescription>
                )}
              </div>
            </CardHeader>

            <CardContent className="relative pt-0">
              <div className="flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 group/link"
                >
                  <span>Read article</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span>{post.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{post.readingTime.text}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{formatWordCount(post.readingTime.words)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
