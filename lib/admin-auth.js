import crypto from 'crypto';

const COOKIE_NAME = 'tsa_admin_session';
const SESSION_SECONDS = 60 * 60;

function safeEqual(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string') return false;
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function signature(payload) {
  const secret = process.env.ADMIN_KEY;
  if (!secret) return '';
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function cookies(req) {
  return Object.fromEntries(String(req.headers.cookie || '').split(';').map(value => value.trim()).filter(Boolean).map(value => {
    const index = value.indexOf('=');
    return index === -1 ? [value, ''] : [value.slice(0, index), value.slice(index + 1)];
  }));
}

export function adminKeyMatches(supplied) {
  return safeEqual(process.env.ADMIN_KEY, supplied);
}

export function createAdminSession(res) {
  const payload = `${Date.now() + SESSION_SECONDS * 1000}.${crypto.randomBytes(16).toString('base64url')}`;
  const token = `${payload}.${signature(payload)}`;
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; Secure; SameSite=Strict`);
}

export function clearAdminSession(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`);
}

export function authorized(req) {
  const token = cookies(req)[COOKIE_NAME];
  if (!token) return false;
  const lastDot = token.lastIndexOf('.');
  if (lastDot < 1) return false;
  const payload = token.slice(0, lastDot);
  const suppliedSignature = token.slice(lastDot + 1);
  const expiresAt = Number(payload.split('.')[0]);
  return Number.isFinite(expiresAt) && expiresAt > Date.now() && safeEqual(signature(payload), suppliedSignature);
}
