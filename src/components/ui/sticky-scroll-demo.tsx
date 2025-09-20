"use client";

import { cn } from "@/lib/utils";

export function StickyScrollDemo() {
  return (
    <div className="my-12 border rounded-lg overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <div className="p-4 bg-background/50 border-b">
        <h3 className="text-sm font-medium text-muted-foreground">Interactive Demo</h3>
        <p className="text-xs text-muted-foreground mt-1">Scroll to see the sticky effect in action</p>
      </div>

      <div className="h-[600px] overflow-y-auto">
        <div className="flex">
          <div className="flex-1 p-4">
            <div className="sticky top-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg p-8 text-white text-center shadow-lg">
              <div className="text-6xl mb-4">📌</div>
              <h3 className="text-xl font-bold mb-2">I&apos;m Sticky!</h3>
              <p className="text-sm opacity-90">I stay here while you scroll the content on the right.</p>
              <div className="mt-4 w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white/40 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold mb-3">Section 1: Getting Started</h4>
              <p className="text-sm text-muted-foreground mb-4">
                As you scroll this content, notice how the purple box on the left stays fixed in place.
              </p>
              <div className="space-y-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="h-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded"></div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold mb-3">Section 2: Understanding Sticky</h4>
              <p className="text-sm text-muted-foreground mb-4">
                The element uses `position: sticky` with `top: 1.5rem` to maintain distance from the top.
              </p>
              <div className="space-y-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="h-6 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-700 dark:to-blue-600 rounded"></div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold mb-3">Section 3: Real-World Usage</h4>
              <p className="text-sm text-muted-foreground mb-4">
                This pattern is perfect for product showcases, image galleries, and interactive storytelling.
              </p>
              <div className="space-y-2">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="h-5 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-700 dark:to-green-600 rounded"></div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold mb-3">Section 4: End of Demo</h4>
              <p className="text-sm text-muted-foreground mb-4">
                When you reach the end of the scrollable area, the sticky element would naturally scroll with the container.
              </p>
              <div className="space-y-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="h-7 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-700 dark:to-orange-600 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BasicStickyExample() {
  return (
    <div className="my-8 border rounded-lg overflow-hidden">
      <div className="bg-muted/30 p-3 border-b">
        <h4 className="text-sm font-medium">Basic Sticky Implementation</h4>
      </div>

      <div className="flex h-[400px] overflow-y-auto">
        <div className="flex-1 p-4">
          <div className="sticky top-4 bg-blue-500 text-white p-6 rounded-lg text-center">
            <div className="text-2xl mb-2">🖼️</div>
            <p className="text-sm font-medium">Sticky Image</p>
          </div>
        </div>

          <div className="flex-1 p-4 space-y-4">
            <div className="bg-card p-4 rounded border">
              <h5 className="font-medium mb-2">Content Block 1</h5>
              <p className="text-sm text-muted-foreground">This content scrolls while the image stays put.</p>
            </div>
            <div className="bg-card p-4 rounded border">
              <h5 className="font-medium mb-2">Content Block 2</h5>
              <p className="text-sm text-muted-foreground">Notice how the blue box remains fixed as you scroll.</p>
            </div>
            <div className="bg-card p-4 rounded border">
              <h5 className="font-medium mb-2">Content Block 3</h5>
              <p className="text-sm text-muted-foreground">This demonstrates the core sticky scroll concept.</p>
            </div>
            <div className="bg-card p-4 rounded border">
              <h5 className="font-medium mb-2">Content Block 4</h5>
              <p className="text-sm text-muted-foreground">Keep scrolling to see more content areas...</p>
            </div>
            <div className="bg-card p-4 rounded border">
              <h5 className="font-medium mb-2">Final Block</h5>
              <p className="text-sm text-muted-foreground">At the end, everything scrolls together normally.</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export function MultiStickyDemo() {
  const sections = [
    { color: "from-red-500 to-pink-500", emoji: "🎨", title: "Design Phase", content: "Planning and wireframing the user experience." },
    { color: "from-blue-500 to-cyan-500", emoji: "⚡", title: "Development", content: "Building the interactive components and features." },
    { color: "from-green-500 to-emerald-500", emoji: "🚀", title: "Launch", content: "Deploying and monitoring the final product." },
  ];

  return (
    <div className="my-8 border rounded-lg overflow-hidden">
      <div className="bg-muted/30 p-3 border-b">
        <h4 className="text-sm font-medium">Multi-Section Sticky Scroll</h4>
      </div>

      <div className="h-[500px] overflow-y-auto">
        {sections.map((section, index) => (
          <div key={index} className="min-h-[400px] flex">
            <div className="flex-1 p-6">
              <div className={cn(
                "sticky top-6 p-8 rounded-lg text-white text-center shadow-lg bg-gradient-to-br",
                section.color
              )}>
                <div className="text-4xl mb-4">{section.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                <p className="text-sm opacity-90">{section.content}</p>
                <div className="mt-4 w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-4">
                  <div className="bg-card p-4 rounded border">
                <h5 className="font-medium mb-2">{section.title} Details</h5>
                <p className="text-sm text-muted-foreground mb-4">
                  This section explains the {section.title.toLowerCase()} process in detail.
                </p>
                <div className="space-y-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="h-4 bg-muted rounded"></div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-4 rounded border">
                <h5 className="font-medium mb-2">Key Considerations</h5>
                <div className="space-y-2">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="h-3 bg-muted/70 rounded"></div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-4 rounded border">
                <h5 className="font-medium mb-2">Best Practices</h5>
                <div className="space-y-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="h-3 bg-muted/50 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InteractiveStickyDemo() {
  return (
    <div className="my-8 border rounded-lg overflow-hidden">
      <div className="bg-muted/30 p-3 border-b">
        <h4 className="text-sm font-medium">JavaScript-Enhanced Sticky Scroll</h4>
      </div>

      <div className="flex h-[450px] overflow-y-auto">
        <div className="flex-1 p-4">
          <div className="sticky top-4 bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-6 rounded-lg text-center shadow-lg">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold mb-2">Smart Sticky</h3>
            <p className="text-xs opacity-90 mb-4">Enhanced with JavaScript interactions</p>
            <div className="space-y-2">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/60 rounded-full w-1/3 animate-pulse"></div>
              </div>
              <p className="text-xs opacity-75">Progress indicator</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-6">
          <div className="bg-card p-4 rounded border">
            <h5 className="font-medium mb-2">🔍 Intersection Observer</h5>
            <p className="text-sm text-muted-foreground">
              JavaScript can detect when sections enter and exit the viewport, triggering visual changes.
            </p>
            <div className="mt-3 p-3 bg-muted/50 rounded">
              <code className="text-xs">observer.observe(section)</code>
            </div>
          </div>

          <div className="bg-card p-4 rounded border">
            <h5 className="font-medium mb-2">📊 Progress Tracking</h5>
            <p className="text-sm text-muted-foreground">
              Track scroll progress through content and update sticky elements accordingly.
            </p>
            <div className="mt-3 space-y-1">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="h-2 bg-muted rounded"></div>
              ))}
            </div>
          </div>

          <div className="bg-card p-4 rounded border">
            <h5 className="font-medium mb-2">🎨 Dynamic Styling</h5>
            <p className="text-sm text-muted-foreground">
              Change colors, sizes, or content based on scroll position for engaging interactions.
            </p>
            <div className="mt-3 flex gap-2">
              <div className="w-6 h-6 bg-red-200 rounded"></div>
              <div className="w-6 h-6 bg-blue-200 rounded"></div>
              <div className="w-6 h-6 bg-green-200 rounded"></div>
            </div>
          </div>

          <div className="bg-card p-4 rounded border">
            <h5 className="font-medium mb-2">⚡ Performance Tips</h5>
            <p className="text-sm text-muted-foreground">
              Use requestAnimationFrame and throttling for smooth 60fps animations.
            </p>
            <div className="mt-3 space-y-1">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-2 bg-muted/70 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StickyScrollConclusion() {
  return (
    <div className="my-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg p-8 text-center">
      <div className="text-4xl mb-4">🎉</div>
      <h3 className="text-xl font-bold mb-3">You&apos;ve Mastered Sticky Scroll!</h3>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        You&apos;ve experienced multiple sticky scroll implementations throughout this post.
        Each demo showed different techniques you can apply to your own projects.
      </p>
      <div className="flex justify-center gap-4 text-sm">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
          CSS Sticky
        </span>
        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
          Multi-Section
        </span>
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
          JS Enhanced
        </span>
      </div>
    </div>
  );
}