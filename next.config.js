/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/knowledge-base.html', destination: '/knowledge-base', permanent: false },
      { source: '/admin/articles.html', destination: '/admin/articles', permanent: false },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/scholarship.html', destination: '/scholarship', permanent: true },
    ];
  },
}
module.exports = nextConfig
