const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const BASE_DIR = __dirname;
const PORT = 8080;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.mp4':  'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.download': 'application/javascript; charset=utf-8'
};

const EXPLICIT_ROUTES = {
  '/':                     'home.html',
  '/home':                 'home.html',
  '/home.html':            'home.html',
  '/courses':              'courses-tracks.html',
  '/courses/':             'courses-tracks.html',
  '/courses-tracks':       'courses-tracks.html',
  '/courses-tracks.html':  'courses-tracks.html',
  '/lms':                  'lms.html',
  '/lms/':                 'lms.html',
  '/lms.html':             'lms.html',
  '/lms-control':          'lms-control.html',
  '/lms-control/':         'lms-control.html',
  '/lms-control.html':     'lms-control.html',
  '/lms-admin':            'lms-control.html',
  '/lms-admin/':           'lms-control.html',
  '/admin/control':        'lms-control.html',
  '/admin/control/':       'lms-control.html',
  '/admin-dashboard':      'lms-control.html',
  '/admin':                'admin/articles.html',
  '/admin/':               'admin/articles.html',
  '/admin/articles':       'admin/articles.html',
  '/admin/articles/':      'admin/articles.html',
  '/admin/publish':        'admin/articles.html',
  '/admin/scholarships':   'admin/scholarships.html',
  '/admin/scholarships/':  'admin/scholarships.html',
  '/admin/scholarship':    'admin/scholarships.html',
  '/admin/scholarship/':   'admin/scholarships.html',
  '/admin/applications':   'admin/scholarships.html',
  '/admin/applications/':  'admin/scholarships.html',
  '/admin/login':          'admin/login.html',
  '/admin/login/':         'admin/login.html',
  '/central-login':        'central-login.html',
  '/central-login/':       'central-login.html',
  '/central-login.html':   'central-login.html',
  '/student-lms':          'student-lms.html',
  '/student-lms/':         'student-lms.html',
  '/student-lms.html':     'student-lms.html',
  '/pay-checkout':         'pay-checkout.html',
  '/pay-checkout/':        'pay-checkout.html',
  '/pay-checkout.html':    'pay-checkout.html',
  '/verify-certificate':   'verify-certificate.html',
  '/verify-certificate.html': 'verify-certificate.html',
  '/pay':                  'pay-checkout.html',
  '/pay/':                 'pay-checkout.html',
  '/dashboard':            'student-lms.html',
  '/dashboard/':           'student-lms.html',
  '/dashboard.html':       'student-lms.html',
  '/scholarship':          'scholarship.html',
  '/scholarship/':         'scholarship.html',
  '/cdpo':                 'cdpo.html',
  '/cdpo/':                'cdpo.html',
  '/about':                '_pages/about.html',
  '/about/':               '_pages/about.html',
  '/about.html':           '_pages/about.html',
  '/contact':              '_pages/contact.html',
  '/contact/':             '_pages/contact.html',
  '/contact.html':         '_pages/contact.html',
  '/complaint':            'complaint.html',
  '/complaint/':           'complaint.html',
  '/career-badges':        '_pages/career-badges.html',
  '/career-badges/':       '_pages/career-badges.html',
  '/certificates':         '_pages/certificates.html',
  '/certificates/':        '_pages/certificates.html',
  '/certificate-preview':  'home_files/certificate-preview.html',
  '/certificate-preview/': 'home_files/certificate-preview.html',
  '/knowledge-base':       '_pages/knowledge-base.html',
  '/knowledge-base/':      '_pages/knowledge-base.html',
  '/learner':              '_pages/learner.html',
  '/learner/':             '_pages/learner.html',
  '/login':                '_pages/login.html',
  '/login/':               '_pages/login.html',
  '/privacy':              '_pages/privacy.html',
  '/privacy/':             '_pages/privacy.html',
  '/terms':                '_pages/terms.html',
  '/terms/':               '_pages/terms.html',
  '/sample-certificate':   'sample-certificate.html',
  '/sample-certificate/':  'sample-certificate.html',
  '/sample-certificate.html': 'sample-certificate.html',
  '/verify':               '_pages/verify.html',
  '/verify/':              '_pages/verify.html'
};

const COMPANION_FOLDERS = ['home_files', 'scholarship_files'];

function resolveFilePath(cleanPath) {
  // 1. Check explicit map
  if (EXPLICIT_ROUTES[cleanPath]) {
    const p = path.join(BASE_DIR, EXPLICIT_ROUTES[cleanPath]);
    if (fs.existsSync(p)) return p;
  }

  // 2. Direct static file in public/
  const directPath = path.join(BASE_DIR, cleanPath);
  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return directPath;
  }

  // 3. Try with .html in public/
  const htmlPath = path.join(BASE_DIR, cleanPath + '.html');
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    return htmlPath;
  }

  // 4. Try in _pages/
  const pagesPath = path.join(BASE_DIR, '_pages', path.basename(cleanPath) + '.html');
  if (fs.existsSync(pagesPath) && fs.statSync(pagesPath).isFile()) {
    return pagesPath;
  }

  // 5. Try in companion folders (e.g., home_files/...)
  for (const folder of COMPANION_FOLDERS) {
    if (cleanPath.startsWith('/' + folder + '/')) {
      const rel = cleanPath.slice(folder.length + 2);
      const inFolder = path.join(BASE_DIR, folder, rel);
      if (fs.existsSync(inFolder)) return inFolder;
      if (fs.existsSync(inFolder + '.download')) return inFolder + '.download';
    }
  }

  return null;
}

const https = require('https');

const SCHOLARSHIP_DATA_PATH = path.join(BASE_DIR, 'data', 'scholarship-applications.json');

function getScholarshipApplications() {
  try {
    if (fs.existsSync(SCHOLARSHIP_DATA_PATH)) {
      return JSON.parse(fs.readFileSync(SCHOLARSHIP_DATA_PATH, 'utf8'));
    }
    const fallbackPath = path.join(BASE_DIR, '..', 'data', 'scholarship-applications.json');
    if (fs.existsSync(fallbackPath)) {
      return JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading scholarship applications:', err);
  }
  return [];
}

function saveScholarshipApplications(apps) {
  try {
    const dir = path.dirname(SCHOLARSHIP_DATA_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(SCHOLARSHIP_DATA_PATH, JSON.stringify(apps, null, 2), 'utf8');

    const mirrorPath = path.join(BASE_DIR, '..', 'data', 'scholarship-applications.json');
    const mirrorDir = path.dirname(mirrorPath);
    if (fs.existsSync(mirrorDir)) {
      fs.writeFileSync(mirrorPath, JSON.stringify(apps, null, 2), 'utf8');
    }
    return true;
  } catch (err) {
    console.error('Error saving scholarship applications:', err);
    return false;
  }
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  const cleanPath = decodeURIComponent(parsed.pathname).replace(/\/$/, '') || '/';
  
  // API: Submit scholarship application (saves to official registry + proxies to cloud)
  if (cleanPath === '/api/scholarship/apply' && req.method === 'POST') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const rawBody = Buffer.concat(body);
      let parsedPayload = {};
      try {
        parsedPayload = JSON.parse(rawBody.toString('utf8'));
      } catch (e) {}

      // Save locally to official scholarship registry
      const apps = getScholarshipApplications();
      const randHex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
      const newApp = {
        id: 'SCH-2026-' + randHex,
        firstName: parsedPayload.firstName || '',
        lastName: parsedPayload.lastName || '',
        fullName: ((parsedPayload.firstName || '') + ' ' + (parsedPayload.lastName || '')).trim() || 'Anonymous Applicant',
        email: parsedPayload.email || '',
        mobile: parsedPayload.mobile || '',
        track: parsedPayload.track || 'SOC Analyst',
        location: parsedPayload.location || 'Nigeria / Remote',
        comment: parsedPayload.comment || '',
        company: parsedPayload.company || '',
        consent: parsedPayload.consent !== undefined ? !!parsedPayload.consent : true,
        status: 'Pending',
        appliedAt: new Date().toISOString(),
        notes: ''
      };

      apps.unshift(newApp);
      saveScholarshipApplications(apps);

      // Best effort background forward to Supabase if configured
      try {
        const options = {
          hostname: 'gifabmhvfxqleilpipsz.supabase.co',
          path: '/functions/v1/scholarship-waitlist',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'https://truststack.academy',
            'Content-Length': rawBody.length
          }
        };
        const proxyReq = https.request(options, () => {});
        proxyReq.on('error', () => {});
        proxyReq.write(rawBody);
        proxyReq.end();
      } catch (err) {}

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({
        ok: true,
        message: 'Your scholarship interest has been received and recorded in the official registry.',
        id: newApp.id
      }));
    });
    return;
  }

  // Admin API: List scholarship applications with statistics
  if (cleanPath === '/api/admin/scholarship-applications' && req.method === 'GET') {
    const apps = getScholarshipApplications();
    const stats = {
      total: apps.length,
      pending: apps.filter(a => (a.status || '').toLowerCase() === 'pending').length,
      shortlisted: apps.filter(a => (a.status || '').toLowerCase() === 'shortlisted').length,
      approved: apps.filter(a => (a.status || '').toLowerCase() === 'approved').length,
      rejected: apps.filter(a => (a.status || '').toLowerCase() === 'rejected').length
    };
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ ok: true, stats, total: apps.length, applications: apps }));
    return;
  }

  // Admin API: Update applicant status or internal notes
  if (cleanPath === '/api/admin/scholarship-applications/update' && req.method === 'POST') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      try {
        const { id, status, notes } = JSON.parse(Buffer.concat(body).toString('utf8'));
        const apps = getScholarshipApplications();
        const app = apps.find(a => a.id === id);
        if (app) {
          if (status !== undefined) app.status = status;
          if (notes !== undefined) app.notes = notes;
          saveScholarshipApplications(apps);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, application: app }));
          return;
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, message: 'Applicant not found' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, message: err.message }));
      }
    });
    return;
  }

  // Admin API: Delete applicant
  if (cleanPath === '/api/admin/scholarship-applications/delete' && req.method === 'POST') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      try {
        const { id } = JSON.parse(Buffer.concat(body).toString('utf8'));
        let apps = getScholarshipApplications();
        const initialLen = apps.length;
        apps = apps.filter(a => a.id !== id);
        if (apps.length < initialLen) {
          saveScholarshipApplications(apps);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true }));
          return;
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, message: 'Applicant not found' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, message: err.message }));
      }
    });
    return;
  }

  // Admin API: Export applicants to CSV
  if (cleanPath === '/api/admin/scholarship-applications/export' && req.method === 'GET') {
    const apps = getScholarshipApplications();
    const csvRows = [
      ['ID', 'Full Name', 'First Name', 'Last Name', 'Email', 'Mobile', 'Career Track', 'Location', 'Status', 'Date Applied', 'Motivation Statement', 'Admin Notes'].join(',')
    ];
    apps.forEach(a => {
      const escape = (val) => '"' + String(val || '').replace(/"/g, '""').replace(/\r?\n/g, ' ') + '"';
      csvRows.push([
        escape(a.id),
        escape(a.fullName),
        escape(a.firstName),
        escape(a.lastName),
        escape(a.email),
        escape(a.mobile),
        escape(a.track),
        escape(a.location),
        escape(a.status),
        escape(a.appliedAt),
        escape(a.comment),
        escape(a.notes)
      ].join(','));
    });
    const csvContent = csvRows.join('\r\n');
    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="truststack-scholarship-applicants.csv"'
    });
    res.end(csvContent);
    return;
  }

  // API to verify certificates against certs.json registry
  if ((cleanPath === '/api/verify' || cleanPath.startsWith('/api/verify/')) && req.method === 'GET') {
    let certId = '';
    if (cleanPath.startsWith('/api/verify/')) {
      certId = cleanPath.slice('/api/verify/'.length).trim();
    } else {
      const q = new URL(req.url, `http://${req.headers.host || 'localhost'}`).searchParams;
      certId = (q.get('id') || '').trim();
    }
    certId = certId.toUpperCase();

    const certsJsonPath = path.join(BASE_DIR, 'certs.json');
    let certificates = [];
    if (fs.existsSync(certsJsonPath)) {
      try {
        const certData = JSON.parse(fs.readFileSync(certsJsonPath, 'utf8'));
        certificates = certData.certificates || [];
      } catch (e) {
        console.error('Error reading certs.json:', e);
      }
    }

    if (!certId) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ valid: false, error: 'Certificate ID is required' }));
      return;
    }

    const found = certificates.find(c => (c.id || '').toUpperCase() === certId);
    if (found) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(JSON.stringify({
        valid: true,
        id: found.id,
        student: found.student,
        track: found.track,
        date_issued: found.date_issued,
        status: found.status || 'verified',
        hash_prefix: found.hash_prefix,
        hash_full: found.hash_full,
        verify_url: found.verify_url || `https://truststack.academy/verify?id=${found.id}`,
        message: 'OFFICIAL REGISTRY RECORD'
      }));
    } else {
      res.writeHead(404, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({
        valid: false,
        error: 'Certificate ID not found',
        checks: ['file_lookup: failed']
      }));
    }
    return;
  }

  // API to fetch articles registry
  if (cleanPath === '/api/articles' && req.method === 'GET') {
    const articlesJsonPath = path.join(BASE_DIR, 'articles.json');
    if (fs.existsSync(articlesJsonPath)) {
      const data = fs.readFileSync(articlesJsonPath, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(data);
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ articles: [], meta: { total: 0 } }));
    }
    return;
  }

  // API to publish or save article
  if ((cleanPath === '/api/admin/articles/publish' || cleanPath === '/api/articles/publish') && req.method === 'POST') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      try {
        const payload = JSON.parse(Buffer.concat(body).toString('utf8'));
        const articlesJsonPath = path.join(BASE_DIR, 'articles.json');
        let registry = { articles: [], meta: { version: '1.0.0', total: 0 } };
        if (fs.existsSync(articlesJsonPath)) {
          try { registry = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8')); } catch (e) {}
        }
        if (!Array.isArray(registry.articles)) registry.articles = [];

        const now = new Date().toISOString();
        const slug = (payload.slug || payload.title || 'untitled').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        payload.slug = slug;
        payload.updatedAt = now;

        const idx = registry.articles.findIndex(a => a.id === payload.id || a.slug === slug);
        if (idx >= 0) {
          registry.articles[idx] = Object.assign(registry.articles[idx], payload);
        } else {
          payload.id = payload.id || 'article-' + Date.now();
          payload.createdAt = now;
          registry.articles.unshift(payload);
        }
        registry.meta = Object.assign(registry.meta || {}, {
          total: registry.articles.length,
          updatedAt: now,
          storage: 'TrustStack local & cloud registry'
        });

        fs.writeFileSync(articlesJsonPath, JSON.stringify(registry, null, 2), 'utf8');

        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: true, id: payload.id, slug: slug, status: payload.status || 'publish', link: `/knowledge-base?article=${slug}` }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  const filePath = resolveFilePath(cleanPath);

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Not found: ${cleanPath}`);
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Internal Server Error loading ${cleanPath}`);
      return;
    }

    let ext = path.extname(filePath).toLowerCase();
    if (ext === '.download') {
      ext = path.extname(filePath.replace('.download', '')).toLowerCase() || '.js';
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 TrustStack Academy server listening on http://localhost:${PORT}`);
});
