import createMDX from '@next/mdx'
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
 
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)