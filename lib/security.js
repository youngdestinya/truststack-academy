import crypto from 'crypto';

const STORE = Symbol.for('truststack.rateLimits');
const limits = globalThis[STORE] || new Map();
globalThis[STORE] = limits;

function requestFingerprint(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const address = forwarded || req.socket?.remoteAddress || 'unknown';
  return crypto.createHash('sha256').update(address).digest('hex').slice(0, 24);
}

export function rateLimit(req, res, { bucket, limit, windowMs }) {
  const now = Date.now();
  const key = `${bucket}:${requestFingerprint(req)}`;
  let entry = limits.get(key);
  if (!entry || entry.resetAt <= now) entry = { count: 0, resetAt: now + windowMs };
  entry.count += 1;
  limits.set(key, entry);

  if (limits.size > 2000) {
    for (const [storedKey, stored] of limits) if (stored.resetAt <= now) limits.delete(storedKey);
  }

  res.setHeader('X-RateLimit-Limit', String(limit));
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, limit - entry.count)));
  if (entry.count <= limit) return true;
  res.setHeader('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
  res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  return false;
}

export function requireSameOrigin(req, res) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const allowed = new Set([
    host ? `${protocol}://${host}` : '',
    process.env.NEXT_PUBLIC_BASE_URL || '',
    'https://truststack.academy',
    'https://www.truststack.academy',
  ]);
  if (allowed.has(origin)) return true;
  res.status(403).json({ error: 'Request origin is not allowed.' });
  return false;
}

export function requireJson(req, res) {
  const type = String(req.headers['content-type'] || '').toLowerCase();
  if (type.startsWith('application/json')) return true;
  res.status(415).json({ error: 'Content-Type must be application/json.' });
  return false;
}

export function methodNotAllowed(res, methods) {
  res.setHeader('Allow', methods.join(', '));
  return res.status(405).json({ error: 'Method not allowed.' });
}
