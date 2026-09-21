import { authorized } from '../../../../lib/certs';
import { config as wordpressConfig, wpFetch, ensureTerms, uploadImage } from '../../../../lib/wordpress';

export const config = { api: { bodyParser: { sizeLimit: '12mb' } } };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (!wordpressConfig().configured) return res.status(503).json({ error: 'WordPress is not connected. Configure WORDPRESS_SITE_URL, WORDPRESS_USERNAME and WORDPRESS_APP_PASSWORD in Vercel.' });
  const article = req.body || {};
  if (!article.title?.trim() || !article.content?.trim()) return res.status(400).json({ error: 'Title and article content are required.' });
  try {
    const [categories, tags, featured_media] = await Promise.all([
      ensureTerms('categories', article.categories || []),
      ensureTerms('tags', article.tags || []),
      uploadImage(article.image),
    ]);
    const meta = {
      _yoast_wpseo_title: article.seoTitle || article.title,
      _yoast_wpseo_metadesc: article.metaDescription || '',
      _yoast_wpseo_focuskw: article.focusKeyword || '',
      _yoast_wpseo_canonical: article.canonical || '',
      _yoast_wpseo_meta_robots_noindex: article.noindex ? '1' : '2',
      _yoast_wpseo_meta_robots_nofollow: article.nofollow ? '1' : '0',
      _yoast_wpseo_opengraph_title: article.ogTitle || article.seoTitle || article.title,
      _yoast_wpseo_opengraph_description: article.ogDescription || article.metaDescription || '',
      rank_math_title: article.seoTitle || article.title,
      rank_math_description: article.metaDescription || '',
      rank_math_focus_keyword: article.focusKeyword || '',
      truststack_article_schema: JSON.stringify({ '@context': 'https://schema.org', '@type': article.schemaType || 'Article', headline: article.seoTitle || article.title, description: article.metaDescription || article.excerpt || '', image: article.image?.url || undefined, author: { '@type': 'Organization', name: 'TrustStack Academy' }, publisher: { '@type': 'Organization', name: 'TrustStack Academy' } }),
    };
    const post = await wpFetch('/posts', { method: 'POST', body: JSON.stringify({ title: article.title, slug: article.slug, content: article.content, excerpt: article.excerpt, status: article.status || 'draft', date: article.publishDate || undefined, categories, tags, featured_media: featured_media || undefined, meta }) });
    return res.json({ success: true, id: post.id, status: post.status, link: post.link, editLink: `${wordpressConfig().site}/wp-admin/post.php?post=${post.id}&action=edit` });
  } catch (error) { return res.status(502).json({ error: error.message || 'WordPress publishing failed.' }); }
}
