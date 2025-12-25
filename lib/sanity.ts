import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Create client only if projectId is available
let clientInstance: ReturnType<typeof createClient> | null = null

function getClient() {
  if (!projectId) {
    return null
  }
  
  if (!clientInstance) {
    clientInstance = createClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  }
  
  return clientInstance
}

// Create client directly instead of using Proxy to avoid potential issues
export const client = (() => {
  if (!projectId) {
    // Return a mock client that will throw on fetch
    return {
      fetch: async () => {
        throw new Error(
          'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Please add it to your .env.local file.'
        )
      }
    } as any
  }
  return getClient()!
})()

const builder = projectId ? imageUrlBuilder(getClient()!) : null

export function urlFor(source: any) {
  if (!builder) {
    throw new Error('Sanity is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  }
  return builder.image(source)
}

// GROQ query for all posts (only published, excluding drafts)
export const postsQuery = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  title,
  author,
  publishedAt,
  excerpt,
  coverImage,
  "slug": slug.current
}`

// GROQ query for single post (only published, excluding drafts)
export const postQuery = `*[_type == "post" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
  _id,
  title,
  author,
  publishedAt,
  excerpt,
  coverImage,
  body,
  "slug": slug.current
}`
