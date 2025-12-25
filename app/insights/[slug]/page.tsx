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
    console.log("[getPost] No NEXT_PUBLIC_SANITY_PROJECT_ID found");
    return null;
  }
  
  console.log("[getPost] Looking for post with slug:", slug);
  
  try {
    const post = await client.fetch(postQuery, { slug });
    console.log("[getPost] Found post:", post ? post.title : "null");
    if (post) {
      console.log("[getPost] Post slug value:", post.slug);
    }
    return post;
  } catch (error) {
    console.error("[getPost] Error fetching post:", error);
    if (error instanceof Error) {
      console.error("[getPost] Error message:", error.message);
    }
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const post = await getPost(resolvedParams.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cohort.example.com";

  if (!post) {
    return {
      title: "Post Not Found - Cohort",
    };
  }

  const postUrl = `${baseUrl}/insights/${post.slug}`;
  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${post.title} - Cohort Insights`,
    description: post.excerpt || "Read more on Cohort Insights",
    openGraph: {
      title: post.title,
      description: post.excerpt || "Read more on Cohort Insights",
      url: postUrl,
      siteName: "Cohort",
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "Read more on Cohort Insights",
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const post = await getPost(resolvedParams.slug);

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
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover rounded-lg"
                priority
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

