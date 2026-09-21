(function () {
  const path = location.pathname.toLowerCase();
  const clean = (value) => (value || '').replace(/\s+/g, ' ').trim().replace(/[→←]/g, '').trim().toLowerCase();

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
    if ((path.includes('home') || path.includes('lms-full')) && /^(soc analyst track|digital forensics|threat intelligence|penetration testing|cloud security|governance & grc|malware analysis|security engineering|cybersecurity fundamentals|network security|ethical hacking|grc|soc analyst|digital forensics & ir readiness|secure app dev)$/.test(label)) return '/courses';
    if (raw.includes('verify certificate') && (element.tagName === 'A' || element.tagName === 'BUTTON')) return '/verify';
    return null;
  }

  function wire() {
    document.querySelectorAll('a,button,span').forEach((element) => {
      const target = destination(element);
      if (target && element.tagName === 'A' && element.getAttribute('href') !== target) element.setAttribute('href', target);
      if (target && element.dataset.siteDestination !== target) element.dataset.siteDestination = target;
      if (target && element.tagName === 'SPAN') element.style.cursor = 'pointer';
    });
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
})();
