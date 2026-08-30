import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/cyber-dart',
  assetPrefix: '/cyber-dart',
  output: 'standalone',
  poweredByHeader: false,
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-b3352b111e3a40faa530a61f15708ed2.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
    ],
  },
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
