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

export const client = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    const actualClient = getClient()
    if (!actualClient) {
      throw new Error(
        'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Please add it to your .env.local file. ' +
        'Get your project ID from https://sanity.io/manage or by running: npx sanity init'
      )
    }
    return (actualClient as any)[prop]
  }
})

const builder = projectId ? imageUrlBuilder(getClient()!) : null

export function urlFor(source: any) {
  if (!builder) {
    throw new Error('Sanity is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  }
  return builder.image(source)
}

// GROQ query for all posts
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  coverImage,
  "slug": slug.current
}`

// GROQ query for single post
export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  coverImage,
  body,
  "slug": slug.current
}`
