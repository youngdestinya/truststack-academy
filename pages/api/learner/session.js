import { getAllLearners, publicLearner } from '../../../lib/learners';
import { clearLearnerSession, createLearnerSession, learnerEmailDigest, learnerIdFromSession } from '../../../lib/learner-auth';
import { methodNotAllowed, rateLimit, requireJson, requireSameOrigin } from '../../../lib/security';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'POST', 'DELETE'].includes(req.method)) return methodNotAllowed(res, ['GET', 'POST', 'DELETE']);
  if (!rateLimit(req, res, { bucket: 'learner-session', limit: 12, windowMs: 10 * 60 * 1000 })) return;
  if (req.method === 'GET') {
    const learnerId = learnerIdFromSession(req);
    if (!learnerId) return res.status(401).json({ authenticated: false });
    try {
      const data = await getAllLearners();
      const learner = data.learners.find(item => item.id === learnerId);
      if (!learner) return res.status(401).json({ authenticated: false });
      return res.json({ authenticated: true, learner: publicLearner(learner) });
    } catch { return res.status(503).json({ authenticated: false, error: 'Learner service is temporarily unavailable.' }); }
  }
  if (!requireSameOrigin(req, res)) return;
  if (req.method === 'DELETE') {
    clearLearnerSession(res);
    return res.json({ success: true });
  }
  if (!requireJson(req, res)) return;
  const id = String(req.body?.id || '').trim().toUpperCase();
  const email = String(req.body?.email || '').trim().toLowerCase();
  if (!/^TSA-\d{4}-[A-F0-9]{6}$/.test(id) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(401).json({ error: 'The learner ID or registered email is incorrect.' });
  }
  try {
    const data = await getAllLearners();
    const digest = learnerEmailDigest(email);
    const learner = data.learners.find(item => item.id === id && item.login_email_digest && item.login_email_digest === digest);
    if (!learner || learner.status !== 'Active Learner') return res.status(401).json({ error: 'The learner ID or registered email is incorrect.' });
    createLearnerSession(res, learner.id);
    return res.json({ success: true, destination: '/dashboard' });
  } catch { return res.status(503).json({ error: 'Learner login is temporarily unavailable.' }); }
}
