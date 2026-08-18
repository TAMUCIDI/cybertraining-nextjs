import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve from the root of the dedicated cyber-dart hostname.

  // Enable standalone output for Docker (creates minimal production build)
  output: 'standalone',
  
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  // Disable Next.js telemetry
  poweredByHeader: false,
  
  // Image optimization (disable for K3s simplicity)
  images: {
    unoptimized: true,
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
