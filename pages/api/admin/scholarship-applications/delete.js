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

  const { id } = req.body || {};
  if (!id) {
    return res.status(400).json({ ok: false, message: 'Missing applicant ID' });
  }

  try {
    let apps = getApplications();
    const initialLen = apps.length;
    apps = apps.filter(a => a.id !== id);

    if (apps.length === initialLen) {
      return res.status(404).json({ ok: false, message: 'Applicant not found' });
    }

    saveApplications(apps);

    return res.status(200).json({
      ok: true,
      message: 'Applicant deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting scholarship applicant:', err);
    return res.status(500).json({ ok: false, message: 'Internal server error', error: err.message });
  }
}
