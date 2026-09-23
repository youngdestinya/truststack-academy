import index from '../data/cdpo/index.json';

const base = 'https://truststack-academy.vercel.app';
const staticPaths = ['/', '/home.html', '/about', '/courses-tracks.html', '/courses', '/lms', '/learner', '/verify', '/knowledge-base', '/career-badges', '/cdpo', '/cdpo/exam', '/contact', '/scholarship', '/privacy', '/terms'];

export async function getServerSideProps({ res }) {
  const paths = [...staticPaths, ...index.slice(1).map(({ day }) => `/cdpo/day/${day}`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${base}${path}</loc></url>`).join('')}</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() { return null; }
