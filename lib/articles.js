import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sanitizeHtml from 'sanitize-html';

const repository = () => process.env.GITHUB_REPO || 'youngdestinya/truststack-academy';
const apiHeaders = () => ({ Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' });
const contentUrl = (filePath) => `https://api.github.com/repos/${repository()}/contents/${filePath}`;

export const fallbackArticles = [
  { id: 'brief-1', slug: 'bvn-nin-linkage-risks', title: 'BVN NIN Linkage Risks: How Nigerian Fintechs Leak PII', excerpt: 'A practical review of exposed fintech endpoints and the controls that reduce identity-data leakage.', category: 'Threat Intel', categories: ['Threat Intel'], tags: ['Fintech', 'Privacy'], author: 'Destiny Young', readTime: '6 min read', color: '#dff4fb', status: 'publish' },
  { id: 'brief-2', slug: 'wireshark-cbn-fraud-patterns', title: 'Wireshark for SOC Analysts: Detecting CBN Fraud Patterns', excerpt: 'Learn useful Wireshark filters, JA3 indicators and payment-webhook monitoring techniques.', category: 'Penetration Testing', categories: ['Penetration Testing'], tags: ['Wireshark', 'SOC'], author: 'TrustStack Team', readTime: '8 min read', color: '#fff0e5', status: 'publish' },
  { id: 'brief-3', slug: 'aws-misconfigurations-nigerian-startups', title: 'AWS Misconfigurations Costing Nigerian Startups Millions', excerpt: 'A remediation guide for exposed storage, permissive security groups and missing MFA.', category: 'Cloud Security', categories: ['Cloud Security'], tags: ['AWS', 'Cloud'], author: 'Destiny Young', readTime: '5 min read', color: '#f3e4ff', status: 'publish' },
];

export function cleanSlug(value = '') {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 100);
}

async function readGithubFile(filePath) {
  const response = await fetch(contentUrl(filePath), { headers: apiHeaders(), cache: 'no-store' });
  if (!response.ok) throw new Error(`Article storage unavailable (${response.status})`);
  const file = await response.json();
  return { sha: file.sha, content: Buffer.from(file.content, 'base64').toString('utf8') };
}

async function writeGithubFile(filePath, content, message, sha, alreadyBase64 = false) {
  const response = await fetch(contentUrl(filePath), { method: 'PUT', headers: apiHeaders(), body: JSON.stringify({ message, content: alreadyBase64 ? content : Buffer.from(content).toString('base64'), ...(sha ? { sha } : {}) }) });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const error = new Error(data.message || `Could not write ${filePath}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function getArticleRegistry() {
  if (process.env.GITHUB_TOKEN) return JSON.parse((await readGithubFile('public/articles.json')).content);
  const local = path.join(process.cwd(), 'public/articles.json');
  if (fs.existsSync(local)) return JSON.parse(fs.readFileSync(local, 'utf8'));
  return { articles: fallbackArticles, meta: { version: '1.0.0' } };
}

export async function saveFeaturedImage(image, slug) {
  if (!image?.data) return '';
  const match = image.data.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
  if (!match) throw new Error('Featured image must be a JPEG, PNG or WebP file.');
  const extension = match[1] === 'image/jpeg' ? 'jpg' : match[1].split('/')[1];
  const fileName = `${slug}-${Date.now()}.${extension}`;
  await writeGithubFile(`public/article-images/${fileName}`, match[2], `Add featured image for ${slug}`, undefined, true);
  return `/article-images/${fileName}`;
}

export async function saveArticle(input) {
  if (!process.env.GITHUB_TOKEN) throw new Error('Native article storage is not configured.');
  const slug = cleanSlug(input.slug || input.title);
  if (!slug) throw new Error('A valid article slug is required.');
  const image = await saveFeaturedImage(input.image, slug);
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const file = await readGithubFile('public/articles.json');
    const registry = JSON.parse(file.content);
    const now = new Date().toISOString();
    const index = registry.articles.findIndex((item) => item.slug === slug || (input.id && item.id === input.id));
    const existing = index >= 0 ? registry.articles[index] : null;
    const safeContent = sanitizeHtml(input.content.trim(), { allowedTags: ['p','br','h2','h3','h4','ul','ol','li','strong','em','blockquote','a','code','pre'], allowedAttributes: { a: ['href','title','target','rel'] }, allowedSchemes: ['http','https','mailto'] });
    const article = { ...existing, id: existing?.id || crypto.randomUUID(), slug, title: input.title.trim(), excerpt: (input.excerpt || '').trim(), content: safeContent, categories: input.categories || [], category: input.categories?.[0] || 'Field Notes', tags: input.tags || [], author: input.author?.trim() || 'TrustStack Team', status: input.status || 'draft', publishDate: input.publishDate || '', seoTitle: (input.seoTitle || input.title).trim(), metaDescription: (input.metaDescription || input.excerpt || '').trim(), focusKeyword: (input.focusKeyword || '').trim(), canonical: (input.canonical || '').trim(), ogTitle: (input.ogTitle || input.seoTitle || input.title).trim(), ogDescription: (input.ogDescription || input.metaDescription || input.excerpt || '').trim(), noindex: Boolean(input.noindex), nofollow: Boolean(input.nofollow), schemaType: input.schemaType || 'Article', image: image || existing?.image || '', imageTitle: input.imageTitle || '', imageAlt: input.imageAlt || '', imageCaption: input.imageCaption || '', imageDescription: input.imageDescription || '', updatedAt: now, createdAt: existing?.createdAt || now };
    if (index >= 0) registry.articles[index] = article; else registry.articles.unshift(article);
    registry.meta = { ...(registry.meta || {}), total: registry.articles.length, updatedAt: now };
    try {
      await writeGithubFile('public/articles.json', `${JSON.stringify(registry, null, 2)}\n`, `${existing ? 'Update' : 'Publish'} article ${slug}`, file.sha);
      return article;
    } catch (error) {
      if (error.status !== 409 || attempt === 3) throw error;
    }
  }
  throw new Error('Article registry is busy; please try again.');
}
