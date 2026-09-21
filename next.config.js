/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/knowledge-base.html', destination: '/knowledge-base', permanent: false },
      { source: '/admin/articles.html', destination: '/admin/articles', permanent: false },
    ];
  },
}
module.exports = nextConfig
