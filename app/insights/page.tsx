import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Insights - Cohort",
  description: "Blog posts and insights about shift coverage management.",
};

export default function Insights() {
  // TODO: Replace with Sanity CMS data fetching
  const posts: Array<{
    slug: string;
    title: string;
    date: string;
    excerpt: string;
  }> = [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold mb-4">Insights</h1>
          <p className="text-xl text-gray-600 mb-12">
            Thoughts on shift coverage, operations, and building better systems.
          </p>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 pb-8">
                  <Link href={`/insights/${post.slug}`}>
                    <h2 className="text-2xl font-semibold mb-2 hover:text-gray-600">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-500 mb-4">{post.date}</p>
                  <p className="text-gray-600">{post.excerpt}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

