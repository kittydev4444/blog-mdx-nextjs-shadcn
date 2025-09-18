import { getAllPosts, getAllYears } from "@/lib/mdx";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();
  const years = getAllYears();
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Thoughts, tutorials, and insights from my journey
        </p>
      </header>

      {years.map((year) => {
        const yearPosts = posts.filter((post) => post.year === year);

        if (yearPosts.length === 0) return null;

        return (
          <section key={year} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
              {year}
            </h2>

            <div className="space-y-6">
              {yearPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block p-6 rounded-lg border border-border hover:border-ring transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-sm text-muted-foreground shrink-0 ml-4">
                        #{post.order}
                      </span>
                    </div>

                    {post.excerpt && (
                      <p className="text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}

                    {post.date && (
                      <time
                        dateTime={post.date}
                        className="text-sm text-muted-foreground mt-3 block">
                        {post.date}
                      </time>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No blog posts yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
