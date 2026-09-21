import { config, fallbackArticles } from '../../lib/wordpress';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const wp = config();
  if (!wp.site) return res.json({ source: 'preview', articles: fallbackArticles });
  try {
    const response = await fetch(`${wp.site}/wp-json/wp/v2/posts?status=publish&per_page=12&_embed=1`);
    if (!response.ok) throw new Error();
    const posts = await response.json();
    const articles = posts.map((post) => ({ id: post.id, slug: post.slug, title: post.title.rendered, excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ''), author: post._embedded?.author?.[0]?.name || 'TrustStack Team', image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '', category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Field Notes', link: post.link }));
    return res.json({ source: 'wordpress', articles });
  } catch { return res.status(502).json({ source: 'preview', articles: fallbackArticles, warning: 'WordPress feed unavailable' }); }
}
