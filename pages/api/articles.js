import { getArticleRegistry, fallbackArticles } from '../../lib/articles';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  res.setHeader('Cache-Control', 'no-store');
  try {
    const registry = await getArticleRegistry();
    const now = Date.now();
    const articles = (registry.articles || []).filter((article) => article.status === 'publish' || (article.status === 'future' && article.publishDate && Date.parse(article.publishDate) <= now));
    return res.json({ source: 'truststack', articles: articles.length ? articles : fallbackArticles });
  } catch { return res.status(200).json({ source: 'preview', articles: fallbackArticles, warning: 'Article registry unavailable' }); }
}
