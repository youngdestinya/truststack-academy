const fallbackArticles = [
  { id: 'brief-1', slug: 'bvn-nin-linkage-risks', title: 'BVN NIN Linkage Risks: How Nigerian Fintechs Leak PII', excerpt: 'A practical review of exposed fintech endpoints and the controls that reduce identity-data leakage.', category: 'Threat Intel', author: 'Destiny Young', readTime: '6 min read', color: '#dff4fb' },
  { id: 'brief-2', slug: 'wireshark-cbn-fraud-patterns', title: 'Wireshark for SOC Analysts: Detecting CBN Fraud Patterns', excerpt: 'Learn useful Wireshark filters, JA3 indicators and payment-webhook monitoring techniques.', category: 'Penetration Testing', author: 'TrustStack Team', readTime: '8 min read', color: '#fff0e5' },
  { id: 'brief-3', slug: 'aws-misconfigurations-nigerian-startups', title: 'AWS Misconfigurations Costing Nigerian Startups Millions', excerpt: 'A remediation guide for exposed storage, permissive security groups and missing MFA.', category: 'Cloud Security', author: 'Destiny Young', readTime: '5 min read', color: '#f3e4ff' },
];

function config() {
  const site = (process.env.WORDPRESS_SITE_URL || '').replace(/\/$/, '');
  const username = process.env.WORDPRESS_USERNAME || '';
  const password = process.env.WORDPRESS_APP_PASSWORD || '';
  return { site, username, password, configured: Boolean(site && username && password) };
}

function authHeader() {
  const { username, password } = config();
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
}

async function wpFetch(path, options = {}) {
  const { site } = config();
  const response = await fetch(`${site}/wp-json/wp/v2${path}`, {
    ...options,
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `WordPress returned ${response.status}`);
  return data;
}

async function ensureTerms(taxonomy, names = []) {
  const ids = [];
  for (const rawName of names) {
    const name = rawName.trim();
    if (!name) continue;
    const found = await wpFetch(`/${taxonomy}?search=${encodeURIComponent(name)}&per_page=100`);
    let term = found.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if (!term) term = await wpFetch(`/${taxonomy}`, { method: 'POST', body: JSON.stringify({ name }) });
    ids.push(term.id);
  }
  return ids;
}

async function uploadImage(image) {
  if (!image?.data) return 0;
  const { site } = config();
  const bytes = Buffer.from(image.data.split(',').pop(), 'base64');
  const response = await fetch(`${site}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': image.type || 'image/jpeg', 'Content-Disposition': `attachment; filename="${(image.name || 'featured-image.jpg').replace(/[^\w.-]/g, '-')}"` },
    body: bytes,
  });
  const media = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(media.message || 'Featured image upload failed');
  await wpFetch(`/media/${media.id}`, { method: 'POST', body: JSON.stringify({ title: image.title, alt_text: image.alt, caption: image.caption, description: image.description }) });
  return media.id;
}

module.exports = { config, wpFetch, ensureTerms, uploadImage, fallbackArticles };
