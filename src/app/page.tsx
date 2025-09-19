import { PostDate, PostMeta } from "@/components/post-meta";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

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

            <CardHeader className="relative space-y-4 pb-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors duration-200">
                    <Link href={`/blog/${post.slug}`} className="block">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <PostDate date={post.date} variant="badge" />
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
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 group/link">
                  <span>Read article</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>

                <PostMeta
                  date={post.date}
                  readingTime={post.readingTime}
                  year={post.year}
                  variant="compact"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
