const fs = require('fs');
const { createClient } = require('@sanity/client');

// Load .env.local if it exists
try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
} catch (err) {
  // .env.local doesn't exist, that's okay
}

// Initialize the client with write permissions
const client = createClient({
  projectId: 'fc4od7b4',
  dataset: 'production',
  useCdn: false, // CDN is read-only
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function createPost() {
  try {
    const post = {
      _type: 'post',
      title: 'Test Post from Script',
      slug: {
        current: `test-post-${Date.now()}`,
      },
      author: 'Script Author',
      publishedAt: new Date().toISOString(),
      excerpt: 'This is a test post created programmatically using the Sanity client.',
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'This is the body content of the test post created programmatically.',
            },
          ],
        },
      ],
    };

    const result = await client.create(post);
    console.log('✓ Post created successfully!');
    console.log('  ID:', result._id);
    console.log('  Title:', result.title);
    console.log('  Slug:', result.slug?.current);
    return result;
  } catch (error) {
    console.error('✗ Failed to create post:', error.message);
    if (error.message.includes('permission')) {
      console.error('\n  You need a Sanity API token with write permissions.');
      console.error('  Get one from: https://sanity.io/manage/personal/fc4od7b4/api');
      console.error('  Then run: export SANITY_API_TOKEN=your-token-here');
    }
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  createPost();
}

module.exports = { createPost, client };

