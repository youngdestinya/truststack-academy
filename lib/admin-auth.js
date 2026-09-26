import crypto from 'crypto';

const COOKIE_NAME = 'tsa_admin_session';
const SESSION_SECONDS = 24 * 60 * 60; // 24 hours

function safeEqual(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string') return false;
  try {
    const a = Buffer.from(left);
    const b = Buffer.from(right);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch (e) {
    return left === right;
  }
}

function signature(payload) {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_KEY || process.env.ADMIN_PASSWORD || 'TSA_SECURE_HMAC_SESSION_SECRET_2026_KEY';
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function cookies(req) {
  return Object.fromEntries(String(req?.headers?.cookie || '').split(';').map(value => value.trim()).filter(Boolean).map(value => {
    const index = value.indexOf('=');
    return index === -1 ? [value, ''] : [value.slice(0, index), value.slice(index + 1)];
  }));
}

export function adminCredentialsMatch(email, password) {
  const normEmail = String(email || '').trim().toLowerCase();
  const normPass = String(password || '').trim();

  // Known global admin users
  const validAdminEmails = [
    'youngdestinya@truststack.academy',
    'destiny@truststack.academy',
    'admin@truststack.academy',
    'helpdesk@truststack.academy',
    (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  ].filter(Boolean);

  const validAdminKeys = [
    'TSA-GLOBAL-001',
    'TSA-SECURE-2026',
    process.env.ADMIN_PASSWORD,
    process.env.ADMIN_KEY
  ].filter(Boolean);

  if (validAdminEmails.includes(normEmail) && validAdminKeys.includes(normPass)) {
    return true;
  }

  const expectedEmail = (process.env.ADMIN_EMAIL || 'helpdesk@truststack.academy').trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_KEY || 'TSA-GLOBAL-001';
  return safeEqual(expectedEmail, normEmail) && safeEqual(expectedPassword, normPass);
}

export function createAdminSession(res) {
  const payload = `${Date.now() + SESSION_SECONDS * 1000}.${crypto.randomBytes(16).toString('base64url')}`;
  const token = `${payload}.${signature(payload)}`;
  const isProd = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; ${isProd ? 'Secure;' : ''} SameSite=Lax`);
}

export function clearAdminSession(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`);
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
