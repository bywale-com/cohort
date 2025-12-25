import { MetadataRoute } from "next";
import { client, postsQuery } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cohort.example.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic blog posts
  let postPages: MetadataRoute.Sitemap = [];
  
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const posts = await client.fetch(postsQuery);
      
      if (posts && Array.isArray(posts)) {
        postPages = posts.map((post: any) => ({
          url: `${baseUrl}/insights/${post.slug}`,
          lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
    // Continue with static pages even if posts fail
  }

  return [...staticPages, ...postPages];
}

