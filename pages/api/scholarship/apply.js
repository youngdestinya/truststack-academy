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

  try {
    const payload = req.body || {};
    const { firstName, lastName, fullName, email, mobile, phone, track, comment, company, consent, location } = payload;

    if (!email) {
      return res.status(400).json({ ok: false, message: 'Please provide a valid email address.' });
    }

    // 1. Record application in local persistent database
    const apps = getApplications();
    const nextNum = String(apps.length + 1).padStart(3, '0');
    const newId = `SCH-2026-${nextNum}`;

    const newApp = {
      id: newId,
      firstName: firstName || (fullName ? fullName.split(' ')[0] : 'Applicant'),
      lastName: lastName || (fullName ? fullName.split(' ').slice(1).join(' ') : ''),
      fullName: fullName || `${firstName || ''} ${lastName || ''}`.trim() || 'Scholarship Applicant',
      email: String(email).trim().toLowerCase(),
      mobile: mobile || phone || '',
      track: track || 'SOC Analyst',
      location: location || 'Nigeria',
      comment: comment || '',
      company: company || '',
      consent: consent === true || consent === 'true' || consent === 'on',
      status: 'Pending',
      appliedAt: new Date().toISOString(),
      notes: ''
    };

    apps.unshift(newApp);
    saveApplications(apps);

    // 2. Also forward to cloud Supabase function in the background
    try {
      fetch('https://gifabmhvfxqleilpipsz.supabase.co/functions/v1/scholarship-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://truststack.academy'
        },
        body: JSON.stringify(payload)
      }).catch(err => console.warn('Supabase forward error:', err));
    } catch (e) {}

    return res.status(200).json({
      ok: true,
      id: newId,
      message: 'Your scholarship application has been successfully recorded in the official TrustStack Academy registry. Our admissions team will review your submission.'
    });
  } catch (error) {
    console.error('Scholarship submission error:', error);
    return res.status(500).json({
      ok: false,
      message: error.message || 'An error occurred while submitting your application.'
    });
  }
}
