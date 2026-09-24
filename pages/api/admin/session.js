import { adminCredentialsMatch, authorized, clearAdminSession, createAdminSession } from '../../../lib/admin-auth';
import { methodNotAllowed, rateLimit, requireJson, requireSameOrigin } from '../../../lib/security';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'POST', 'DELETE'].includes(req.method)) return methodNotAllowed(res, ['GET', 'POST', 'DELETE']);
  if (!rateLimit(req, res, { bucket: 'admin-session', limit: 10, windowMs: 10 * 60 * 1000 })) return;
  if (req.method === 'GET') return res.status(authorized(req) ? 200 : 401).json({ success: authorized(req) });
  if (!requireSameOrigin(req, res)) return;
  if (req.method === 'DELETE') {
    clearAdminSession(res);
    return res.status(200).json({ success: true });
  }
  if (!requireJson(req, res)) return;
  if (!adminCredentialsMatch(req.body?.email, req.body?.password)) return res.status(401).json({ success: false });
  createAdminSession(res);
  return res.status(200).json({ success: true });
}
