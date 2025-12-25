import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { client, postsQuery } from "@/lib/sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export const metadata = {
  title: "Insights - Cohort",
  description: "Blog posts and insights about shift coverage management.",
};

async function getPosts() {
  // Check if Sanity is configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return [];
  }
  
  try {
    const posts = await client.fetch(postsQuery);
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Insights() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold mb-4">Insights</h1>
          <p className="text-xl text-gray-600 mb-12">
            Thoughts on shift coverage, operations, and building better systems.
          </p>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              {!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? (
                <>
                  <p className="text-gray-500 mb-4">
                    Sanity CMS is not configured yet.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto text-left">
                    <h3 className="font-semibold mb-2">Setup Instructions:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                      <li>Run: <code className="bg-gray-100 px-2 py-1 rounded">npx sanity login</code></li>
                      <li>Run: <code className="bg-gray-100 px-2 py-1 rounded">npx sanity init</code> (choose existing project or create new)</li>
                      <li>Add your Project ID to <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code></li>
                      <li>Restart your dev server</li>
                    </ol>
                    <p className="text-xs text-gray-600 mt-4">
                      Or create a project manually at{" "}
                      <a href="https://sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        sanity.io/manage
                      </a>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-500 mb-4">
                    No posts yet. Add content in Sanity Studio!
                  </p>
                  <Link
                    href="/studio"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Go to Sanity Studio →
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/insights/${post.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {post.coverImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={urlFor(post.coverImage).width(400).height(300).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    {post.publishedAt && (
                      <p className="text-xs text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
