import { authorized } from '../../../../lib/certs';
import { saveArticle } from '../../../../lib/articles';
import { methodNotAllowed, rateLimit, requireJson, requireSameOrigin } from '../../../../lib/security';

export const config = { api: { bodyParser: { sizeLimit: '12mb' } } };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);
  if (!rateLimit(req, res, { bucket: 'article-publish', limit: 20, windowMs: 10 * 60 * 1000 })) return;
  if (!requireSameOrigin(req, res) || !requireJson(req, res)) return;
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  const article = req.body || {};
  if (!article.title?.trim() || !article.content?.trim()) return res.status(400).json({ error: 'Title and article content are required.' });
  if (article.image?.data && !article.image?.alt?.trim()) return res.status(400).json({ error: 'Featured image alternative text is required for accessibility and social SEO.' });
  try {
    const saved = await saveArticle(article);
    return res.json({ success: true, id: saved.id, status: saved.status, link: `/knowledge-base?article=${saved.slug}` });
  } catch (error) { return res.status(502).json({ error: error.message || 'TrustStack publishing failed.' }); }
}
