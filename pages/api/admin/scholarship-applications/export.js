import fs from 'fs';
import path from 'path';

function getApplications() {
  const p1 = path.join(process.cwd(), 'public', 'data', 'scholarship-applications.json');
  if (fs.existsSync(p1)) {
    try { return JSON.parse(fs.readFileSync(p1, 'utf8')); } catch (e) {}
  }
  return [];
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const apps = getApplications();
    const headers = ['Application ID', 'Full Name', 'Email', 'Mobile', 'Career Track', 'Status', 'Applied At', 'Notes'];
    const rows = apps.map(a => [
      `"${a.id || ''}"`,
      `"${(a.fullName || `${a.firstName || ''} ${a.lastName || ''}`).replace(/"/g, '""')}"`,
      `"${(a.email || '').replace(/"/g, '""')}"`,
      `"${(a.mobile || '').replace(/"/g, '""')}"`,
      `"${(a.track || '').replace(/"/g, '""')}"`,
      `"${(a.status || 'Pending').replace(/"/g, '""')}"`,
      `"${(a.appliedAt || '').replace(/"/g, '""')}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="truststack-scholarship-applicants.csv"');
    return res.status(200).send(csvContent);
  } catch (err) {
    console.error('Error exporting scholarship applications:', err);
    return res.status(500).json({ ok: false, message: 'Internal server error', error: err.message });
  }
}
