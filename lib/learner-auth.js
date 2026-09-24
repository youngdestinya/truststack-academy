import crypto from 'crypto';

const COOKIE_NAME = 'tsa_learner_session';
const SESSION_SECONDS = 60 * 60 * 8;

function secret() {
  return process.env.LEARNER_AUTH_SECRET || process.env.ADMIN_KEY || '';
}

function safeEqual(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string') return false;
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function cookies(req) {
  return Object.fromEntries(String(req.headers.cookie || '').split(';').map(value => value.trim()).filter(Boolean).map(value => {
    const index = value.indexOf('=');
    return index === -1 ? [value, ''] : [value.slice(0, index), value.slice(index + 1)];
  }));
}

function signature(payload) {
  return secret() ? crypto.createHmac('sha256', secret()).update(payload).digest('base64url') : '';
}

export function learnerEmailDigest(email) {
  if (!secret() || typeof email !== 'string') return '';
  return crypto.createHmac('sha256', secret()).update(email.trim().toLowerCase()).digest('hex');
}

export function createLearnerSession(res, learnerId) {
  const payload = `${learnerId}.${Date.now() + SESSION_SECONDS * 1000}.${crypto.randomBytes(16).toString('base64url')}`;
  const token = `${payload}.${signature(payload)}`;
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; Secure; SameSite=Strict`);
}

export function clearLearnerSession(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`);
}

export function learnerIdFromSession(req) {
  const token = cookies(req)[COOKIE_NAME];
  if (!token || !secret()) return null;
  const parts = token.split('.');
  if (parts.length !== 4) return null;
  const [learnerId, expires, nonce, suppliedSignature] = parts;
  const payload = `${learnerId}.${expires}.${nonce}`;
  if (!/^TSA-\d{4}-[A-F0-9]{6}$/.test(learnerId) || Number(expires) <= Date.now()) return null;
  return safeEqual(signature(payload), suppliedSignature) ? learnerId : null;
}
