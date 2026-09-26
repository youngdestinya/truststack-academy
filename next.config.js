/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob:",
      "connect-src 'self'",
      "frame-src 'self'",
      "upgrade-insecure-requests",
    ].join('; ');
    return [{
      source: '/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: contentSecurityPolicy },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      ],
    }];
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: false },
      { source: '/home.html', destination: '/', permanent: false },
      { source: '/knowledge-base.html', destination: '/knowledge-base', permanent: false },
      { source: '/admin/articles.html', destination: '/admin/articles', permanent: false },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/scholarship.html', destination: '/scholarship', permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: '/', destination: '/home.html' },
      { source: '/admin/login', destination: '/admin/login.html' },
      { source: '/central-login', destination: '/central-login.html' },
      { source: '/student-lms', destination: '/student-lms.html' },
      { source: '/lms-control', destination: '/lms-control.html' },
      { source: '/admin/scholarships', destination: '/admin/scholarships.html' },
      { source: '/complaint', destination: '/complaint.html' },
      { source: '/pay-checkout', destination: '/pay-checkout.html' },
      { source: '/verify-certificate', destination: '/verify-certificate.html' },
      { source: '/courses-tracks', destination: '/courses-tracks.html' },
      { source: '/sample-certificate.html', destination: '/sample-certificate' },
    ];
  },
}
module.exports = nextConfig
