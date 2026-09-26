import fs from 'fs';
import path from 'path';

function getApplications() {
  const p1 = path.join(process.cwd(), 'public', 'data', 'scholarship-applications.json');
  const p2 = path.join(process.cwd(), 'data', 'scholarship-applications.json');
  if (fs.existsSync(p1)) {
    try { return JSON.parse(fs.readFileSync(p1, 'utf8')); } catch (e) {}
  }
  if (fs.existsSync(p2)) {
    try { return JSON.parse(fs.readFileSync(p2, 'utf8')); } catch (e) {}
  }
  return [];
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const apps = getApplications();
    const total = apps.length;
    const approved = apps.filter(a => a.status === 'Approved').length;
    const shortlisted = apps.filter(a => a.status === 'Shortlisted').length;
    const pending = apps.filter(a => a.status === 'Pending' || !a.status).length;
    
    const byTrack = {};
    apps.forEach(a => {
      const t = a.track || 'Unassigned';
      byTrack[t] = (byTrack[t] || 0) + 1;
    });

    return res.status(200).json({
      ok: true,
      applications: apps,
      stats: { total, approved, shortlisted, pending, byTrack }
    });
  } catch (err) {
    console.error('Error fetching scholarship applications:', err);
    return res.status(500).json({ ok: false, message: 'Internal server error', error: err.message });
  }
}
