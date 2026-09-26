(function () {
  if (!document.querySelector('script[src="/cookie-consent.js"]')) {
    const consentScript = document.createElement('script');
    consentScript.src = '/cookie-consent.js';
    document.head.appendChild(consentScript);
  }
  const path = location.pathname.toLowerCase();
  const clean = (value) => (value || '').replace(/\s+/g, ' ').trim().replace(/[→←]/g, '').trim().toLowerCase();

  const tracks = {
    'soc analyst': { icon: '🛡', color: '#00b8d9', tint: 'rgba(0,184,217,.10)' },
    'soc analyst track': { icon: '🛡', color: '#00b8d9', tint: 'rgba(0,184,217,.10)' },
    'soc analyst & incident response': { icon: '🛡', color: '#00b8d9', tint: 'rgba(0,184,217,.10)' },
    'digital forensics': { icon: '⌕', color: '#f97316', tint: 'rgba(249,115,22,.09)' },
    'digital forensics & ir readiness': { icon: '⌕', color: '#f97316', tint: 'rgba(249,115,22,.09)' },
    'digital forensics & incident response': { icon: '⌕', color: '#f97316', tint: 'rgba(249,115,22,.09)' },
    'threat intelligence': { icon: '◉', color: '#8b5cf6', tint: 'rgba(139,92,246,.09)' },
    'penetration testing': { icon: '◎', color: '#ef4444', tint: 'rgba(239,68,68,.09)' },
    'ethical hacking': { icon: '◎', color: '#ef4444', tint: 'rgba(239,68,68,.09)' },
    'ethical hacking & penetration testing': { icon: '◎', color: '#ef4444', tint: 'rgba(239,68,68,.09)' },
    'cloud security': { icon: '☁', color: '#0ea5e9', tint: 'rgba(14,165,233,.09)' },
    'cloud security (aws/azure)': { icon: '☁', color: '#0ea5e9', tint: 'rgba(14,165,233,.09)' },
    'network security': { icon: '⌁', color: '#0891b2', tint: 'rgba(8,145,178,.09)' },
    'network security & defense': { icon: '⌁', color: '#0891b2', tint: 'rgba(8,145,178,.09)' },
    'web application security': { icon: '</>', color: '#2563eb', tint: 'rgba(37,99,235,.09)' },
    'linux privilege escalation': { icon: '#', color: '#475569', tint: 'rgba(71,85,105,.09)' },
    'governance & grc': { icon: '✓', color: '#10b981', tint: 'rgba(16,185,129,.10)' },
    'grc & compliance': { icon: '✓', color: '#10b981', tint: 'rgba(16,185,129,.10)' },
    'grc': { icon: '✓', color: '#10b981', tint: 'rgba(16,185,129,.10)' },
    'malware analysis': { icon: '⌁', color: '#f59e0b', tint: 'rgba(245,158,11,.09)' },
    'security engineering': { icon: '⌘', color: '#6366f1', tint: 'rgba(99,102,241,.09)' },
    'secure app dev': { icon: '⌘', color: '#6366f1', tint: 'rgba(99,102,241,.09)' }
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

  // 8 Career Tracks with dedicated Course Badge Icons (NO pre-icons)
  const courseCatalogItems = [
    { name: 'SOC Analyst Track', slug: 'soc-analyst', icon: '🛡', color: '#00b8d9' },
    { name: 'Digital Forensics', slug: 'digital-forensics', icon: '⌕', color: '#f97316' },
    { name: 'Threat Intelligence', slug: 'threat-intelligence', icon: '◉', color: '#8b5cf6' },
    { name: 'Penetration Testing', slug: 'penetration-testing', icon: '◎', color: '#ef4444' },
    { name: 'Cloud Security', slug: 'cloud-security', icon: '☁', color: '#0ea5e9' },
    { name: 'Governance & GRC', slug: 'governance-grc', icon: '✓', color: '#10b981' },
    { name: 'Malware Analysis', slug: 'malware-analysis', icon: '⌁', color: '#f59e0b' },
    { name: 'Security Engineering', slug: 'security-engineering', icon: '⌘', color: '#6366f1' }
  ];

  // Resources Menu Items: Strictly NO icons (clean text links only)
  const resourceMenuItems = [
    { label: 'Central Login Directory', href: '/central-login' },
    { label: 'Learner LMS Portal', href: '/student-lms' },
    { label: 'LMS Administrator Login', href: '/login?role=admin' },
    { label: 'LMS Control Dashboard', href: '/lms-control' },
    { label: 'Verify Certificate', href: '/verify' },
    { label: 'Knowledge Base', href: '/knowledge-base' },
    { label: 'Free CDPO Course', href: '/cdpo' },
    { label: 'Career Badges', href: '/career-badges' }
  ];

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
      @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,300;0,400;0,500;0,700;0,800;0,900;1,400;1,700&display=swap');
      *, *::before, *::after, html, body, button, input, select, textarea, h1, h2, h3, h4, h5, h6, p, span, a, strong, small, label, div, nav, header, footer {
        font-family: 'Alegreya Sans', sans-serif !important;
      }

      .ts-track-identity{--ts-track:#00b8d9;--ts-tint:rgba(0,184,217,.10);display:flex!important;align-items:center;gap:.58em}
      .ts-track-identity:not(.ts-track-has-badge)::before{content:attr(data-ts-icon);display:inline-grid;place-items:center;flex:0 0 auto;width:2.15em;height:2.42em;color:#fff;font-size:.72em;font-family:Arial,sans-serif;font-weight:900;background:linear-gradient(145deg,var(--ts-track),#07182e);clip-path:polygon(50% 0,92% 16%,92% 66%,50% 100%,8% 66%,8% 16%);filter:drop-shadow(0 5px 7px color-mix(in srgb,var(--ts-track) 28%,transparent))}
      .ts-track-surface{background:linear-gradient(145deg,var(--ts-tint),rgba(255,255,255,.96) 74%)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
      .ts-track-badge-image{width:54px!important;height:62px!important;object-fit:contain!important;padding:9px!important;background:linear-gradient(145deg,var(--ts-track),#07182e)!important;clip-path:polygon(50% 0,92% 16%,92% 66%,50% 100%,8% 66%,8% 16%)!important;filter:drop-shadow(0 6px 8px color-mix(in srgb,var(--ts-track) 28%,transparent))!important}
      .ts-card-modules{margin-top:1rem;padding-top:.85rem;border-top:1px solid rgba(10,25,49,.1)}
      .ts-card-modules strong{display:block;color:#41516a;font-size:.7rem;letter-spacing:.12em;font-weight:900;margin-bottom:.4rem}
      .ts-card-modules ul{margin:0;padding-left:1rem;color:#33445c;font-size:.81rem;line-height:1.35}
      .ts-card-modules li{margin:.32rem 0}
      .ts-card-modules li::marker{color:var(--ts-track,#00b8d9)}
      .ts-kb-section{max-width:1280px!important;margin:0 auto!important;padding:5rem 1.5rem 5.5rem!important;background:#f7f9fc}
      .ts-kb-heading{text-align:center;margin:0 auto 3rem;max-width:760px}
      .ts-kb-kicker{display:flex;align-items:center;justify-content:center;gap:.8rem;color:#00aee5;font-size:.78rem;font-weight:900;letter-spacing:.19em;text-transform:uppercase}
      .ts-kb-dots{letter-spacing:.24em;color:#e1ad16;font-size:1rem}
      .ts-kb-heading h2{margin:.65rem 0 .8rem;color:#081a35;font-size:clamp(2.5rem,5vw,4.25rem);line-height:.98;font-weight:900}
      .ts-kb-heading h2 span{color:#00aee5}
      .ts-kb-heading p{margin:0;color:#68758a;font-size:1.03rem;line-height:1.55}
      .ts-kb-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.5rem}
      .ts-kb-card{display:flex;min-width:0;flex-direction:column;overflow:hidden;border:1px solid #dfe6ee;border-radius:18px;background:#fff;box-shadow:0 14px 38px rgba(8,26,53,.07);transition:transform .2s ease,box-shadow .2s ease;text-decoration:none!important;color:inherit!important}
      .ts-kb-card:hover{transform:translateY(-6px);box-shadow:0 20px 44px rgba(8,26,53,.13)}
      .ts-kb-image{position:relative;height:230px;overflow:hidden;background:#0b1f3a}
      .ts-kb-image img{width:100%!important;height:100%!important;object-fit:cover!important;display:block;transition:transform .35s ease}
      .ts-kb-card:hover .ts-kb-image img{transform:scale(1.035)}
      .ts-kb-category{display:flex;align-items:center;min-height:58px;padding:.9rem 1.25rem;background:var(--ts-kb-accent);color:#fff;font-size:.76rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
      .ts-kb-body{display:flex;flex:1;flex-direction:column;padding:1.35rem 1.35rem 1.55rem}
      .ts-kb-meta{display:flex;align-items:center;gap:.55rem;color:#7b8798;font-size:.78rem;font-weight:700}
      .ts-kb-title{margin:1rem 0 .75rem;color:#081a35;font-size:1.25rem;line-height:1.22;font-weight:900}
      .ts-kb-excerpt{margin:0;color:#637086;font-size:.94rem;line-height:1.58}
      .ts-kb-read{display:inline-flex;align-items:center;gap:.55rem;margin-top:auto;padding-top:1.5rem;color:var(--ts-kb-accent);font-size:.82rem;font-weight:900;letter-spacing:.07em;text-transform:uppercase}
      .ts-kb-read b{font-size:1.25rem;line-height:1}
      .ts-kb-footer{display:flex;justify-content:center;align-items:center;gap:.7rem;margin-top:2.4rem}
      .ts-kb-page,.ts-kb-all{display:inline-grid;place-items:center;min-width:46px;height:46px;border:1px solid #dce4ed;border-radius:10px;background:#fff;color:#081a35;font-weight:900;text-decoration:none!important}
      .ts-kb-page[aria-current="page"]{background:#081a35;color:#fff;border-color:#081a35}
      .ts-kb-all{padding:0 1.2rem;color:#fff;background:#00aee5;border-color:#00aee5;text-transform:uppercase;letter-spacing:.06em;font-size:.76rem}
      .ts-footer-resources a{display:flex;align-items:center;gap:.55rem;color:rgba(255,255,255,.7);font-size:13px;line-height:1.35;text-decoration:none;transition:color .18s ease,transform .18s ease}
      .ts-footer-resources a::before{content:'›';display:grid;place-items:center;width:16px;height:16px;border-radius:50%;background:rgba(212,175,55,.14);color:#d4af37;font-size:14px;font-weight:900}
      .ts-footer-resources a:hover{color:#fff;transform:translateX(3px)}
      .ts-home-footer{color:#fff!important}
      .ts-home-footer :where(p,span,a){color:#fff!important}
      .ts-home-footer :where(a,button){transition:color .18s ease!important}
      .ts-home-footer :where(a,button):hover{color:#00b8d9!important}
      .ts-home-footer .ts-footer-light-panel,.ts-home-footer .ts-footer-light-panel :where(p,span){color:#0a1931!important}
      .ts-home-footer .ts-footer-light-panel input{color:#0a1931!important}
      .ts-home-footer .ts-footer-light-panel input::placeholder{color:#8290a5!important}
      .ts-home-footer .ts-footer-light-panel button{color:#fff!important}
      .ts-home-footer .ts-footer-light-panel button:hover{color:#00b8d9!important}
      .ts-enrolment-section{position:relative;overflow:hidden;background:linear-gradient(118deg,#06162d 0%,#0a2849 52%,#063b54 100%)!important;color:#fff!important}
      .ts-enrolment-section::before{content:'';position:absolute;inset:-45% auto auto -8%;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(0,212,255,.22),transparent 68%);pointer-events:none}
      .ts-enrolment-section::after{content:'';position:absolute;right:-9%;bottom:-80%;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,.2),transparent 67%);pointer-events:none}
      .ts-enrolment-section>div{position:relative;z-index:1}
      .ts-enrolment-panel{background:rgba(4,17,36,.72)!important;border-color:rgba(106,219,255,.3)!important;box-shadow:0 24px 70px rgba(0,0,0,.24);backdrop-filter:blur(18px)}
      .ts-enrolment-choice{transition:transform .2s ease,border-color .2s ease,background .2s ease}
      .ts-enrolment-choice:hover{transform:translateY(-3px);border-color:rgba(56,189,248,.55)!important;background:rgba(255,255,255,.09)!important}
      .ts-enrolment-bundle{background:linear-gradient(110deg,rgba(0,184,217,.18),rgba(10,25,49,.82))!important;border-color:rgba(212,175,55,.42)!important}
      .ts-enrolment-choice:not(.ts-enrolment-bundle) a{color:#06162d!important;white-space:nowrap}
      .ts-trust-strip{background:#00c7e8!important;border-color:rgba(6,22,45,.14)!important;color:#06162d!important}
      .ts-trust-strip *{color:#06162d!important;opacity:1!important}
      .ts-social-strip{display:flex!important;align-items:center;gap:.55rem!important}
      .ts-social-strip a{display:grid;place-items:center;width:30px;height:30px;border-radius:999px;color:#fff!important;box-shadow:0 4px 12px rgba(6,22,45,.16);transition:transform .18s ease,box-shadow .18s ease}
      .ts-social-strip a:hover{transform:translateY(-2px) scale(1.05);box-shadow:0 7px 16px rgba(6,22,45,.24)}
      .ts-social-strip svg{width:15px;height:15px;color:#fff!important;fill:#fff!important}
      .ts-social-linkedin{background:#0a66c2}.ts-social-x{background:#050505}.ts-social-facebook{background:#1877f2}.ts-social-youtube{background:#ff0000}

      /* Brand Customizations: Color Theme, Deep Black Nav, Dropdowns */
      .ts-cyan-text { color: #00b8d9 !important; }
      header nav a, header nav button, header nav span.ts-menu-trigger, .ts-nav-item, .ts-menu-trigger {
        color: #000000 !important;
        font-weight: 800 !important;
        letter-spacing: -0.01em !important;
        text-decoration: none !important;
        font-size: 14px !important;
        display: inline-flex !important;
        align-items: center !important;
        transition: color 0.18s ease !important;
        background: transparent !important;
        border: none !important;
        cursor: pointer !important;
        padding: 0 !important;
        font-family: inherit !important;
        line-height: inherit !important;
        user-select: none !important;
      }
      header nav a:hover, header nav button:hover, header nav span.ts-menu-trigger:hover,
      .ts-menu-trigger:hover, .ts-dropdown-wrapper:hover .ts-menu-trigger {
        color: #00b8d9 !important;
      }
      
      /* Dropdown Menu Container */
      .ts-dropdown-wrapper {
        position: relative !important;
        display: inline-flex !important;
        align-items: center !important;
        padding: 8px 0 !important;
      }
      .ts-dropdown-menu {
        position: absolute !important;
        top: 100% !important;
        left: 50% !important;
        transform: translateX(-50%) translateY(10px) !important;
        background: #ffffff !important;
        border: 1px solid #dce5ec !important;
        border-radius: 18px !important;
        box-shadow: 0 20px 60px rgba(10, 25, 49, 0.18), 0 2px 10px rgba(0,0,0,0.06) !important;
        padding: 10px !important;
        min-width: 290px !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.22s !important;
        z-index: 99999 !important;
      }
      /* Invisible hover bridge spanning the gap between trigger and submenu */
      .ts-dropdown-menu::before {
        content: '' !important;
        position: absolute !important;
        top: -16px !important;
        left: 0 !important;
        right: 0 !important;
        height: 16px !important;
        background: transparent !important;
      }
      .ts-dropdown-wrapper:hover .ts-dropdown-menu,
      .ts-dropdown-wrapper:focus-within .ts-dropdown-menu,
      .ts-dropdown-menu.ts-open {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        transform: translateX(-50%) translateY(4px) !important;
      }
      .ts-dropdown-link {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        padding: 8px 12px !important;
        border-radius: 10px !important;
        color: #000000 !important;
        font-weight: 800 !important;
        font-size: 13px !important;
        text-decoration: none !important;
        transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease !important;
        position: relative !important;
      }
      .ts-dropdown-link:hover {
        background: #f0f9fc !important;
        color: #00b8d9 !important;
        transform: translateX(3px) !important;
      }
      
      /* STRICTLY REMOVE ALL SUBMENU PRE-ICONS AND PSEUDO ELEMENTS */
      .ts-dropdown-link::before,
      .ts-dropdown-link::after,
      .ts-dropdown-link *::before,
      .ts-dropdown-link *::after {
        content: none !important;
        display: none !important;
      }
      
      /* Authentic shield badge icon for course tracks */
      .ts-dropdown-badge-icon {
        display: inline-grid !important;
        place-items: center !important;
        width: 26px !important;
        height: 30px !important;
        clip-path: polygon(50% 0, 93% 15%, 93% 67%, 50% 100%, 7% 67%, 7% 15%) !important;
        background: linear-gradient(145deg, var(--badge-color, #00b8d9), #07182e) !important;
        color: #ffffff !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        flex-shrink: 0 !important;
        filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.22)) !important;
      }
      .ts-dropdown-item-title {
        color: #000000 !important;
        font-weight: 800 !important;
        font-size: 13px !important;
      }
      .ts-dropdown-link:hover .ts-dropdown-item-title {
        color: #00b8d9 !important;
      }

      /* Resources Submenu Link Styling (Clean Text, No Icons) */
      .ts-resource-link {
        padding: 9px 14px !important;
        font-weight: 800 !important;
        color: #0a1931 !important;
      }
      .ts-resource-link:hover {
        background: #f0f9fc !important;
        color: #00b8d9 !important;
      }

      .ts-dropdown-callout {
        margin-top: 8px !important;
        padding-top: 8px !important;
        border-top: 1px solid #edf2f7 !important;
      }
      .ts-dropdown-callout a {
        display: block !important;
        padding: 9px 12px !important;
        border-radius: 10px !important;
        background: #0a1931 !important;
        color: #ffffff !important;
        font-size: 12px !important;
        font-weight: 900 !important;
        text-align: center !important;
        text-decoration: none !important;
        box-shadow: 0 4px 12px rgba(10,25,49,0.18) !important;
        transition: background 0.18s ease !important;
      }
      .ts-dropdown-callout a:hover {
        background: #00b8d9 !important;
        color: #0a1931 !important;
      }
      .ts-social-instagram {
        background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%) !important;
      }
      .ts-footer-hq-box {
        margin-top: 1.2rem !important;
        padding-top: 1rem !important;
        border-top: 1px solid rgba(255,255,255,0.12) !important;
      }
      .ts-footer-hq-box .ts-hq-head {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        color: #d4af37 !important;
        font-size: 11px !important;
        font-weight: 900 !important;
        letter-spacing: 0.1em !important;
        text-transform: uppercase !important;
        margin-bottom: 5px !important;
      }
      .ts-footer-hq-box address {
        font-style: normal !important;
        color: rgba(255,255,255,0.75) !important;
        font-size: 12px !important;
        line-height: 1.5 !important;
      }

      /* Mobile Drawer & Mobile Sync Styles */
      header > div.absolute.top-\[72px\] {
        display: none !important;
      }
      .ts-mobile-backdrop {
        position: fixed !important;
        inset: 0 !important;
        background: rgba(10, 25, 49, 0.65) !important;
        backdrop-filter: blur(8px) !important;
        z-index: 99998 !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transition: opacity 0.25s ease, visibility 0.25s !important;
      }
      .ts-mobile-backdrop.ts-open {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }
      .ts-mobile-drawer {
        position: fixed !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: min(380px, 86vw) !important;
        background: #ffffff !important;
        box-shadow: -8px 0 32px rgba(10, 25, 49, 0.25) !important;
        z-index: 99999 !important;
        display: flex !important;
        flex-direction: column !important;
        transform: translateX(100%) !important;
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
      }
      .ts-mobile-drawer.ts-open {
        transform: translateX(0) !important;
      }
      .ts-mobile-drawer-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 16px 20px !important;
        border-bottom: 1px solid #eef2f6 !important;
        background: #ffffff !important;
        position: sticky !important;
        top: 0 !important;
        z-index: 2 !important;
      }
      .ts-mobile-close {
        width: 36px !important;
        height: 36px !important;
        border-radius: 50% !important;
        border: 1px solid #dce4ed !important;
        background: #f7fafc !important;
        color: #0a1931 !important;
        font-size: 18px !important;
        font-weight: 900 !important;
        display: grid !important;
        place-items: center !important;
        cursor: pointer !important;
      }
      .ts-mobile-menu-body {
        padding: 16px 18px 30px !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 6px !important;
        flex: 1 !important;
      }
      .ts-mobile-nav-link {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 12px 14px !important;
        border-radius: 12px !important;
        color: #000000 !important;
        font-weight: 800 !important;
        font-size: 15px !important;
        text-decoration: none !important;
        transition: background 0.15s ease, color 0.15s ease !important;
      }
      .ts-mobile-nav-link:hover, .ts-mobile-nav-link:active {
        background: #f0f9fc !important;
        color: #00b8d9 !important;
      }
      .ts-mobile-accordion-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 12px 14px !important;
        border-radius: 12px !important;
        color: #000000 !important;
        font-weight: 800 !important;
        font-size: 15px !important;
        cursor: pointer !important;
        border: none !important;
        background: transparent !important;
        width: 100% !important;
        text-align: left !important;
      }
      .ts-mobile-accordion-chevron {
        transition: transform 0.2s ease !important;
        font-size: 12px !important;
        color: #00b8d9 !important;
        font-weight: 900 !important;
      }
      .ts-mobile-accordion-header.ts-expanded .ts-mobile-accordion-chevron {
        transform: rotate(180deg) !important;
      }
      .ts-mobile-sublist {
        display: none !important;
        flex-direction: column !important;
        gap: 3px !important;
        padding: 4px 0 8px 12px !important;
        border-left: 2px solid #e0f2fe !important;
        margin-left: 14px !important;
      }
      .ts-mobile-sublist.ts-open {
        display: flex !important;
      }
      .ts-mobile-subitem {
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        padding: 9px 10px !important;
        border-radius: 8px !important;
        color: #1a202c !important;
        font-weight: 700 !important;
        font-size: 13px !important;
        text-decoration: none !important;
        position: relative !important;
      }
      .ts-mobile-subitem::before,
      .ts-mobile-subitem::after,
      .ts-mobile-subitem *::before,
      .ts-mobile-subitem *::after {
        content: none !important;
        display: none !important;
      }
      .ts-mobile-subitem:hover {
        background: #f0f9fc !important;
        color: #00b8d9 !important;
      }
      .ts-mobile-badge {
        display: inline-grid !important;
        place-items: center !important;
        width: 22px !important;
        height: 25px !important;
        clip-path: polygon(50% 0, 93% 15%, 93% 67%, 50% 100%, 7% 67%, 7% 15%) !important;
        background: linear-gradient(145deg, var(--badge-color, #00b8d9), #07182e) !important;
        color: #ffffff !important;
        font-size: 11px !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        flex-shrink: 0 !important;
      }
      .ts-mobile-drawer-footer {
        margin-top: auto !important;
        padding: 16px 18px 24px !important;
        border-top: 1px solid #eef2f6 !important;
        background: #f8fafc !important;
      }
      .ts-mobile-cta-btn {
        display: block !important;
        width: 100% !important;
        padding: 12px !important;
        border-radius: 12px !important;
        font-weight: 900 !important;
        font-size: 13px !important;
        text-align: center !important;
        text-decoration: none !important;
        margin-bottom: 8px !important;
      }
      .ts-mobile-cta-primary {
        background: #00b8d9 !important;
        color: #06162d !important;
        box-shadow: 0 4px 14px rgba(0, 184, 217, 0.28) !important;
      }
      .ts-mobile-cta-secondary {
        background: #0a1931 !important;
        color: #ffffff !important;
      }
      .ts-mobile-toggle {
        display: none !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        border: 1px solid #dce4ed !important;
        background: #ffffff !important;
        place-items: center !important;
        cursor: pointer !important;
        margin-left: auto !important;
      }
      .ts-hamburger-icon {
        display: flex !important;
        flex-direction: column !important;
        gap: 4px !important;
        width: 18px !important;
      }
      .ts-hamburger-icon span {
        display: block !important;
        width: 100% !important;
        height: 2px !important;
        background: #000000 !important;
        border-radius: 2px !important;
      }
      @media (max-width: 768px) {
        .ts-mobile-toggle {
          display: grid !important;
        }
      }

      .ts-builder-profile{align-items:center!important;text-align:center!important;justify-content:center!important}
      .ts-builder-profile-head{flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important}
      .ts-builder-profile-name{display:flex!important;align-items:center!important;justify-content:center!important;gap:.5rem!important}
      .ts-builder-verified{position:static!important;display:inline-grid!important;place-items:center!important;width:22px!important;height:22px!important;flex:0 0 22px!important;border:2px solid #fff!important;border-radius:999px!important;background:#16a34a!important;color:#fff!important;font-size:12px!important;box-shadow:0 3px 10px rgba(22,163,74,.28)!important}
      .ts-builder-bio{max-width:650px!important;margin-left:auto!important;margin-right:auto!important;flex:0 1 auto!important}
      .ts-builder-socials{display:flex!important;align-items:center!important;justify-content:center!important;gap:.85rem!important;margin-top:1.75rem!important;min-height:52px!important}
      .ts-builder-socials a{display:grid!important;place-items:center!important;width:48px!important;height:48px!important;flex:0 0 48px!important;border-radius:999px!important;color:#fff!important;box-shadow:0 8px 20px rgba(7,24,46,.16)!important;transition:transform .18s ease,box-shadow .18s ease!important}
      .ts-builder-socials a:hover{transform:translateY(-3px) scale(1.05)!important;box-shadow:0 12px 24px rgba(7,24,46,.24)!important}
      .ts-builder-socials svg{display:block!important;width:24px!important;height:24px!important;fill:#fff!important;color:#fff!important}
      .ts-builder-socials a:nth-child(1){background:#0a66c2!important}.ts-builder-socials a:nth-child(2){background:#050505!important}.ts-builder-socials a:nth-child(3){background:#1877f2!important}.ts-builder-socials a:nth-child(4){background:#ff0000!important}.ts-builder-socials a:nth-child(5){background:linear-gradient(135deg,#833ab4,#fd1d1d 55%,#fcb045)!important}.ts-builder-socials a:nth-child(6){background:#050505!important}
      #whytruststack{scroll-margin-top:96px!important}
      #whytruststack:focus{outline:none!important}
      .ts-career-badge-strip{overflow:hidden!important;padding:3.25rem 0!important;border-top:1px solid rgba(7,24,46,.07)!important;border-bottom:1px solid rgba(7,24,46,.07)!important;background:linear-gradient(180deg,#fff,#f7fbfd)!important}
      .ts-career-badge-heading{width:min(1280px,calc(100% - 3rem));margin:0 auto 1.8rem;color:#07182e;text-align:center}
      .ts-career-badge-heading span{display:block;color:#00a6cf;font-size:.72rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase}
      .ts-career-badge-heading h2{margin:.5rem 0 0;font-size:clamp(1.65rem,3vw,2.35rem);line-height:1;font-weight:900;letter-spacing:-.025em}
      .ts-career-badge-viewport{position:relative;overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
      .ts-career-badge-marquee{display:flex;width:max-content;will-change:transform;animation:ts-badge-scroll 30s linear infinite}
      .ts-career-badge-viewport:hover .ts-career-badge-marquee{animation-play-state:paused}
      .ts-career-badge-group{display:flex;align-items:stretch;gap:1rem;padding-right:1rem}
      .ts-career-badge{--badge:#00b8d9;display:flex;flex:0 0 220px;align-items:center;gap:.9rem;min-height:96px;padding:1rem 1.15rem;border:1px solid color-mix(in srgb,var(--badge) 30%,#dce7ee);border-radius:18px;background:#fff;color:#07182e!important;text-decoration:none!important;box-shadow:0 12px 28px rgba(7,24,46,.07);transition:transform .2s ease,box-shadow .2s ease}
      .ts-career-badge:hover{transform:translateY(-4px);box-shadow:0 18px 34px color-mix(in srgb,var(--badge) 15%,rgba(7,24,46,.08))}
      .ts-career-badge-mark{display:grid;place-items:center;flex:0 0 64px;width:64px;height:72px;clip-path:polygon(50% 0,91% 15%,91% 66%,50% 100%,9% 66%,9% 15%);background:linear-gradient(150deg,var(--badge),#07182e 78%);color:#fff!important;font:900 1.4rem Arial,sans-serif;filter:drop-shadow(0 7px 8px color-mix(in srgb,var(--badge) 25%,transparent))}
      .ts-career-badge-copy{display:flex;min-width:0;flex-direction:column;gap:.28rem}
      .ts-career-badge-copy strong{color:#07182e!important;font-size:.98rem;line-height:1.05;font-weight:900}
      .ts-career-badge-copy small{color:var(--badge)!important;font-size:.63rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
      @keyframes ts-badge-scroll{to{transform:translateX(-50%)}}
      header nav a.ts-menu-plus::after, header nav button.ts-menu-plus::after, header nav span.ts-menu-plus::after, .ts-menu-trigger.ts-menu-plus::after{content:'+';display:inline-block;margin-left:.38em;color:#00a8d4;font-weight:900}
      .ts-nav-new-badge{color:#ef4444!important;font-size:9.5px!important;font-weight:900!important;vertical-align:super!important;margin-left:2px!important;letter-spacing:.04em!important;line-height:1!important;text-transform:uppercase!important;display:inline-block!important}
      img[data-site-destination="/"]{cursor:pointer}
      @media (min-width:1024px){
        .ts-home-header-inner{width:fit-content!important;max-width:calc(100% - 48px)!important;margin-left:auto!important;margin-right:auto!important}
        .ts-home-header-inner>nav{margin-left:2.5rem!important;margin-right:0!important}
        .ts-home-header-inner>nav+div{width:0!important;margin-left:0!important;overflow:hidden!important}
        .ts-footer-five{grid-template-columns:1.15fr .65fr .78fr 1fr 1.15fr!important;gap:2rem!important}
      }
      @media (max-width:900px){.ts-kb-row{grid-template-columns:1fr 1fr}.ts-kb-card:last-child{grid-column:1/-1;max-width:calc(50% - .75rem);width:100%;justify-self:center}}
      @media (max-width:640px){.ts-kb-section{padding:4rem 1.1rem!important}.ts-kb-heading{margin-bottom:2rem}.ts-kb-row{grid-template-columns:1fr}.ts-kb-card:last-child{grid-column:auto;max-width:none}.ts-kb-image{height:210px}.ts-kb-footer{flex-wrap:wrap}.ts-trust-strip-copy{display:none!important}.ts-trust-strip>div{justify-content:center!important}.ts-career-badge-strip{padding:2.7rem 0!important}.ts-career-badge-heading{width:calc(100% - 2rem);margin-bottom:1.4rem}.ts-career-badge{flex-basis:190px;min-height:86px;padding:.8rem}.ts-career-badge-mark{flex-basis:54px;width:54px;height:62px}}
      @media (prefers-reduced-motion:reduce){.ts-career-badge-marquee{width:auto;animation:none}.ts-career-badge-group{flex-wrap:wrap;justify-content:center;padding:0 1rem}.ts-career-badge-group[aria-hidden="true"]{display:none}}
    `;
    document.head.appendChild(style);
  }

  function addHomeFavicon() {
    if (!path.includes('home')) return;
    [
      ['icon', '/Truststack_Logo_PNG.png', 'image/png'],
      ['shortcut icon', '/Truststack_Logo_PNG.png', 'image/png'],
      ['apple-touch-icon', '/Truststack_Logo_PNG.png', 'image/png']
    ].forEach(([rel, href, type]) => {
      let link = document.head.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
      link.type = type;
    });
    let theme = document.head.querySelector('meta[name="theme-color"]');
    if (!theme) {
      theme = document.createElement('meta');
      theme.name = 'theme-color';
      document.head.appendChild(theme);
    }
    theme.content = '#0A1931';
  }

  function repurposeEnrollmentSection() {
    if (!path.includes('home')) return;
    const heading = Array.from(document.querySelectorAll('h2')).find((node) => /pay in naira\.\s*build in public\./i.test(node.textContent || ''));
    const section = heading?.closest('section');
    const layout = heading?.parentElement?.parentElement;
    if (!section || !layout || section.dataset.tsRepurposed === 'true') return;
    section.dataset.tsRepurposed = 'true';
    section.classList.add('ts-enrolment-section');
    const copy = layout.children[0];
    const panel = layout.children[1];
    if (!copy || !panel) return;
    copy.innerHTML = `<div class="text-[11px] font-bold tracking-[0.2em] text-[#71e4ff]">YOUR CAREER, YOUR PACE</div><h2 class="mt-3 text-[42px] lg:text-[52px] font-[800] leading-[0.96] tracking-tight">Choose the Path.<br><span style="color:#71e4ff">Build the Proof.</span></h2><p class="mt-4 text-[15px] leading-6 text-white/75 max-w-[500px]">Start with one role-ready track or unlock the complete eight-track pathway. Every option combines practical labs, portfolio evidence and a verifiable TrustStack certificate.</p><div class="mt-6 flex flex-wrap gap-3"><a href="/courses" data-site-destination="/courses" class="h-11 px-6 rounded-full bg-[#00b8d9] text-[#06162d] text-[13px] font-bold flex items-center">Explore Career Tracks</a><a href="/career-badges" data-site-destination="/career-badges" class="h-11 px-6 rounded-full border border-white/35 text-white text-[13px] font-bold flex items-center">View Career Badges</a></div>`;
    panel.className = 'ts-enrolment-panel rounded-[24px] border p-5 md:p-6';
    panel.innerHTML = `<div class="flex flex-wrap gap-2 text-[10px] font-bold"><span class="px-2 py-1 rounded-full bg-white/10">FLEXIBLE LEARNING</span><span class="px-2 py-1 rounded-full bg-[#00D4FF]/20 text-[#71e4ff]">VERIFIABLE SKILLS</span><span class="px-2 py-1 rounded-full bg-[#D4AF37]/20 text-[#f6d761]">SAVE 25% ON BUNDLE</span></div><div class="ts-enrolment-choice mt-6 bg-white/[.06] rounded-[16px] p-5 border border-white/10"><div class="flex justify-between gap-4 items-start"><div><div class="font-bold text-[16px]">Build One Specialist Skill</div><div class="mt-2 text-[12px] leading-5 text-white/65">Choose any career track and focus on the role you want next.</div></div><div class="shrink-0 text-[10px] px-2 py-1 rounded-full bg-[#00b8d9] text-[#06162d] font-bold">FOCUSED PATH</div></div><div class="mt-5 flex items-center justify-between"><div class="font-extrabold text-[21px]">₦25k <span class="font-normal text-white/50 text-[11px]">per track</span></div><a href="/courses" data-site-destination="/courses" class="px-4 py-2 rounded-full bg-white text-[#06162d] text-[12px] font-bold">Choose a Track</a></div></div><div class="ts-enrolment-choice ts-enrolment-bundle mt-3 rounded-[16px] p-5 border"><div class="flex items-center justify-between gap-4"><div><div class="text-[15px] font-bold text-white">Build a Complete Security Portfolio</div><div class="mt-1 text-[11px] text-white/65">All 8 role-based tracks · ₦200k value · <span class="text-[#f6d761]">Save ₦50k</span></div></div><div class="text-right shrink-0"><div class="font-extrabold text-[20px] text-white">₦150k</div><a href="/pay?track=bundle" data-site-destination="/pay?track=bundle" class="text-[11px] font-bold text-[#71e4ff]">Choose bundle →</a></div></div></div><div class="mt-4 text-[11px] text-white/55 text-center">Practical labs · Portfolio evidence · Verifiable certificates · Naira payment</div>`;
  }

  function applyStaticSeo() {
    if (!path.endsWith('.html')) return;
    const seo = path.includes('home')
      ? ['TrustStack Academy | Learn Cybersecurity by Doing','Build practical cybersecurity skills through eight role-based tracks, guided labs, Naira pricing and verifiable TrustStack learner credentials.','/',false]
      : path.includes('courses-tracks')
        ? ['Cybersecurity Career Tracks | TrustStack Academy','Compare eight practical cybersecurity career tracks covering SOC analysis, digital forensics, cloud security, GRC and offensive security.','/courses',false]
      : path.includes('lms') || path.includes('student-lms')
        ? ['Cybersecurity Learning Platform | TrustStack Academy','Explore practical cybersecurity lessons, labs and career-focused learning pathways built for African learners and organisations.','/lms',false]
      : path.includes('pay-checkout')
        ? ['Secure Course Enrolment | TrustStack Academy','Complete your TrustStack Academy course enrolment securely in Naira.','/pay',true]
      : path.includes('verify-certificate')
        ? ['Verify a Certificate | TrustStack Academy','Verify a TrustStack Academy certificate against the official credential registry.','/verify',false]
      : path.includes('knowledge-base')
        ? ['Cybersecurity Knowledge Base | TrustStack Academy','Read practical SOC playbooks, Nigerian data protection guidance and Africa-focused cybersecurity analysis.','/knowledge-base',false]
      : null;
    if (!seo) return;
    const [title, description, canonicalPath, noindex] = seo;
    const origin = 'https://truststack.academy';
    const upsertMeta = (selector, attribute, value, content) => {
      let node = document.head.querySelector(selector);
      if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, value); document.head.appendChild(node); }
      node.content = content;
    };
    document.title = title;
    upsertMeta('meta[name="description"]','name','description',description);
    upsertMeta('meta[name="robots"]','name','robots',noindex?'noindex,nofollow':'index,follow,max-image-preview:large');
    upsertMeta('meta[property="og:title"]','property','og:title',title);
    upsertMeta('meta[property="og:description"]','property','og:description',description);
    upsertMeta('meta[property="og:type"]','property','og:type','website');
    const socialImage = path.includes('cdpo') ? `${origin}/cdpo-og.png` : `${origin}/feature-image.jpg`;
    upsertMeta('meta[property="og:image"]','property','og:image',socialImage);
    upsertMeta('meta[property="og:image:alt"]','property','og:image:alt',path.includes('home')?'TrustStack Academy practical cybersecurity learning lab':'TrustStack Academy course preview');
    upsertMeta('meta[name="twitter:card"]','name','twitter:card','summary_large_image');
    upsertMeta('meta[name="twitter:title"]','name','twitter:title',title);
    upsertMeta('meta[name="twitter:description"]','name','twitter:description',description);
    upsertMeta('meta[name="twitter:image"]','name','twitter:image',socialImage);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = `${origin}${canonicalPath}`;
  }

  function decorateScholarshipNav() {
    document.querySelectorAll('header nav a, .ts-mobile-menu-body a, .nav-links a').forEach((link) => {
      const href = (link.getAttribute('href') || link.dataset.siteDestination || '').toLowerCase();
      const text = clean(link.textContent);
      if (href === '/scholarship' || href === '#scholarship' || text === 'scholarship' || text.startsWith('scholarship')) {
        if (!link.querySelector('.ts-nav-new-badge')) {
          const sup = document.createElement('sup');
          sup.className = 'ts-nav-new-badge';
          sup.textContent = 'NEW';
          const span = link.querySelector('span');
          if (span && !span.querySelector('.ts-nav-new-badge')) {
            span.appendChild(sup);
          } else if (!link.querySelector('.ts-nav-new-badge')) {
            link.appendChild(sup);
          }
        }
      }
    });
  }

  function decorateHeaderMenus() {
    decorateScholarshipNav();
    document.querySelectorAll('header nav a').forEach((link) => {
      if (clean(link.textContent) !== 'home') link.classList.add('ts-menu-plus');
    });
  }

  function setupHeaderDropdowns() {
    const nav = document.querySelector('header nav');
    if (!nav || nav.dataset.tsDropdownsReady === 'true') return;
    nav.dataset.tsDropdownsReady = 'true';

    // 1. Courses Dropdown
    const coursesLink = Array.from(nav.querySelectorAll(':scope > a')).find(a => clean(a.textContent).startsWith('courses') || clean(a.textContent).startsWith('tracks'));
    if (coursesLink && !coursesLink.parentElement.classList.contains('ts-dropdown-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'ts-dropdown-wrapper';
      
      const trigger = coursesLink.cloneNode(true);
      trigger.classList.add('ts-menu-plus');
      
      const menu = document.createElement('div');
      menu.className = 'ts-dropdown-menu';

      // Each submenu item in Courses has ONLY the course badge icon (NO pre-icon) and links to its dedicated page
      menu.innerHTML = courseCatalogItems.map(t => 
        '<a class="ts-dropdown-link" href="/courses/' + t.slug + '" data-site-destination="/courses/' + t.slug + '" data-no-track-badge="true">' +
          '<span class="ts-dropdown-badge-icon" style="--badge-color:' + t.color + '">' + t.icon + '</span>' +
          '<span class="ts-dropdown-item-title">' + t.name + '</span>' +
        '</a>'
      ).join('') + '<div class="ts-dropdown-callout"><a href="/courses" data-site-destination="/courses">Explore All 8 Tracks · Save ₦50k →</a></div>';

      coursesLink.replaceWith(wrapper);
      wrapper.appendChild(trigger);
      wrapper.appendChild(menu);
    }

    // 2. Resources Dropdown (Strictly NOT hyperlinked, static Menu with linked submenu)
    const existingResources = Array.from(nav.querySelectorAll('a, button, span, .ts-menu-trigger')).find(el => {
      const txt = clean(el.textContent);
      return txt === 'resources' || txt.startsWith('resources');
    });

    const resWrapper = document.createElement('div');
    resWrapper.className = 'ts-dropdown-wrapper ts-resources-dropdown';
    
    // Static Menu trigger: NOT hyperlinked, NO href, purely static menu header
    const resTrigger = document.createElement('span');
    resTrigger.className = 'ts-menu-trigger ts-menu-plus';
    resTrigger.textContent = 'Resources';
    resTrigger.setAttribute('role', 'button');
    resTrigger.setAttribute('tabindex', '0');
    resTrigger.setAttribute('aria-haspopup', 'true');
    resTrigger.setAttribute('aria-expanded', 'false');
    resTrigger.dataset.noTrackBadge = 'true';

    // Prevent any page jumps or navigation clicks
    resTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      resMenu.classList.toggle('ts-open');
    });

    const resMenu = document.createElement('div');
    resMenu.className = 'ts-dropdown-menu';

    // Submenu links: fully linked, clean text only (NO icons)
    resMenu.innerHTML = resourceMenuItems.map(item =>
      '<a class="ts-dropdown-link ts-resource-link" href="' + item.href + '" data-site-destination="' + item.href + '" data-no-track-badge="true">' +
        '<span class="ts-dropdown-item-title">' + item.label + '</span>' +
      '</a>'
    ).join('');

    resWrapper.appendChild(resTrigger);
    resWrapper.appendChild(resMenu);

    if (existingResources) {
      const container = existingResources.closest('.ts-dropdown-wrapper') || existingResources;
      container.replaceWith(resWrapper);
    } else {
      const contactLink = Array.from(nav.querySelectorAll('a, button, span')).find(a => clean(a.textContent) === 'contact');
      if (contactLink && contactLink.parentElement) {
        contactLink.parentElement.insertBefore(resWrapper, contactLink);
      } else {
        nav.appendChild(resWrapper);
      }
    }

    // 3. Contact Dropdown (with Lodge a Complaint)
    const contactEl = Array.from(nav.querySelectorAll(':scope > a, :scope > div > a, :scope > div > button, :scope > div > span')).find(a => clean(a.textContent) === 'contact' || clean(a.textContent).startsWith('contact'));
    if (contactEl && !contactEl.closest('.ts-contact-dropdown')) {
      const contactWrapper = document.createElement('div');
      contactWrapper.className = 'ts-dropdown-wrapper ts-contact-dropdown';
      
      const contactTrigger = contactEl.cloneNode(true);
      contactTrigger.classList.add('ts-menu-plus');
      
      const contactMenu = document.createElement('div');
      contactMenu.className = 'ts-dropdown-menu';
      contactMenu.style.minWidth = '230px';
      
      contactMenu.innerHTML = `
        <a class="ts-dropdown-link ts-resource-link" href="/contact" data-site-destination="/contact" data-no-track-badge="true">
          <span class="ts-dropdown-item-title">Contact & Inquiries</span>
        </a>
        <a class="ts-dropdown-link ts-resource-link" href="/complaint" data-site-destination="/complaint" data-no-track-badge="true" style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <span class="ts-dropdown-item-title" style="color:#00b8d9 !important;font-weight:900;">Lodge a Complaint</span>
          <span style="font-size:10px;font-weight:900;background:rgba(0,184,217,0.12);color:#008da6;padding:2px 8px;border-radius:999px;">24h SLA</span>
        </a>
      `;
      
      const targetParent = contactEl.parentElement === nav ? contactEl : contactEl.closest('.ts-dropdown-wrapper') || contactEl;
      targetParent.replaceWith(contactWrapper);
      contactWrapper.appendChild(contactTrigger);
      contactWrapper.appendChild(contactMenu);
    }
  }

  function setupMobileNavigation() {
    let backdrop = document.getElementById('ts-mobile-backdrop');
    let drawer = document.getElementById('ts-mobile-drawer');

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'ts-mobile-backdrop';
      backdrop.className = 'ts-mobile-backdrop';
      document.body.appendChild(backdrop);
    }

    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'ts-mobile-drawer';
      drawer.className = 'ts-mobile-drawer';
      drawer.innerHTML = `
        <div class="ts-mobile-drawer-header">
          <a href="/" class="brand" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
            <img src="/truststack-home-logo.png" alt="TrustStack Logo" style="width:36px;height:36px;object-fit:contain;">
            <strong style="font-size:16px;font-weight:900;"><span style="color:#0A1931">TrustStack </span><span style="color:#00b8d9">Academy</span></strong>
          </a>
          <button type="button" class="ts-mobile-close" aria-label="Close navigation menu">✕</button>
        </div>
        <div class="ts-mobile-menu-body">
          <a class="ts-mobile-nav-link" href="/"><span>Home</span></a>
          
          <!-- Courses Accordion: Has ONLY the course badge icon (NO pre-icon) -->
          <div class="ts-mobile-accordion-wrapper">
            <button type="button" class="ts-mobile-accordion-header" id="ts-m-courses-btn">
              <span>Courses & Tracks</span>
              <span class="ts-mobile-accordion-chevron">▼</span>
            </button>
            <div class="ts-mobile-sublist" id="ts-m-courses-list">
              ${courseCatalogItems.map(c => `
                <a class="ts-mobile-subitem" href="/courses/${c.slug}" data-site-destination="/courses/${c.slug}" data-no-track-badge="true">
                  <span class="ts-mobile-badge" style="--badge-color:${c.color}">${c.icon}</span>
                  <span>${c.name}</span>
                </a>
              `).join('')}
              <a class="ts-mobile-subitem" href="/courses" data-site-destination="/courses" style="color:#00b8d9;font-weight:900;padding-left:14px;">
                <span>⚡ Explore All 8 Tracks (Save ₦50k) →</span>
              </a>
            </div>
          </div>

          <!-- Resources Accordion: Strictly NO icons -->
          <div class="ts-mobile-accordion-wrapper">
            <button type="button" class="ts-mobile-accordion-header" id="ts-m-resources-btn">
              <span>Resources</span>
              <span class="ts-mobile-accordion-chevron">▼</span>
            </button>
            <div class="ts-mobile-sublist" id="ts-m-resources-list">
              ${resourceMenuItems.map(item => `
                <a class="ts-mobile-subitem" href="${item.href}" data-site-destination="${item.href}" data-no-track-badge="true" style="padding-left:14px;">
                  <span>${item.label}</span>
                </a>
              `).join('')}
            </div>
          </div>

          <a class="ts-mobile-nav-link" href="/scholarship"><span>Scholarship<sup class="ts-nav-new-badge">NEW</sup></span></a>
          <a class="ts-mobile-nav-link" href="/#whytruststack"><span>Why TrustStack</span></a>
          <a class="ts-mobile-nav-link" href="/about"><span>About</span></a>
          <a class="ts-mobile-nav-link" href="/contact"><span>Contact Support</span></a>
          <a class="ts-mobile-nav-link" href="/complaint" style="color:#00b8d9 !important;font-weight:900;"><span>⚖ Lodge a Complaint (24h SLA)</span></a>
        </div>
        
        <div class="ts-mobile-drawer-footer">
          <a class="ts-mobile-cta-btn ts-mobile-cta-primary" href="/pay?track=bundle">Enroll in 8-Track Bundle (₦150k)</a>
          <a class="ts-mobile-cta-btn ts-mobile-cta-secondary" href="/login">Learner Login</a>
          <div style="margin-top:12px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:11px;color:#64748b;line-height:1.4;">
            <strong style="display:block;color:#0a1931;margin-bottom:2px;font-size:11px;">CORPORATE HEADQUARTERS</strong>
            25 Destiny Young Avenue, GRE<br>
            Ewet Housing Extension, Uyo 520101, Akwa Ibom State, Nigeria
          </div>
        </div>
      `;
      document.body.appendChild(drawer);

      const closeDrawer = () => {
        drawer.classList.remove('ts-open');
        backdrop.classList.remove('ts-open');
        document.body.style.overflow = '';
      };

      drawer.querySelector('.ts-mobile-close')?.addEventListener('click', closeDrawer);
      backdrop.addEventListener('click', closeDrawer);

      const setupAccordion = (btnId, listId) => {
        const btn = drawer.querySelector('#' + btnId);
        const list = drawer.querySelector('#' + listId);
        if (btn && list) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = list.classList.contains('ts-open');
            list.classList.toggle('ts-open', !isOpen);
            btn.classList.toggle('ts-expanded', !isOpen);
          });
        }
      };
      setupAccordion('ts-m-courses-btn', 'ts-m-courses-list');
      setupAccordion('ts-m-resources-btn', 'ts-m-resources-list');

      drawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => closeDrawer());
      });
    }

    const openDrawer = () => {
      drawer.classList.add('ts-open');
      backdrop.classList.add('ts-open');
      document.body.style.overflow = 'hidden';
    };

    // Attach to all hamburger buttons in header
    document.querySelectorAll('header button, .ts-mobile-toggle').forEach(btn => {
      if (btn.dataset.tsMobileHooked === 'true') return;
      btn.dataset.tsMobileHooked = 'true';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openDrawer();
      });
    });

    // On pages without a mobile menu button, inject one into header
    const header = document.querySelector('header');
    if (header && !header.querySelector('.ts-mobile-toggle') && !header.querySelector('button.md\\:hidden')) {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'ts-mobile-toggle';
      toggle.setAttribute('aria-label', 'Open navigation menu');
      toggle.innerHTML = '<span class="ts-hamburger-icon"><span></span><span></span><span></span></span>';
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openDrawer();
      });
      header.appendChild(toggle);
    }
  }

  function updateMainNavigation() {
    setupHeaderDropdowns();
    setupMobileNavigation();
    decorateScholarshipNav();
    const nav = document.querySelector('header nav');
    if (!nav) return;
    Array.from(nav.querySelectorAll('a')).forEach((link) => {
      const label = clean(link.textContent);
      if (label === 'cap-adit' || label === 'securesme') link.remove();
    });
    const links = Array.from(nav.querySelectorAll('a'));
    if (links.some((link) => clean(link.textContent).startsWith('scholarship'))) {
      decorateScholarshipNav();
      return;
    }
    const contact = links.find((link) => clean(link.textContent) === 'contact');
    const scholarship = document.createElement('a');
    scholarship.href = '/scholarship';
    scholarship.innerHTML = 'Scholarship<sup class="ts-nav-new-badge">NEW</sup>';
    scholarship.dataset.siteDestination = '/scholarship';
    if (contact) nav.insertBefore(scholarship, contact);
    else nav.appendChild(scholarship);
    decorateScholarshipNav();
  }

  function linkOurStory() {
    if (!path.includes('home')) return;
    const control = Array.from(document.querySelectorAll('#about a, #about button'))
      .find((element) => clean(element.textContent) === 'our story');
    if (!control) return;
    if (control.tagName === 'A') {
      control.href = '/about';
      control.dataset.siteDestination = '/about';
      return;
    }
    const link = document.createElement('a');
    link.href = '/about';
    link.dataset.siteDestination = '/about';
    link.className = control.className;
    link.innerHTML = control.innerHTML;
    link.setAttribute('aria-label', 'Read the TrustStack Academy story');
    control.replaceWith(link);
  }

  function colorBrandAcademy() {
    document.querySelectorAll('header strong, header span, .brand strong, .brand-text, a.brand strong').forEach((el) => {
      if (el.children.length === 0 && clean(el.textContent) === 'truststack academy') {
        el.innerHTML = '<span style="color:#0A1931">TrustStack </span><span style="color:#00b8d9">Academy</span>';
      }
    });
    document.querySelectorAll('footer a, footer strong, footer span').forEach((el) => {
      if (el.children.length === 0 && clean(el.textContent) === 'truststack academy') {
        el.innerHTML = '<span style="color:#ffffff">TrustStack </span><span style="color:#00b8d9">Academy</span>';
      }
    });
  }

  
  /* --- GUARANTEE BRAND NAME IN HEADER NAVBAR --- */
  function ensureBrandInHeader() {
    const headers = document.querySelectorAll('header');
    headers.forEach(header => {
      // Find the brand anchor or link to home
      let brandAnchor = header.querySelector('a.brand, a[href*="home"], a:first-child');
      if (!brandAnchor) return;

      brandAnchor.classList.add('brand');
      brandAnchor.style.display = 'inline-flex';
      brandAnchor.style.alignItems = 'center';
      brandAnchor.style.textDecoration = 'none';
      brandAnchor.style.gap = '10px';

      // Check if brand link contains the text "TrustStack"
      const cleanText = clean(brandAnchor.textContent);
      if (!cleanText.includes('truststack')) {
        let brandTitle = brandAnchor.querySelector('.ts-brand-text, .brand-text');
        if (!brandTitle) {
          brandTitle = document.createElement('strong');
          brandTitle.className = 'ts-brand-text';
          brandTitle.style.cssText = "font-size:22px !important;font-weight:900 !important;display:inline-flex !important;align-items:center !important;gap:4px !important;text-decoration:none !important;margin-left:10px !important;white-space:nowrap !important;font-family:'Alegreya Sans', sans-serif !important;line-height:1 !important;";
          brandTitle.innerHTML = '<span style="color:#0A1931 !important;font-weight:900 !important;">TrustStack </span><span style="color:#00b8d9 !important;font-weight:900 !important;margin-left:3px !important;">Academy</span>';
          brandAnchor.appendChild(brandTitle);
        }
      } else {
        // Ensure proper navy/cyan coloring and visibility
        brandAnchor.querySelectorAll('span, strong').forEach(s => {
          s.style.display = 'inline-flex';
          s.style.visibility = 'visible';
          s.style.opacity = '1';
          const txt = clean(s.textContent);
          if (txt === 'truststack') s.style.color = '#0A1931';
          if (txt === 'academy') s.style.color = '#00b8d9';
        });
      }
    });
  }

  // Monitor DOM mutations to enforce brand name if React hydrates or re-renders
  if (typeof MutationObserver !== 'undefined') {
    const brandObserver = new MutationObserver(function() {
      ensureBrandInHeader();
    });
    brandObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  function brandHomeLinks() {
    colorBrandAcademy();
    ensureBrandInHeader();
    document.querySelectorAll('img').forEach((image) => {
      const source = (image.getAttribute('src') || '').toLowerCase();
      const label = (image.getAttribute('alt') || '').toLowerCase();
      const signature = source.startsWith('data:') ? label : source + ' ' + label;
      if (/seal|certificate/.test(label) && !/logo/.test(label)) return;
      if (!/truststack.*logo|logo.*truststack|truststack.*shield|shield gear logo/.test(signature) && label !== 'truststack academy') return;
      image.dataset.siteDestination = '/';
      image.title = 'TrustStack Academy home';
      let brand = image.parentElement;
      for (let depth = 0; brand && depth < 4; depth++, brand = brand.parentElement) {
        const label = clean(brand.textContent);
        if (!label.includes('truststack academy') || label.length > 85) continue;
        if (brand.tagName === 'A') brand.href = '/';
        else if (!brand.closest('a') && !brand.matches('button,[role="button"]')) {
          brand.setAttribute('role', 'link');
          brand.tabIndex = 0;
        }
        brand.dataset.siteDestination = '/';
        brand.title = 'Go to TrustStack Academy homepage';
        brand.style.cursor = 'pointer';
        break;
      }
    });
    document.querySelectorAll('a').forEach((link) => {
      const label = clean(link.textContent);
      if ((label === 'truststack academy' || label === '⚙ truststack academy') && link.textContent.length < 60) link.href = '/';
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
  }

  function redesignKnowledgeBaseRow() {
    if (!path.includes('home')) return;
    const title = Array.from(document.querySelectorAll('h1,h2,h3')).find((heading) => clean(heading.textContent) === 'knowledge base');
    const section = title?.closest('section');
    if (!section || section.dataset.tsKnowledgeRedesign === 'true') return;
    section.dataset.tsKnowledgeRedesign = 'true';
    section.id = 'knowledge-base';
    section.className = 'ts-kb-section';
    section.innerHTML = '';
    const articles = [
      { slug:'bvn-nin-linkage-risks', image:'/knowledge-bvn-nin.svg', category:'Threat Intelligence', accent:'#087fa8', title:'BVN NIN Linkage Risks: How Nigerian Fintechs Leak PII', excerpt:'A practical review of identity-linkage exposure, weak API controls and the safeguards Nigerian fintech teams should prioritise.', meta:'Destiny Young · 6 min read' },
      { slug:'wireshark-cbn-fraud-patterns', image:'/knowledge-wireshark.svg', category:'SOC Playbook', accent:'#d98312', title:'Wireshark for SOC Analysts: Detecting CBN Fraud Patterns', excerpt:'Learn useful Wireshark filters and investigation techniques for identifying suspicious payment and webhook activity.', meta:'TrustStack Team · 8 min read' },
      { slug:'aws-misconfigurations-nigerian-startups', image:'/knowledge-cloud.svg', category:'Cloud Security', accent:'#6941c6', title:'AWS Misconfigurations Costing Nigerian Startups Millions', excerpt:'A remediation guide for exposed storage, excessive permissions and missing MFA in fast-growing cloud environments.', meta:'Destiny Young · 5 min read' }
    ];
    const heading = document.createElement('div');
    heading.className = 'ts-kb-heading';
    heading.innerHTML = '<div class="ts-kb-kicker"><span class="ts-kb-dots">● ● ●</span> Field Notes</div><h2>Latest <span>Knowledge & Insights</span></h2><p>Practical cybersecurity guides, SOC playbooks and Africa-focused threat analysis from the TrustStack team.</p>';
    const row = document.createElement('div');
    row.className = 'ts-kb-row';
    articles.forEach((article) => {
      const card = document.createElement('a');
      card.className = 'ts-kb-card';
      card.href = `/knowledge-base?article=${article.slug}`;
      card.style.setProperty('--ts-kb-accent', article.accent);
      card.setAttribute('aria-label', `Read ${article.title}`);
      card.innerHTML = `<div class="ts-kb-image"><img src="${article.image}" alt="Illustration for ${article.title}" loading="lazy"></div><div class="ts-kb-category">${article.category}</div><div class="ts-kb-body"><div class="ts-kb-meta"><span aria-hidden="true">◷</span> ${article.meta}</div><h3 class="ts-kb-title">${article.title}</h3><p class="ts-kb-excerpt">${article.excerpt}</p><span class="ts-kb-read">Read article <b aria-hidden="true">→</b></span></div>`;
      row.appendChild(card);
    });
    const footer = document.createElement('div');
    footer.className = 'ts-kb-footer';
    footer.innerHTML = '<span class="ts-kb-page" aria-current="page">1</span><a class="ts-kb-all" href="/knowledge-base">View all articles →</a>';
    section.append(heading, row, footer);
  }

  function addFooterResources() {
    if (!path.includes('home')) return;
    const footer = document.querySelector('footer');
    if (!footer || footer.querySelector('.ts-footer-resources')) return;
    const headings = Array.from(footer.querySelectorAll('div')).filter((node) => !node.children.length);
    const quickHeading = headings.find((node) => clean(node.textContent) === 'quick links');
    const courseHeading = headings.find((node) => clean(node.textContent) === 'courses');
    const quickColumn = quickHeading?.parentElement?.parentElement;
    const courseColumn = courseHeading?.parentElement?.parentElement;
    const columns = quickColumn?.parentElement;
    if (!quickColumn || !courseColumn || !columns || courseColumn.parentElement !== columns) return;
    columns.classList.add('ts-footer-five');
    const resourceColumn = document.createElement('div');
    resourceColumn.className = 'ts-footer-resources';
    const heading = document.createElement('div');
    heading.className = 'inline-block relative pb-2';
    heading.innerHTML = '<div class="font-bold text-[12px] tracking-wide">RESOURCES</div><span class="absolute left-0 bottom-0 h-[2px] w-full bg-[#D4AF37]"></span>';
    const links = document.createElement('div');
    links.className = 'space-y-2 mt-4';
    [
      ['Knowledge Base', '/knowledge-base'],
      ['Free CDPO Course', '/cdpo'],
      ['Career Badges', '/career-badges'],
      ['Verify Learner', '/learner'],
      ['Verify Certificate', '/verify'],
      ['Scholarship', '/scholarship'],
      ['Privacy Policy', '/privacy'],
      ['Terms of Use', '/terms']
    ].forEach(([label, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      links.appendChild(link);
    });

    const hqBox = document.createElement('div');
    hqBox.className = 'ts-footer-hq-box';
    hqBox.innerHTML = `
      <div class="ts-hq-head"><span>📍</span> Corporate Headquarters</div>
      <address>
        25 Destiny Young Avenue, GRE<br>
        Ewet Housing Extension, Uyo 520101<br>
        Akwa Ibom State, Nigeria
      </address>
    `;
    resourceColumn.append(heading, links, hqBox);
    columns.insertBefore(resourceColumn, courseColumn);
  }

  function refineBuilderProfile() {
    if (!path.includes('home')) return;
    const photo = document.querySelector('img[alt="Destiny Young"]');
    if (!photo) return;
    let card = photo.parentElement;
    for (let depth = 0; card && depth < 5; depth += 1, card = card.parentElement) {
      if (card.querySelectorAll('a').length >= 5 && clean(card.textContent).includes('founder & chief technology architect')) break;
    }
    if (!card || card.classList.contains('ts-builder-profile')) return;
    const head = photo.parentElement?.parentElement;
    const name = Array.from(card.querySelectorAll('div')).find((node) => !node.children.length && clean(node.textContent) === 'destiny young');
    const tick = photo.parentElement?.querySelector('div:not(:has(*))');
    const bio = Array.from(card.querySelectorAll('p')).find((node) => clean(node.textContent).startsWith('cybersecurity builder'));
    const socials = Array.from(card.querySelectorAll('div')).find((node) => {
      const links = Array.from(node.querySelectorAll(':scope > a'));
      return links.length === 4 && links.every((link) => /linkedin|x\.com|facebook|youtube/i.test(link.href));
    });
    card.classList.add('ts-builder-profile');
    head?.classList.add('ts-builder-profile-head');
    name?.classList.add('ts-builder-profile-name');
    if (tick && name) {
      tick.className = 'ts-builder-verified';
      tick.setAttribute('aria-label', 'Verified TrustStack founder');
      tick.title = 'Verified TrustStack founder';
      name.appendChild(tick);
    }
    if (bio) {
      bio.classList.add('ts-builder-bio');
      bio.textContent = 'Technology leader, cybersecurity innovator and founder of Truststack Academy and Educational Services Ltd, building practical learning platforms that unite secure digital practice, privacy capability and career-focused education. Destiny Young turns complex African technology challenges into trusted products, scalable systems and accessible opportunities for people and organisations.';
    }
    if (socials) {
      socials.classList.add('ts-builder-socials');
      socials.insertAdjacentHTML('beforeend', `<a href="https://www.instagram.com/youngdestinya/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5Zm8.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg></a><a href="https://www.tiktok.com/@youngdestinya" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 2h3.1c.25 2.1 1.43 3.53 3.4 4.15v3.16a8.16 8.16 0 0 1-3.5-1.08v7.02A6.75 6.75 0 1 1 11.64 8.6v3.2a3.58 3.58 0 1 0 2.86 3.5V2Z"/></svg></a>`);
    }
  }

  function removeSampleTestimonials() {
    if (!path.includes('home')) return;
    const heading = Array.from(document.querySelectorAll('h1,h2,h3')).find((node) => clean(node.textContent) === 'what our learners say');
    const section = heading?.closest('section');
    if (section) section.remove();
  }

  function replacePartnerStrip() {
    if (!path.includes('home')) return;
    const label = Array.from(document.querySelectorAll('div')).find((node) => !node.children.length && clean(node.textContent) === 'trusted certifications & partners');
    const section = label?.closest('section');
    if (!section || section.dataset.tsCareerBadges === 'true') return;
    section.dataset.tsCareerBadges = 'true';
    section.className = 'ts-career-badge-strip';
    const badgeMarkup = (duplicate) => courseCatalogItems.map(c => {
      return `<a class="ts-career-badge" style="--badge:${c.color}" href="/courses/${c.slug}"${duplicate ? ' aria-hidden="true" tabindex="-1"' : ''}><span class="ts-career-badge-mark">${c.icon}</span><span class="ts-career-badge-copy"><strong>${c.name}</strong><small>Career track</small></span></a>`;
    }).join('');
    section.innerHTML = `<div class="ts-career-badge-heading"><span>TRUSTSTACK CAREER BADGES</span><h2>Eight specialist paths. One mission.</h2></div><div class="ts-career-badge-viewport"><div class="ts-career-badge-marquee"><div class="ts-career-badge-group">${badgeMarkup(false)}</div><div class="ts-career-badge-group" aria-hidden="true">${badgeMarkup(true)}</div></div></div>`;
  }

  function trackBadges() {
    if (/(certificate|verify)/.test(path) || path.startsWith('/courses')) return;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,a,span,strong,dt,dd').forEach((element) => {
      // NEVER touch header navigation, dropdown items, mobile drawer items, or hero sections
      if (element.closest('header, .hero, [class*="hero"], .ts-dropdown-menu, .ts-dropdown-link, .ts-mobile-drawer, [data-no-track-badge]')) return;
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
        const iconImage = card.querySelector('img:not([data-site-destination="/"])');
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
    if (/^enroll bundle\b|^get bundle\b|^pay ₦150k bundle\b/.test(label)) return '/pay?track=bundle';
    if (/^enroll( at| now|$)/.test(label) || /^pay( in naira|$)/.test(label)) return '/pay';
    if (label === 'home' || label === 'enter main website' || label === 'main website') return '/';
    if (label === 'courses' || label === 'tracks' || label === 'explore courses' || label === 'view all courses' || label === 'browse tracks' || label === 'browse 8 tracks') return '/courses';
    if (label === 'certificates' || label === 'verify' || label === 'verify certificate' || label === 'verify a certificate') return '/verify';
    if (label === 'my learning' || label === 'learner login' || label === 'login') return '/login';
    if (label === 'lms' || label === 'enter lms') return '/lms';
    if (label === 'pay') return '/pay';
    if (label === 'about' || label === 'our story') return '/about';
    if (label === 'contact' || label === 'contact us') return '/contact';
    if (label === 'scholarship') return '/scholarship';
    if (label === 'why truststack' || label === 'why truststack?') return '/#whytruststack';
    if (label === 'our mission' || label === 'our core values' || label === 'our vision') return '/#about';
    if (label === 'cap-adit' || label === 'securesme') return '/courses';
    if (label === 'privacy') return '/privacy';
    if (label === 'terms') return '/terms';
    if (label === 'view all articles' || label === 'explore the knowledge base' || label === 'read all articles' || label === 'knowledge base') return '/knowledge-base';
    if (path.includes('student-lms') && label === 'labs') return '/lms';
    if (path.includes('student-lms') && label === 'pricing') return '/courses';
    if (path.includes('courses-tracks') && label === 'view labs') return '/lms';
    if (path.includes('lms.html') && label === 'view all') return '/courses';
    if ((path.includes('home') || path.includes('lms.html')) && trackTarget(label)) return trackTarget(label);
    if (raw.includes('verify certificate') && (element.tagName === 'A' || element.tagName === 'BUTTON')) return '/verify';
    return null;
  }

  function focusWhyTrustStack(smooth = true) {
    const section = document.getElementById('whytruststack');
    if (!section) return false;
    const heading = section.querySelector('h1,h2,h3') || section;
    if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
    section.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    window.setTimeout(() => heading.focus({ preventScroll: true }), smooth ? 450 : 0);
    return true;
  }

  function wire() {
    addHomeFavicon();
    applyStaticSeo();
    addSharedStyles();
    repurposeEnrollmentSection();
    updateMainNavigation();
    linkOurStory();
    decorateHeaderMenus();
    brandHomeLinks();
    officialCertificateSeals();
    trackBadges();
    redesignKnowledgeBaseRow();
    addFooterResources();
    refineBuilderProfile();
    removeSampleTestimonials();
    replacePartnerStrip();
    if (path.includes('home') && location.hash === '#whytruststack' && !document.documentElement.dataset.whyTrustStackFocused) {
      document.documentElement.dataset.whyTrustStackFocused = 'true';
      requestAnimationFrame(() => focusWhyTrustStack(false));
    }
    document.querySelectorAll('a,button,span').forEach((element) => {
      const explicitHref = element.tagName === 'A' ? element.getAttribute('href') : null;
      if (explicitHref && explicitHref !== '#' && !explicitHref.startsWith('javascript:')) {
        if (element.tagName === 'A') return; // Preserve direct clean link
      }
      const target = explicitHref?.startsWith('/pay?track=') ? explicitHref : destination(element);
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
      if (path.includes('home') || path.includes('lms.html')) {
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
      const siteHeader = document.querySelector('header');
      const headerInner = siteHeader?.querySelector(':scope > div');
      if (headerInner?.querySelector('nav')) headerInner.classList.add('ts-home-header-inner');
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
    if (path.includes('courses-tracks')) {
      document.querySelectorAll('div').forEach((node) => {
        if (node.children.length || clean(node.textContent) !== '2026-9e43903f') return;
        node.dataset.siteDestination = '/verify?id=2026-9E43903F&view=certificate';
        node.setAttribute('role', 'link');
        node.setAttribute('tabindex', '0');
        node.setAttribute('aria-label', 'Verify sample certificate 2026-9E43903F');
        node.title = 'Open the official sample certificate record';
        node.style.cursor = 'pointer';
        node.style.textDecoration = 'underline';
        node.style.textUnderlineOffset = '4px';
      });
      document.querySelectorAll('footer div').forEach((node) => {
        if (!node.textContent.trim().startsWith('Font rule:') || node.textContent.length > 350) return;
        node.textContent = 'Explore hands-on cybersecurity career tracks, compare practical labs, and enroll in Naira. Each completed track is designed to build demonstrable skills and lead to a verifiable TrustStack Academy certificate.';
      });
    }
    if (path.includes('home')) {
      document.querySelectorAll('div').forEach((node) => {
        if (node.children.length || clean(node.textContent) !== 'built on real tools. designed for africa. ready for the world.') return;
        const strip = node.parentElement?.parentElement;
        if (!strip) return;
        strip.classList.add('ts-trust-strip');
        node.classList.add('ts-trust-strip-copy');
        const socialArea = node.parentElement?.children[1];
        if (!socialArea || socialArea.dataset.tsSocialLinks === 'true') return;
        socialArea.dataset.tsSocialLinks = 'true';
        socialArea.className = 'ts-social-strip';
        socialArea.innerHTML = `<a class="ts-social-linkedin" href="https://www.linkedin.com/company/truststackng/" target="_blank" rel="noopener noreferrer" aria-label="TrustStack on LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.43 8.1h4.12V24H.43V8.1ZM8.01 8.1h3.95v2.17h.06c.55-1.04 1.9-2.14 3.91-2.14 4.18 0 4.95 2.75 4.95 6.33V24h-4.11v-8.45c0-2.02-.04-4.62-2.82-4.62-2.82 0-3.25 2.2-3.25 4.47V24H8.01V8.1Z"/></svg></a><a class="ts-social-x" href="https://x.com/truststackng" target="_blank" rel="noopener noreferrer" aria-label="TrustStack on X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.24 2H21l-6.04 6.9L22.07 22H16.5l-4.36-5.7L7.15 22H4.38l6.47-7.4L4.03 2H9.74l3.94 5.2L18.24 2Zm-.97 17.7h1.53L8.9 4.18H7.26L17.27 19.7Z"/></svg></a><a class="ts-social-facebook" href="https://web.facebook.com/truststackng" target="_blank" rel="noopener noreferrer" aria-label="TrustStack on Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"/></svg></a><a class="ts-social-instagram" href="https://instagram.com/truststackng" target="_blank" rel="noopener noreferrer" aria-label="TrustStack on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a><a class="ts-social-youtube" href="https://www.youtube.com/@TruststackNG" target="_blank" rel="noopener noreferrer" aria-label="TrustStack on YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.13C19.55 3.56 12 3.56 12 3.56s-7.55 0-9.4.51A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.13c1.85.51 9.4.51 9.4.51s7.55 0 9.4-.51a3 3 0 0 0 2.1-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.57V8.43L15.87 12 9.6 15.57Z"/></svg></a>`;
      });
      const homeFooter = document.querySelector('footer');
      if (homeFooter) {
        homeFooter.classList.add('ts-home-footer');
        homeFooter.querySelectorAll('input').forEach((input) => {
          let panel = input.parentElement;
          while (panel && panel !== homeFooter) {
            const background = getComputedStyle(panel).backgroundColor;
            if (background === 'rgb(255, 255, 255)' || background === 'rgba(255, 255, 255, 1)') {
              panel.classList.add('ts-footer-light-panel');
              break;
            }
            panel = panel.parentElement;
          }
        });
      }
      const legalResources = [
        { current: 'our mission', label: 'NDPA 2023', href: 'https://ndpc.gov.ng/download/nigeria-data-protection-act-2023' },
        { current: 'our core values', label: 'GAID 2025', href: 'https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf' },
        { current: 'our vision', label: 'Cybercrime Act 2024', href: 'https://cert.gov.ng/ngcert/resources/CyberCrime__Prohibition_Prevention_etc__Act__2024.pdf' }
      ];
      document.querySelectorAll('footer a').forEach((link) => {
        const resource = legalResources.find((item) => clean(link.textContent) === item.current);
        if (!resource) return;
        link.textContent = resource.label;
        link.setAttribute('href', resource.href);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('aria-label', `${resource.label} — open official resource`);
      });
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
  let wiringScheduled = false;
  const observerOptions = { childList: true, subtree: true };
  const observer = new MutationObserver(() => {
    if (wiringScheduled) return;
    wiringScheduled = true;
    observer.disconnect();
    requestAnimationFrame(() => {
      wire();
      wiringScheduled = false;
      observer.observe(document.documentElement, observerOptions);
    });
  });
  observer.observe(document.documentElement, observerOptions);

  document.addEventListener('click', (event) => {
    const element = event.target && event.target.closest && event.target.closest('a,button,[data-site-destination]');
    if (!element) return;
    if (element.classList.contains('ts-mobile-close') || element.closest('.ts-mobile-accordion-header')) return;
    
    const explicitHref = element.tagName === 'A' ? element.getAttribute('href') : null;
    if (explicitHref && explicitHref !== '#' && !explicitHref.startsWith('javascript:')) {
      if (explicitHref.startsWith('/courses/') || explicitHref.startsWith('/pay') || explicitHref.startsWith('/scholarship') || explicitHref.startsWith('/about') || explicitHref.startsWith('/contact') || explicitHref.startsWith('/login') || explicitHref.startsWith('/central-login') || explicitHref.startsWith('/student-lms') || explicitHref.startsWith('/admin') || explicitHref.startsWith('/lms') || explicitHref.startsWith('/verify') || explicitHref.startsWith('/cdpo') || explicitHref.startsWith('/career-badges') || explicitHref.startsWith('/knowledge-base') || explicitHref.startsWith('http')) {
        return; // Allow native navigation directly to destination
      }
    }

    const target = element.dataset.siteDestination || destination(element);
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (target === '/#whytruststack' && path.includes('home') && focusWhyTrustStack(true)) {
      history.pushState(null, '', '#whytruststack');
      return;
    }
    location.href = target;
  }, true);

  window.addEventListener('beforeprint', () => {
    const hasCert = document.querySelector('.official-cert-card, .modal-cert-card, #printableCertificate, .certificate');
    const certModal = document.getElementById('certModal');
    const isCertModalOpen = certModal && certModal.style.display !== 'none';
    if (hasCert || isCertModalOpen || location.pathname.includes('certificate')) {
      let el = document.getElementById('ts-landscape-print-enforcer');
      if (!el) {
        el = document.createElement('style');
        el.id = 'ts-landscape-print-enforcer';
        document.head.appendChild(el);
      }
      el.textContent = '@page { size: A4 landscape !important; margin: 8mm 10mm !important; }';
    }
  });
})();

