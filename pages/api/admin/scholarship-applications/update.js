import fs from 'fs';
import path from 'path';

function getApplications() {
  const p1 = path.join(process.cwd(), 'public', 'data', 'scholarship-applications.json');
  if (fs.existsSync(p1)) {
    try { return JSON.parse(fs.readFileSync(p1, 'utf8')); } catch (e) {}
  }
  return [];
}

function saveApplications(apps) {
  const p1 = path.join(process.cwd(), 'public', 'data', 'scholarship-applications.json');
  const p2 = path.join(process.cwd(), 'data', 'scholarship-applications.json');
  try {
    fs.mkdirSync(path.dirname(p1), { recursive: true });
    fs.writeFileSync(p1, JSON.stringify(apps, null, 2), 'utf8');
  } catch (e) {}
  try {
    fs.mkdirSync(path.dirname(p2), { recursive: true });
    fs.writeFileSync(p2, JSON.stringify(apps, null, 2), 'utf8');
  } catch (e) {}
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const { id, status, notes } = req.body || {};
  if (!id) {
    return res.status(400).json({ ok: false, message: 'Missing applicant ID' });
  }

  try {
    const apps = getApplications();
    const idx = apps.findIndex(a => a.id === id);
    if (idx === -1) {
      return res.status(404).json({ ok: false, message: 'Applicant not found' });
    }

    if (status !== undefined) apps[idx].status = status;
    if (notes !== undefined) apps[idx].notes = notes;
    apps[idx].updatedAt = new Date().toISOString();

    saveApplications(apps);

    return res.status(200).json({
      ok: true,
      message: 'Applicant status updated successfully',
      application: apps[idx]
    });
  } catch (err) {
    console.error('Error updating scholarship applicant:', err);
    return res.status(500).json({ ok: false, message: 'Internal server error', error: err.message });
  }
}
