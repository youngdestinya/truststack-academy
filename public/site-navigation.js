(function () {
  const path = location.pathname.toLowerCase();
  const clean = (value) => (value || '').replace(/\s+/g, ' ').trim().replace(/[→←]/g, '').trim().toLowerCase();
  const tracks = {
    'soc analyst': { icon: '🛡', color: '#00b8d9', tint: 'rgba(0,184,217,.10)' },
    'soc analyst track': { icon: '🛡', color: '#00b8d9', tint: 'rgba(0,184,217,.10)' },
    'soc analyst & incident response': { icon: '🛡', color: '#00b8d9', tint: 'rgba(0,184,217,.10)' },
    'digital forensics': { icon: '⌕', color: '#7c3aed', tint: 'rgba(124,58,237,.09)' },
    'digital forensics & ir readiness': { icon: '⌕', color: '#7c3aed', tint: 'rgba(124,58,237,.09)' },
    'digital forensics & incident response': { icon: '⌕', color: '#7c3aed', tint: 'rgba(124,58,237,.09)' },
    'threat intelligence': { icon: '◉', color: '#2563eb', tint: 'rgba(37,99,235,.09)' },
    'penetration testing': { icon: '◎', color: '#ef4444', tint: 'rgba(239,68,68,.09)' },
    'ethical hacking': { icon: '◎', color: '#ef4444', tint: 'rgba(239,68,68,.09)' },
    'ethical hacking & penetration testing': { icon: '◎', color: '#ef4444', tint: 'rgba(239,68,68,.09)' },
    'cloud security': { icon: '☁', color: '#4f46e5', tint: 'rgba(79,70,229,.09)' },
    'cloud security (aws/azure)': { icon: '☁', color: '#4f46e5', tint: 'rgba(79,70,229,.09)' },
    'network security': { icon: '⌁', color: '#0891b2', tint: 'rgba(8,145,178,.09)' },
    'network security & defense': { icon: '⌁', color: '#0891b2', tint: 'rgba(8,145,178,.09)' },
    'web application security': { icon: '</>', color: '#2563eb', tint: 'rgba(37,99,235,.09)' },
    'linux privilege escalation': { icon: '#', color: '#475569', tint: 'rgba(71,85,105,.09)' },
    'governance & grc': { icon: '✓', color: '#d97706', tint: 'rgba(217,119,6,.10)' },
    'grc & compliance': { icon: '✓', color: '#d97706', tint: 'rgba(217,119,6,.10)' },
    'grc': { icon: '✓', color: '#d97706', tint: 'rgba(217,119,6,.10)' },
    'malware analysis': { icon: '⌁', color: '#16a34a', tint: 'rgba(22,163,74,.09)' },
    'security engineering': { icon: '⌘', color: '#334155', tint: 'rgba(51,65,85,.09)' },
    'secure app dev': { icon: '⌘', color: '#334155', tint: 'rgba(51,65,85,.09)' }
    ,'securesme & cap-adit (business track)': { icon: '✓', color: '#d97706', tint: 'rgba(217,119,6,.10)' }
  };
  const trackPages = {
    'soc analyst': 'soc-analyst', 'soc analyst track': 'soc-analyst', 'soc analyst & incident response': 'soc-analyst',
    'digital forensics': 'digital-forensics', 'digital forensics & ir readiness': 'digital-forensics', 'digital forensics & incident response': 'digital-forensics',
    'threat intelligence': 'threat-intelligence',
    'penetration testing': 'penetration-testing', 'ethical hacking': 'penetration-testing', 'ethical hacking & penetration testing': 'penetration-testing',
    'cloud security': 'cloud-security', 'cloud security (aws/azure)': 'cloud-security',
    'governance & grc': 'governance-grc', 'grc & compliance': 'governance-grc', 'grc': 'governance-grc', 'governance & compliance': 'governance-grc',
    'malware analysis': 'malware-analysis',
    'security engineering': 'security-engineering', 'secure app dev': 'security-engineering',
    'cybersecurity fundamentals': 'cybersecurity-fundamentals',
    'network security': 'network-security', 'network security & defense': 'network-security'
  };
  const trackTarget = (name) => trackPages[name] ? `/courses/${trackPages[name]}` : null;
  const courseModules = {
    'soc-analyst': ['Windows, Linux and network log analysis', 'SIEM queries, dashboards and detection rules', 'Incident triage, escalation and playbooks'],
    'digital-forensics': ['Evidence handling and chain of custody', 'Forensic imaging and integrity verification', 'Memory acquisition and Volatility analysis'],
    'threat-intelligence': ['OSINT collection and source validation', 'Indicators, TTPs and ATT&CK mapping', 'Threat actor and campaign analysis'],
    'penetration-testing': ['Reconnaissance and service enumeration', 'Vulnerability validation and exploitation', 'Web and API security testing'],
    'cloud-security': ['IAM hardening and least privilege', 'Network, storage and secrets security', 'Cloud posture assessment and remediation'],
    'governance-grc': ['Risk assessment and treatment planning', 'Policy and control design', 'NDPA and privacy compliance operations'],
    'malware-analysis': ['Static analysis and file characteristics', 'Dynamic behavioural analysis', 'YARA rules and indicator development'],
    'security-engineering': ['Threat modelling and security requirements', 'Secure development and code review', 'DevSecOps pipelines and automated testing'],
  };

  function addSharedStyles() {
    if (document.getElementById('truststack-shared-identity')) return;
    const style = document.createElement('style');
    style.id = 'truststack-shared-identity';
    style.textContent = `
      .ts-track-identity{--ts-track:#00b8d9;--ts-tint:rgba(0,184,217,.10);display:flex!important;align-items:center;gap:.58em}
      .ts-track-identity:not(.ts-track-has-badge)::before{content:attr(data-ts-icon);display:inline-grid;place-items:center;flex:0 0 auto;width:2.15em;height:2.42em;color:#fff;font-size:.72em;font-family:Arial,sans-serif;font-weight:900;background:linear-gradient(145deg,var(--ts-track),#07182e);clip-path:polygon(50% 0,92% 16%,92% 66%,50% 100%,8% 66%,8% 16%);filter:drop-shadow(0 5px 7px color-mix(in srgb,var(--ts-track) 28%,transparent))}
      .ts-track-surface{background:linear-gradient(145deg,var(--ts-tint),rgba(255,255,255,.86) 74%)!important;backdrop-filter:blur(10px)}
      .ts-track-badge-image{width:54px!important;height:62px!important;object-fit:contain!important;padding:9px!important;background:linear-gradient(145deg,var(--ts-track),#07182e)!important;clip-path:polygon(50% 0,92% 16%,92% 66%,50% 100%,8% 66%,8% 16%)!important;filter:drop-shadow(0 6px 8px color-mix(in srgb,var(--ts-track) 28%,transparent))!important}
      .ts-card-modules{margin-top:1rem;padding-top:.85rem;border-top:1px solid rgba(10,25,49,.1)}
      .ts-card-modules strong{display:block;color:#41516a;font-size:.7rem;letter-spacing:.12em;font-weight:900;margin-bottom:.4rem}
      .ts-card-modules ul{margin:0;padding-left:1rem;color:#33445c;font-size:.81rem;line-height:1.35}
      .ts-card-modules li{margin:.32rem 0}
      .ts-card-modules li::marker{color:var(--ts-track,#00b8d9)}
      img[data-site-destination="/home.html"]{cursor:pointer}
    `;
    document.head.appendChild(style);
  }

  function brandHomeLinks() {
    document.querySelectorAll('img').forEach((image) => {
      const signature = `${image.getAttribute('src') || ''} ${image.getAttribute('alt') || ''}`.toLowerCase();
      if (!/truststack.*logo|logo.*truststack|truststack.*shield|shield gear logo/.test(signature)) return;
      image.dataset.siteDestination = '/home.html';
      image.title = 'TrustStack Academy home';
    });
    document.querySelectorAll('a').forEach((link) => {
      const label = clean(link.textContent);
      if ((label === 'truststack academy' || label === '⚙ truststack academy') && link.textContent.length < 60) link.href = '/home.html';
    });
  }

  function officialCertificateSeals() {
    document.querySelectorAll('img').forEach((image) => {
      const label = `${image.getAttribute('alt') || ''} ${image.getAttribute('title') || ''}`.toLowerCase();
      if (!/cert(ificate)? seal|official seal/.test(label)) return;
      if (!image.src.endsWith('/Cert_Seal.png')) image.src = '/Cert_Seal.png';
      image.alt = 'TrustStack Academy official certificate seal';
    });
    document.querySelectorAll('.seal').forEach((seal) => {
      if (seal.tagName === 'IMG') return;
      seal.textContent = '';
      seal.setAttribute('role', 'img');
      seal.setAttribute('aria-label', 'TrustStack Academy official certificate seal');
      Object.assign(seal.style, { background: 'transparent url(/Cert_Seal.png) center/contain no-repeat', borderRadius: '0' });
    });
    if (path.includes('certificate-preview')) {
      const verified = document.querySelector('header > strong');
      if (verified && !verified.parentElement.querySelector('.ts-official-seal')) {
        const seal = document.createElement('img');
        seal.className = 'ts-official-seal';
        seal.src = '/Cert_Seal.png';
        seal.alt = 'TrustStack Academy official certificate seal';
        Object.assign(seal.style, { width: '46px', height: '46px', objectFit: 'contain', marginRight: '8px', verticalAlign: 'middle' });
        verified.before(seal);
      }
    }
  }

  function trackBadges() {
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,a,span,strong,dt,dd').forEach((element) => {
      if (element.children.length) return;
      const track = tracks[clean(element.textContent)];
      if (!track) return;
      element.classList.add('ts-track-identity');
      element.dataset.tsIcon = track.icon;
      element.style.setProperty('--ts-track', track.color);
      element.style.setProperty('--ts-tint', track.tint);
      let card = element.closest('article,[class*="course-card"],[class*="track-card"],[class~="card"]');
      if (!card) {
        let node = element.parentElement;
        for (let depth = 0; node && depth < 4; depth += 1, node = node.parentElement) {
          const text = clean(node.textContent);
          const matches = Object.keys(tracks).filter((name) => text.includes(name));
          if (node.children.length > 1 && text.length < 900 && new Set(matches.map((name) => tracks[name].color)).size === 1) { card = node; break; }
        }
      }
      if (card) {
        card.classList.add('ts-track-surface');
        card.style.setProperty('--ts-track', track.color);
        card.style.setProperty('--ts-tint', track.tint);
        const existingBadge = card.querySelector('[style*="clip-path"],[style*="clipPath"],.badge');
        const iconImage = card.querySelector('img:not([data-site-destination="/home.html"])');
        if (iconImage) {
          iconImage.classList.add('ts-track-badge-image');
          iconImage.style.setProperty('--ts-track', track.color);
        }
        if (existingBadge || iconImage) element.classList.add('ts-track-has-badge');
      }
    });
  }

  function destination(element) {
    const label = clean(element.textContent);
    const raw = (element.textContent || '').toLowerCase();
    if (/^enroll( at| now| bundle|$)/.test(label) || /^pay( in naira|$)/.test(label)) return '/pay';
    if (label === 'home' || label === 'enter main website' || label === 'main website') return '/home.html';
    if (label === 'courses' || label === 'tracks' || label === 'explore courses' || label === 'view all courses' || label === 'browse tracks' || label === 'browse 8 tracks') return '/courses';
    if (label === 'certificates' || label === 'verify' || label === 'verify certificate' || label === 'verify a certificate') return '/verify';
    if (label === 'lms' || label === 'enter lms' || label === 'my learning') return '/lms';
    if (label === 'pay') return '/pay';
    if (label === 'about' || label === 'our story') return '/home.html#about';
    if (label === 'contact') return '/home.html#contact';
    if (label === 'why truststack' || label === 'why truststack?') return '/home.html#whytruststack';
    if (label === 'our mission' || label === 'our core values' || label === 'our vision') return '/home.html#about';
    if (label === 'cap-adit' || label === 'securesme') return '/courses';
    if (label === 'privacy') return '/privacy';
    if (label === 'terms') return '/terms';
    if (label === 'view all articles' || label === 'explore the knowledge base' || label === 'read all articles' || label === 'knowledge base') return '/knowledge-base';
    if (path.includes('student-lms') && label === 'labs') return '/lms';
    if (path.includes('student-lms') && label === 'pricing') return '/courses';
    if (path.includes('courses-tracks') && label === 'view labs') return '/lms';
    if (path.includes('lms-full') && label === 'view all') return '/courses';
    if ((path.includes('home') || path.includes('lms-full')) && trackTarget(label)) return trackTarget(label);
    if (raw.includes('verify certificate') && (element.tagName === 'A' || element.tagName === 'BUTTON')) return '/verify';
    return null;
  }

  function wire() {
    addSharedStyles();
    brandHomeLinks();
    officialCertificateSeals();
    trackBadges();
    document.querySelectorAll('a,button,span').forEach((element) => {
      const target = destination(element);
      if (target && element.tagName === 'A' && element.getAttribute('href') !== target) element.setAttribute('href', target);
      if (target && element.dataset.siteDestination !== target) element.dataset.siteDestination = target;
      if (target && element.tagName === 'SPAN') element.style.cursor = 'pointer';
    });
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,strong').forEach((heading) => {
      if (heading.children.length) return;
      const label = clean(heading.textContent);
      const target = trackTarget(label);
      if (!target) return;
      let card = heading.closest('article,.ts-track-surface,[class*="course-card"],[class*="track-card"],[class~="card"]');
      if (!card) {
        let node = heading.parentElement;
        for (let depth = 0; node && depth < 5; depth += 1, node = node.parentElement) {
          if (node.children.length > 1 && clean(node.textContent).length < 700) { card = node; break; }
        }
      }
      if (!card) return;
      const slug = trackPages[label];
      if (path.includes('courses-tracks')) {
        card.id = slug;
        card.style.scrollMarginTop = '92px';
      }
      if (path.includes('home') || path.includes('lms-full')) {
        card.dataset.siteDestination = target;
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View ${heading.textContent.trim()} course details`);
        card.style.cursor = 'pointer';
        card.querySelectorAll('a,button').forEach((control) => {
          const isEnrollment = /enroll|pay|start learning/i.test(control.textContent || '');
          control.dataset.siteDestination = isEnrollment ? `/pay?track=${slug}` : target;
          if (control.tagName === 'A') control.setAttribute('href', control.dataset.siteDestination);
        });
      }
    });
    if (path.includes('home')) {
      const curriculum = document.getElementById('curriculum');
      curriculum?.querySelectorAll('div').forEach((title) => {
        if (title.children.length || !trackPages[clean(title.textContent)]) return;
        const card = title.parentElement;
        if (!card || !card.classList.contains('group')) return;
        const slug = trackPages[clean(title.textContent)];
        const courseUrl = `/courses/${slug}`;
        if (card.dataset.siteDestination !== courseUrl) card.dataset.siteDestination = courseUrl;
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View ${title.textContent.trim()} course details`);
        card.style.cursor = 'pointer';
        const enroll = Array.from(card.querySelectorAll('div')).find((node) => !node.children.length && /^enroll\b/i.test(node.textContent.trim()));
        if (enroll) {
          enroll.dataset.siteDestination = `/pay?track=${slug}`;
          enroll.setAttribute('role', 'button');
          enroll.setAttribute('tabindex', '0');
          enroll.setAttribute('aria-label', `Enroll in ${title.textContent.trim()}`);
        }
        if (enroll && !card.querySelector('.ts-card-modules')) {
          const preview = document.createElement('div');
          preview.className = 'ts-card-modules';
          preview.style.setProperty('--ts-track', tracks[clean(title.textContent)]?.color || '#00b8d9');
          const label = document.createElement('strong');
          label.textContent = 'CORE MODULES';
          const list = document.createElement('ul');
          courseModules[slug].forEach((module) => {
            const item = document.createElement('li');
            item.textContent = module;
            list.appendChild(item);
          });
          preview.append(label, list);
          card.insertBefore(preview, enroll.parentElement);
        }
      });
    }
    if (path.includes('courses-tracks') && location.hash && !document.documentElement.dataset.trackHashHandled) {
      const destinationCard = document.getElementById(location.hash.slice(1));
      if (destinationCard) {
        document.documentElement.dataset.trackHashHandled = 'true';
        requestAnimationFrame(() => destinationCard.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
    }
    if (path.includes('home')) {
      document.querySelectorAll('div').forEach((node) => {
        if (clean(node.textContent).startsWith('contact & social') && node.querySelector('a')) node.id = node.id || 'contact';
      });
      document.querySelectorAll('h3,h4').forEach((heading) => {
        if (/BVN NIN Linkage Risks|Wireshark for SOC Analysts|AWS Misconfigurations/.test(heading.textContent || '')) {
          heading.dataset.siteDestination = '/knowledge-base';
          heading.style.cursor = 'pointer';
        }
      });
    }
    if (path.includes('student-lms')) {
      document.querySelectorAll('video').forEach((video) => {
        if (!video.getAttribute('src') && !video.querySelector('source')) { video.src='/truststack-academy-intro.mp4'; video.controls=true; video.preload='metadata'; }
      });
    }
    document.querySelectorAll('img[alt*="Sample Certificate"],img[alt*="sample certificate"]').forEach((image) => {
      image.dataset.siteDestination='/sample-certificate'; image.style.cursor='pointer'; image.title='View the official sample certificate';
    });
    if (document.title === 'React Artifact' && path.includes('courses-tracks')) document.title = 'Courses & Tracks | TrustStack Academy';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
  new MutationObserver(wire).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('click', (event) => {
    const element = event.target && event.target.closest && event.target.closest('a,button,[data-site-destination]');
    if (!element) return;
    const target = element.dataset.siteDestination || destination(element);
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.href = target;
  }, true);
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const element = event.target && event.target.closest && event.target.closest('[data-site-destination]');
    if (!element || element.tagName === 'A' || element.tagName === 'BUTTON') return;
    event.preventDefault();
    location.href = element.dataset.siteDestination;
  });
})();
