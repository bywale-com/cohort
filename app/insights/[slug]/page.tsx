import { client, postQuery } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

async function getPost(slug: string) {
  // Check if Sanity is configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return null;
  }
  
  try {
    const post = await client.fetch(postQuery, { slug });
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found - Cohort",
    };
  }

  return {
    title: `${post.title} - Cohort Insights`,
    description: post.excerpt || "Read more on Cohort Insights",
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <article className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Link
            href="/insights"
            className="text-blue-600 hover:text-blue-800 mb-8 inline-block"
          >
            ← Back to Insights
          </Link>

          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

          {(post.author || post.publishedAt) && (
            <div className="flex items-center gap-4 text-gray-600 mb-8">
              {post.author && <span>By {post.author}</span>}
              {post.publishedAt && (
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          )}

          {post.coverImage && (
            <div className="relative h-64 md:h-96 w-full mb-8">
              <Image
                src={urlFor(post.coverImage).width(1200).height(600).url()}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 italic">{post.excerpt}</p>
          )}

          <div className="prose prose-lg max-w-none">
            {post.body && <PortableText value={post.body} />}
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}

