import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { courseCatalog } from '../lib/course-catalog';

const levels = [
  'Complete Beginner / Exploring Tech',
  'Student / Recent Graduate',
  'IT Support / Systems Administrator',
  'Software Engineer / DevOps',
  'Security Enthusiast / Self-Taught Defender',
  'Mid-Level Professional Upskilling'
];

export default function Scholarship() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    location: '',
    track: 'soc-analyst',
    level: levels[0],
    comment: '',
    consent: false,
    company: ''
  });

  const [state, setState] = useState({ status: 'idle', message: '', id: '' });

  const selectedCourse = courseCatalog.find(c => c.slug === form.track) || courseCatalog[0];

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const selectTrack = (slug) => {
    setForm(prev => ({ ...prev, track: slug }));
    const applyEl = document.getElementById('apply');
    if (applyEl) applyEl.scrollIntoView({ behavior: 'smooth' });
  };

  async function submit(event) {
    event.preventDefault();
    if (!form.consent) {
      setState({ status: 'error', message: 'Please consent to the privacy and application terms.' });
      return;
    }

    setState({ status: 'loading', message: '', id: '' });

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        fullName: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        mobile: form.mobile,
        location: form.location,
        track: selectedCourse.title,
        level: form.level,
        comment: form.comment,
        consent: true
      };

      const response = await fetch('/api/scholarship/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'We could not submit your application. Please try again.');
      }

      setState({
        status: 'success',
        id: result.id || 'SCH-2026',
        message: result.message || 'Your scholarship application has been successfully recorded in the official TrustStack Academy registry.'
      });

      setForm({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        location: '',
        track: 'soc-analyst',
        level: levels[0],
        comment: '',
        consent: false,
        company: ''
      });
    } catch (error) {
      setState({ status: 'error', message: error.message, id: '' });
    }
  }

  return (
    <>
      <Head>
        <title>Early Bird Cybersecurity Scholarship 2026 | TrustStack Academy</title>
        <meta name="description" content="Apply for a fully funded early bird scholarship on one of eight practical cybersecurity career tracks. Built for African defenders, certified by TrustStack Academy." />
        <link rel="canonical" href="https://truststack.academy/scholarship" />
        <meta property="og:title" content="Early Bird Cybersecurity Scholarship 2026 | TrustStack Academy" />
        <meta property="og:description" content="100% Tuition-Funded Cybersecurity Career Tracks. Hands-on labs, real tools, verifiable certificates." />
        <meta property="og:url" content="https://truststack.academy/scholarship" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://truststack.academy/truststack-home-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,400;0,500;0,700;0,800;0,900;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>

      {/* ── TOP BANNER ──────────────────────────────────────── */}
      <div className="top-banner">
        <span>🎓 2026 EARLY BIRD SCHOLARSHIP COHORT NOW OPEN · FULL TUITION WAIVER FOR SELECTED AFRICAN DEFENDERS</span>
      </div>

      {/* ── GLOBAL HEADER ───────────────────────────────────── */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand-logo" title="TrustStack Academy Home">
            <img src="/truststack-home-logo.png" alt="TrustStack Academy" width="40" height="40" />
            <strong className="brand-name">
              <span className="navy">TrustStack </span>
              <span className="cyan">Academy</span>
            </strong>
          </Link>
          <nav className="header-nav">
            <Link href="/" className="nav-item">Home</Link>
            <Link href="/courses" className="nav-item">Courses</Link>
            <Link href="/lms" className="nav-item">LMS</Link>
            <Link href="/#whytruststack" className="nav-item">Why TrustStack</Link>
            <Link href="/about" className="nav-item">About</Link>
            <Link href="/scholarship" className="nav-item active">
              Scholarship<sup className="nav-badge-new">NEW</sup>
            </Link>
            <Link href="/contact" className="nav-item">Contact</Link>
            <a href="#apply" className="nav-cta-btn">Apply Now →</a>
          </nav>
        </div>
      </header>

      <main className="scholarship-main">
        {/* ── HERO SECTION ──────────────────────────────────── */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-left">
              <div className="kicker-pill">
                <span className="kicker-dot" />
                <span>100% TUITION COVERED · 2026 INAUGURAL COHORT</span>
              </div>
              <h1 className="hero-title">
                Build Practical<br />
                <span className="text-cyan">Cyber Defence Skills.</span><br />
                We Fund Your Start.
              </h1>
              <p className="hero-desc">
                TrustStack Academy is sponsoring high-potential African talent with full tuition scholarships across our eight hands-on career tracks. Master industry-standard security tools in live cloud environments and graduate with a verifiable credential.
              </p>

              <div className="hero-actions">
                <a href="#apply" className="btn-primary-glow">
                  Apply for Scholarship →
                </a>
                <a href="#tracks" className="btn-outline-cyan">
                  Explore 8 Eligible Tracks
                </a>
              </div>

              <div className="hero-badges-row">
                <div className="hero-stat-badge">
                  <strong>100%</strong>
                  <span>Tuition Waiver</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat-badge">
                  <strong>8</strong>
                  <span>Career Tracks</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat-badge">
                  <strong>₦0</strong>
                  <span>Application Fee</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat-badge">
                  <strong>Verifiable</strong>
                  <span>Hashed Credential</span>
                </div>
              </div>
            </div>

            {/* ── HERO RIGHT: PROMINENT BIG LOGO SHOWCASE ────── */}
            <div className="hero-right">
              <div className="logo-showcase-card">
                <div className="logo-ambient-glow" />
                <div className="logo-emblem-wrap">
                  {/* PROMINENT HIGH-RES BIG LOGO */}
                  <img
                    src="/truststack-home-logo.png"
                    alt="TrustStack Academy Official Shield"
                    className="big-hero-logo"
                  />
                </div>
                <div className="showcase-badge">
                  <span className="star-icon">★</span>
                  <span>OFFICIAL CYBER TALENT INITIATIVE</span>
                </div>
                <h3 className="showcase-title">Early Bird Cyber Scholarship</h3>
                <p className="showcase-subtitle">
                  Valued at <strong>₦25,000 per track</strong> · <strong>₦150,000 for full bundle</strong>. Fully funded for selected candidates.
                </p>
                <div className="showcase-features">
                  <div className="showcase-item">
                    <span className="check">✓</span>
                    <span>Direct access to cloud cyber lab sandboxes</span>
                  </div>
                  <div className="showcase-item">
                    <span className="check">✓</span>
                    <span>Guided by experienced Chief Security Architects</span>
                  </div>
                  <div className="showcase-item">
                    <span className="check">✓</span>
                    <span>NDPA 2023, ISO 27001 &amp; NIST-aligned curricula</span>
                  </div>
                </div>
                <a href="#apply" className="showcase-cta">Claim Your Candidate Dossier →</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUE PILLARS ─────────────────────────────────── */}
        <section className="pillars-section">
          <div className="section-container">
            <div className="section-header-centred">
              <div className="section-kicker">SCHOLARSHIP ADVANTAGES</div>
              <h2 className="section-title">What Selected Scholars Receive</h2>
              <p className="section-subtitle">
                Designed to eliminate financial barriers while delivering world-class, job-ready capabilities for African organisations and global markets.
              </p>
            </div>

            <div className="pillars-grid">
              <div className="pillar-card">
                <div className="pillar-icon-box" style={{ background: 'rgba(0, 212, 255, 0.12)', color: '#00D4FF' }}>🛡️</div>
                <h3>100% Tuition Waiver</h3>
                <p>Selected scholars pay no course fees whatsoever. Full access to instruction, labs, assessments and mentorship is fully sponsored.</p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon-box" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#f97316' }}>⚡</div>
                <h3>Real-World Cyber Labs</h3>
                <p>No passive slide decks. You investigate real attacks, configure genuine firewalls, and hunt adversaries using Wazuh, Splunk, and Wireshark.</p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon-box" style={{ background: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6' }}>🎓</div>
                <h3>Verifiable Digital Credential</h3>
                <p>Graduate with a cryptographically hashed certificate that employers can instantly verify via our public verification portal.</p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>🤝</div>
                <h3>Founding Cohort Community</h3>
                <p>Collaborate with motivated peers across Nigeria, Ghana, Kenya, South Africa, and Rwanda in closed defender squad channels.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8 ELIGIBLE TRACKS ─────────────────────────────── */}
        <section className="tracks-section" id="tracks">
          <div className="section-container">
            <div className="section-header-centred">
              <div className="section-kicker">CURRICULUM PORTFOLIO</div>
              <h2 className="section-title">Choose Your Specialised Career Track</h2>
              <p className="section-subtitle">
                All eight practical career tracks are eligible for 100% scholarship funding. Select the discipline aligned with your aspirations.
              </p>
            </div>

            <div className="tracks-grid">
              {courseCatalog.map((track) => {
                const isSelected = form.track === track.slug;
                return (
                  <div
                    key={track.slug}
                    className={`track-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => selectTrack(track.slug)}
                  >
                    <div className="track-card-top">
                      <span className="track-badge-icon" style={{ background: track.color }}>{track.icon}</span>
                      <span className="track-level-tag">{track.level}</span>
                    </div>
                    <h3 className="track-title">{track.title}</h3>
                    <p className="track-summary">{track.summary}</p>
                    <div className="track-tools">
                      <span className="tools-label">Tools:</span> {track.tools}
                    </div>
                    <div className="track-card-bottom">
                      <span className="track-fee-badge">₦0 · Scholarship</span>
                      <button
                        type="button"
                        className="select-track-btn"
                        onClick={(e) => { e.stopPropagation(); selectTrack(track.slug); }}
                      >
                        {isSelected ? '✓ Selected' : 'Select Track →'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3-STEP SELECTION PROCESS ──────────────────────── */}
        <section className="steps-section">
          <div className="section-container">
            <div className="section-header-centred">
              <div className="section-kicker">ADMISSIONS TIMELINE</div>
              <h2 className="section-title">How the Scholarship Programme Works</h2>
              <p className="section-subtitle">A straightforward, transparent admissions process built on merit and dedication.</p>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-badge">STEP 01</div>
                <h3>Submit Expression of Interest</h3>
                <p>Complete the secure candidate dossier below. Detail your educational background and why you want to specialise in cybersecurity.</p>
              </div>
              <div className="step-card">
                <div className="step-badge">STEP 02</div>
                <h3>Academic Board Review</h3>
                <p>Our admissions committee reviews submissions sequentially. Shortlisted applicants receive cohort placement notifications by email and WhatsApp.</p>
              </div>
              <div className="step-card">
                <div className="step-badge">STEP 03</div>
                <h3>Onboarding &amp; Lab Access</h3>
                <p>Receive your personalised LMS credentials, join your dedicated squad channel, and begin your hands-on cybersecurity curriculum.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── APPLICATION FORM SECTION ──────────────────────── */}
        <section className="apply-section" id="apply">
          <div className="section-container">
            <div className="apply-layout">
              {/* Form Card */}
              <div className="apply-form-card">
                <div className="form-top-meta">
                  <span className="secure-shield-tag">🔒 ENCRYPTED SUBMISSION · NDPA 2023 COMPLIANT</span>
                </div>
                <h2 className="form-main-heading">Join the Scholarship Registry</h2>
                <p className="form-main-sub">
                  Complete your candidate dossier below. Applications are stored securely in our official registry and processed for Cohort 1 allocation.
                </p>

                {state.status === 'success' && (
                  <div className="alert-box success">
                    <div className="alert-icon">✓</div>
                    <div className="alert-content">
                      <strong>Application Received! (Reference: {state.id})</strong>
                      <p>{state.message}</p>
                      <small>Our admissions committee will communicate next steps to your registered email address.</small>
                    </div>
                  </div>
                )}

                {state.status === 'error' && (
                  <div className="alert-box error">
                    <div className="alert-icon">⚠️</div>
                    <div className="alert-content">
                      <strong>Submission Error</strong>
                      <p>{state.message}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={submit} className="dossier-form">
                  <div className="form-row two-cols">
                    <div className="form-group">
                      <label htmlFor="firstName">FIRST NAME <span className="req">*</span></label>
                      <input
                        id="firstName"
                        name="firstName"
                        required
                        minLength={2}
                        maxLength={80}
                        value={form.firstName}
                        onChange={update}
                        placeholder="e.g. Chinelo"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">LAST NAME <span className="req">*</span></label>
                      <input
                        id="lastName"
                        name="lastName"
                        required
                        minLength={2}
                        maxLength={80}
                        value={form.lastName}
                        onChange={update}
                        placeholder="e.g. Adeyemi"
                      />
                    </div>
                  </div>

                  <div className="form-row two-cols">
                    <div className="form-group">
                      <label htmlFor="email">EMAIL ADDRESS <span className="req">*</span></label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        maxLength={254}
                        value={form.email}
                        onChange={update}
                        placeholder="e.g. chinelo.adeyemi@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">MOBILE / WHATSAPP <span className="req">*</span></label>
                      <input
                        id="mobile"
                        type="tel"
                        name="mobile"
                        required
                        minLength={7}
                        maxLength={30}
                        value={form.mobile}
                        onChange={update}
                        placeholder="e.g. +234 803 123 4567"
                      />
                    </div>
                  </div>

                  <div className="form-row two-cols">
                    <div className="form-group">
                      <label htmlFor="location">LOCATION / CITY &amp; COUNTRY <span className="req">*</span></label>
                      <input
                        id="location"
                        name="location"
                        required
                        value={form.location}
                        onChange={update}
                        placeholder="e.g. Lagos, Nigeria or Accra, Ghana"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="level">CURRENT EXPERIENCE LEVEL <span className="req">*</span></label>
                      <select id="level" name="level" value={form.level} onChange={update}>
                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="track">SELECT YOUR DESIRED CAREER TRACK <span className="req">*</span></label>
                    <select id="track" name="track" value={form.track} onChange={update}>
                      {courseCatalog.map(c => (
                        <option key={c.slug} value={c.slug}>
                          {c.title} ({c.level}) — Tools: {c.tools}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Track Preview Box */}
                  <div className="selected-track-preview">
                    <div className="preview-top">
                      <span className="preview-icon" style={{ background: selectedCourse.color }}>{selectedCourse.icon}</span>
                      <div>
                        <strong>{selectedCourse.title}</strong>
                        <span className="preview-level">Level: {selectedCourse.level}</span>
                      </div>
                    </div>
                    <p className="preview-desc">{selectedCourse.summary}</p>
                    <div className="preview-modules-list">
                      <span className="modules-heading">Core Modules:</span>
                      {selectedCourse.modules.slice(0, 4).map((m, i) => (
                        <span key={i} className="module-pill">· {m}</span>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="comment">STATEMENT OF INTENT <small>(OPTIONAL BUT HIGHLY RECOMMENDED)</small></label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={4}
                      maxLength={1000}
                      value={form.comment}
                      onChange={update}
                      placeholder="Tell us about your background, career aspirations, and why you are committed to completing this cybersecurity programme…"
                    />
                  </div>

                  <div className="consent-check-row">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={form.consent}
                      onChange={update}
                      required
                    />
                    <label htmlFor="consent">
                      I declare that all submitted information is accurate and authorise TrustStack Academy to process my application under the Nigeria Data Protection Act (NDPA 2023) and our <Link href="/privacy" target="_blank">Privacy Policy</Link>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="submit-dossier-btn"
                    disabled={state.status === 'loading'}
                  >
                    {state.status === 'loading' ? 'Recording in Registry…' : 'Submit Scholarship Application →'}
                  </button>
                </form>
              </div>

              {/* Sidebar Info Card */}
              <aside className="apply-sidebar">
                <div className="sidebar-card">
                  <div className="sidebar-logo-header">
                    <img src="/truststack-home-logo.png" alt="TrustStack Shield" width="56" height="56" />
                    <div>
                      <h4>TrustStack Academy</h4>
                      <span>Educational Services Ltd</span>
                    </div>
                  </div>
                  <div className="sidebar-divider" />
                  <h5>What Selection Covers</h5>
                  <ul className="sidebar-list">
                    <li><span className="check">✓</span> 100% Course Tuition Waiver</li>
                    <li><span className="check">✓</span> Cloud Cyber Lab Environments</li>
                    <li><span className="check">✓</span> Instructor &amp; Mentor Support</li>
                    <li><span className="check">✓</span> Live Capstone Project Review</li>
                    <li><span className="check">✓</span> Verifiable Digital Certificate</li>
                  </ul>

                  <div className="sidebar-security-note">
                    <strong>Zero-Cost Guarantee:</strong> TrustStack Academy will never ask for your credit card details, bank PIN, or passwords in connection with a scholarship application.
                  </div>
                </div>

                <div className="sidebar-support-card">
                  <h5>Need Inquiries?</h5>
                  <p>Our admissions desk is available to assist you with curriculum questions and eligibility guidance.</p>
                  <a href="mailto:scholarship@truststack.academy" className="support-link">
                    ✉ scholarship@truststack.academy
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      {/* ── OFFICIAL 5-COLUMN FOOTER ───────────────────────── */}
      <footer className="site-footer">
        <div className="footer-container">
          {/* Column 1: Brand & Founder Quote */}
          <div className="footer-col col-brand">
            <Link href="/" className="footer-brand-link">
              <img src="/truststack-home-logo.png" alt="TrustStack Academy" width="36" height="36" />
              <strong>TrustStack Academy</strong>
            </Link>
            <p className="footer-brand-desc">
              TrustStack Academy is the training subsidiary of TrustStack Technologies. Practical cybersecurity education for Africa — tool-driven, Naira-first, job-focused.
            </p>
            <div className="founder-quote-box">
              <p>
                &ldquo;Technology is only as strong as its security. In Africa, we must build not just digital solutions, but secure digital futures that our people can trust.&rdquo;
              </p>
              <span className="quote-author">
                — Destiny Young, FIIM, Founder and Chief Technology Architect, TrustStack Technologies
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <div className="footer-col-head">QUICK LINKS</div>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/#whytruststack">Why TrustStack</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/login">My Learning</Link></li>
              <li><Link href="/verify">Verify</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources & Corporate HQ */}
          <div className="footer-col">
            <div className="footer-col-head">RESOURCES</div>
            <ul className="footer-links">
              <li><Link href="/knowledge-base">Knowledge Base</Link></li>
              <li><Link href="/cdpo">Free CDPO Course</Link></li>
              <li><Link href="/career-badges">Career Badges</Link></li>
              <li><Link href="/verify">Verify Certificate</Link></li>
              <li><Link href="/scholarship">Scholarship</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Use</Link></li>
            </ul>
            <div className="corporate-hq-box">
              <div className="hq-title">📍 CORPORATE HEADQUARTERS</div>
              <address>
                25 Destiny Young Avenue, GRE<br />
                Ewet Housing Extension, Uyo 520101<br />
                Akwa Ibom State, Nigeria
              </address>
            </div>
          </div>

          {/* Column 4: Courses */}
          <div className="footer-col">
            <div className="footer-col-head">COURSES</div>
            <ul className="footer-links">
              {courseCatalog.map(c => (
                <li key={c.slug}>
                  <Link href={`/courses/${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact & Social */}
          <div className="footer-col">
            <div className="footer-col-head">CONTACT &amp; SOCIAL</div>
            <div className="contact-details">
              <p>✉ hello@truststackacademy.com</p>
              <p>📞 +234 809 024 3111</p>
              <p>📍 Uyo, Akwa Ibom</p>
            </div>
            <div className="footer-social-row">
              <a href="https://web.facebook.com/truststackng" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
              <a href="https://x.com/truststackng" target="_blank" rel="noopener noreferrer" aria-label="X">X</a>
              <a href="https://www.linkedin.com/company/truststackng/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">IN</a>
              <a href="https://instagram.com/truststackng" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
              <a href="https://www.youtube.com/@TruststackNG" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-bottom-inner">
            <span>© 2026 TrustStack Academy and Educational Services Ltd. All rights reserved.</span>
            <span>Built in Nigeria for Africa · Tool-Driven · Job-Focused</span>
          </div>
        </div>
      </footer>

      {/* ── LUXURY STYLES (SCOPED JSX) ───────────────────────── */}
      <style jsx>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Alegreya Sans', system-ui, -apple-system, sans-serif;
        }

        .scholarship-main {
          background: #030c18;
          color: #f1f5f9;
          overflow-x: hidden;
        }

        /* ── TOP BANNER ── */
        .top-banner {
          background: linear-gradient(90deg, #0A1931 0%, #087fa8 50%, #0A1931 100%);
          color: #ffffff;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .08em;
          text-align: center;
          padding: 8px 16px;
          border-bottom: 1px solid rgba(0,212,255,0.2);
        }

        /* ── GLOBAL HEADER ── */
        .site-header {
          position: sticky;
          top: 0;
          z-index: 999;
          height: 72px;
          background: rgba(3, 12, 24, 0.94);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
        }
        .header-inner {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .brand-logo img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        .brand-name {
          font-size: 20px;
          font-weight: 900;
        }
        .brand-name .navy { color: #ffffff; }
        .brand-name .cyan { color: #00b8d9; }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 22px;
        }
        .nav-item {
          color: #94a3b8;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          transition: color .15s;
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }
        .nav-item:hover, .nav-item.active {
          color: #00D4FF;
        }
        .nav-badge-new {
          color: #ef4444;
          font-size: 9px;
          font-weight: 900;
          margin-left: 2px;
        }
        .nav-cta-btn {
          background: linear-gradient(135deg, #00b8d9 0%, #008da6 100%);
          color: #ffffff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
          padding: 8px 18px;
          border-radius: 999px;
          transition: transform .15s, box-shadow .15s;
        }
        .nav-cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,184,217,0.35);
        }

        /* ── HERO SECTION ── */
        .hero-section {
          position: relative;
          background: radial-gradient(circle at 80% 20%, rgba(0, 212, 255, 0.12) 0%, transparent 60%),
                      radial-gradient(circle at 10% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                      #030c18;
          padding: 80px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .hero-container {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.25fr 0.95fr;
          gap: 60px;
          align-items: center;
        }
        .kicker-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 212, 255, 0.08);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .08em;
          color: #00D4FF;
          margin-bottom: 20px;
        }
        .kicker-dot {
          width: 8px;
          height: 8px;
          background: #00D4FF;
          border-radius: 50%;
          box-shadow: 0 0 8px #00D4FF;
        }
        .hero-title {
          font-size: clamp(38px, 4.4vw, 58px);
          font-weight: 900;
          line-height: 1.04;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .text-cyan {
          color: #00D4FF;
        }
        .hero-desc {
          margin-top: 20px;
          font-size: 17px;
          line-height: 1.65;
          color: #94a3b8;
          max-width: 540px;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 36px;
        }
        .btn-primary-glow {
          background: linear-gradient(135deg, #00D4FF 0%, #0099cc 100%);
          color: #04111f;
          font-weight: 900;
          font-size: 15px;
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 8px 30px rgba(0, 212, 255, 0.35);
          transition: transform .15s, box-shadow .15s;
        }
        .btn-primary-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 212, 255, 0.5);
        }
        .btn-outline-cyan {
          border: 1px solid rgba(0, 212, 255, 0.4);
          color: #00D4FF;
          background: rgba(0, 212, 255, 0.05);
          font-weight: 800;
          font-size: 15px;
          padding: 14px 26px;
          border-radius: 999px;
          text-decoration: none;
          transition: background .15s, border-color .15s;
        }
        .btn-outline-cyan:hover {
          background: rgba(0, 212, 255, 0.12);
          border-color: #00D4FF;
        }

        .hero-badges-row {
          margin-top: 48px;
          display: flex;
          align-items: center;
          gap: 20px;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .hero-stat-badge strong {
          display: block;
          font-size: 22px;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
        }
        .hero-stat-badge span {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
        }
        .hero-stat-divider {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.1);
        }

        /* ── HERO RIGHT: PROMINENT BIG LOGO SHOWCASE ── */
        .hero-right {
          position: relative;
        }
        .logo-showcase-card {
          position: relative;
          background: linear-gradient(160deg, #07192e 0%, #030c18 100%);
          border: 1px solid rgba(0, 212, 255, 0.25);
          border-radius: 28px;
          padding: 40px 32px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        .logo-ambient-glow {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }
        .logo-emblem-wrap {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        /* BIG PROMINENT LOGO (160px width) */
        .big-hero-logo {
          width: 160px;
          height: 160px;
          object-fit: contain;
          filter: drop-shadow(0 14px 28px rgba(0, 212, 255, 0.35));
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .showcase-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: #D4AF37;
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .08em;
          margin-bottom: 12px;
        }
        .star-icon { font-size: 12px; }
        .showcase-title {
          font-size: 24px;
          font-weight: 900;
          color: #ffffff;
        }
        .showcase-subtitle {
          margin-top: 8px;
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.5;
        }
        .showcase-subtitle strong { color: #00D4FF; }
        .showcase-features {
          margin-top: 24px;
          display: grid;
          gap: 10px;
          text-align: left;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 16px;
        }
        .showcase-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #cbd5e1;
        }
        .showcase-item .check {
          color: #10b981;
          font-weight: 900;
        }
        .showcase-cta {
          display: block;
          margin-top: 24px;
          background: linear-gradient(135deg, #00b8d9 0%, #0ea5e9 100%);
          color: #04111f;
          font-weight: 900;
          font-size: 14px;
          padding: 14px;
          border-radius: 999px;
          text-decoration: none;
          transition: transform .15s;
        }
        .showcase-cta:hover { transform: translateY(-1px); }

        /* ── SECTION COMMON ── */
        .section-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 90px 24px;
        }
        .section-header-centred {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 60px;
        }
        .section-kicker {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .2em;
          color: #00D4FF;
          margin-bottom: 10px;
        }
        .section-title {
          font-size: clamp(30px, 3.4vw, 44px);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
        }
        .section-subtitle {
          margin-top: 14px;
          font-size: 16px;
          line-height: 1.6;
          color: #94a3b8;
        }

        /* ── PILLARS SECTION ── */
        .pillars-section {
          background: #04111f;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .pillar-card {
          background: linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px;
          transition: transform .2s, border-color .2s;
        }
        .pillar-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 212, 255, 0.3);
        }
        .pillar-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .pillar-card h3 {
          font-size: 19px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 10px;
        }
        .pillar-card p {
          font-size: 14px;
          line-height: 1.6;
          color: #94a3b8;
        }

        /* ── 8 TRACKS SECTION ── */
        .tracks-section {
          background: #030c18;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .tracks-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }
        .track-card {
          background: linear-gradient(160deg, #07192e 0%, #04111f 100%);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          padding: 24px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform .2s, border-color .2s, box-shadow .2s;
        }
        .track-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 212, 255, 0.4);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
        }
        .track-card.selected {
          border-color: #00D4FF;
          box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.4);
        }
        .track-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .track-badge-icon {
          width: 44px;
          height: 48px;
          color: #fff;
          font-size: 18px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(50% 0, 92% 16%, 92% 66%, 50% 100%, 8% 66%, 8% 16%);
        }
        .track-level-tag {
          font-size: 10px;
          font-weight: 800;
          background: rgba(255,255,255,0.08);
          color: #94a3b8;
          padding: 3px 8px;
          border-radius: 999px;
          text-transform: uppercase;
        }
        .track-title {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .track-summary {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.55;
          margin-bottom: 16px;
        }
        .track-tools {
          font-size: 11px;
          color: #64748b;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 12px;
          margin-bottom: 18px;
        }
        .tools-label {
          color: #00D4FF;
          font-weight: 800;
        }
        .track-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .track-fee-badge {
          font-size: 12px;
          font-weight: 900;
          color: #10b981;
        }
        .select-track-btn {
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          color: #00D4FF;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          transition: background .15s;
        }
        .track-card.selected .select-track-btn {
          background: #00D4FF;
          color: #04111f;
        }

        /* ── STEPS SECTION ── */
        .steps-section {
          background: #04111f;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .step-card {
          background: linear-gradient(160deg, #07192e 0%, #030c18 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          padding: 32px;
          position: relative;
        }
        .step-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .18em;
          color: #00D4FF;
          background: rgba(0, 212, 255, 0.1);
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 16px;
        }
        .step-card h3 {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 10px;
        }
        .step-card p {
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.6;
        }

        /* ── APPLY SECTION ── */
        .apply-section {
          background: #030c18;
          padding-bottom: 100px;
        }
        .apply-layout {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 40px;
          align-items: start;
        }
        .apply-form-card {
          background: #07192e;
          border: 1px solid rgba(0, 212, 255, 0.22);
          border-radius: 28px;
          padding: 44px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }
        .secure-shield-tag {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .14em;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 999px;
          padding: 4px 12px;
        }
        .form-main-heading {
          margin-top: 16px;
          font-size: 32px;
          font-weight: 900;
          color: #ffffff;
        }
        .form-main-sub {
          margin-top: 8px;
          font-size: 15px;
          color: #94a3b8;
          line-height: 1.6;
        }

        .alert-box {
          margin-top: 24px;
          border-radius: 14px;
          padding: 18px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .alert-box.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
        }
        .alert-box.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #f87171;
        }
        .alert-icon { font-size: 20px; }
        .alert-content strong { display: block; font-size: 15px; margin-bottom: 4px; }
        .alert-content p { font-size: 13px; line-height: 1.5; }
        .alert-content small { display: block; margin-top: 6px; font-size: 12px; opacity: 0.8; }

        .dossier-form {
          margin-top: 32px;
          display: grid;
          gap: 20px;
        }
        .form-row.two-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .08em;
          color: #94a3b8;
        }
        .form-group label .req { color: #00D4FF; }
        .form-group label small { font-weight: 500; color: #64748b; }
        .form-group input, .form-group select, .form-group textarea {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          color: #f1f5f9;
          font-size: 15px;
          padding: 13px 16px;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: #00D4FF;
          box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.18);
        }
        .form-group select option { background: #07192e; color: #f1f5f9; }

        .selected-track-preview {
          background: rgba(0, 212, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 14px;
          padding: 18px;
          display: grid;
          gap: 8px;
        }
        .preview-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .preview-icon {
          width: 32px;
          height: 36px;
          color: #fff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(50% 0, 92% 16%, 92% 66%, 50% 100%, 8% 66%, 8% 16%);
        }
        .preview-top strong { font-size: 15px; color: #ffffff; display: block; }
        .preview-level { font-size: 11px; color: #00D4FF; font-weight: 800; }
        .preview-desc { font-size: 13px; color: #94a3b8; line-height: 1.5; }
        .preview-modules-list { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 4px; }
        .modules-heading { font-size: 11px; font-weight: 900; color: #cbd5e1; }
        .module-pill { font-size: 11px; color: #94a3b8; background: rgba(255,255,255,0.04); padding: 2px 8px; border-radius: 4px; }

        .consent-check-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-top: 6px;
        }
        .consent-check-row input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: #00D4FF;
        }
        .consent-check-row label {
          font-size: 13px;
          line-height: 1.5;
          color: #94a3b8;
        }
        .consent-check-row a { color: #00D4FF; }

        .submit-dossier-btn {
          margin-top: 10px;
          background: linear-gradient(135deg, #00D4FF 0%, #0ea5e9 100%);
          border: 0;
          color: #04111f;
          font-weight: 900;
          font-size: 16px;
          padding: 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: transform .15s, box-shadow .15s;
          box-shadow: 0 8px 30px rgba(0, 212, 255, 0.3);
        }
        .submit-dossier-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 212, 255, 0.45);
        }
        .submit-dossier-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ── APPLY SIDEBAR ── */
        .apply-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sidebar-card {
          background: linear-gradient(160deg, #07192e 0%, #030c18 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 32px;
        }
        .sidebar-logo-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .sidebar-logo-header img {
          width: 56px;
          height: 56px;
          object-fit: contain;
        }
        .sidebar-logo-header h4 {
          font-size: 18px;
          font-weight: 900;
          color: #ffffff;
        }
        .sidebar-logo-header span {
          font-size: 12px;
          color: #00b8d9;
          font-weight: 700;
        }
        .sidebar-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 20px 0;
        }
        .sidebar-card h5 {
          font-size: 14px;
          font-weight: 900;
          letter-spacing: .08em;
          color: #ffffff;
          margin-bottom: 14px;
        }
        .sidebar-list {
          list-style: none;
          display: grid;
          gap: 12px;
        }
        .sidebar-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #cbd5e1;
        }
        .sidebar-list .check {
          color: #10b981;
          font-weight: 900;
        }
        .sidebar-security-note {
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-size: 12px;
          line-height: 1.6;
          color: #64748b;
        }
        .sidebar-security-note strong { color: #94a3b8; }

        .sidebar-support-card {
          background: rgba(0, 212, 255, 0.04);
          border: 1px solid rgba(0, 212, 255, 0.15);
          border-radius: 20px;
          padding: 24px;
        }
        .sidebar-support-card h5 {
          font-size: 14px;
          font-weight: 900;
          color: #00D4FF;
          margin-bottom: 8px;
        }
        .sidebar-support-card p {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .support-link {
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
        }

        /* ── OFFICIAL 5-COLUMN FOOTER ── */
        .site-footer {
          background: #020812;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 80px;
        }
        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px 60px;
          display: grid;
          grid-template-columns: 1.4fr 0.9fr 1.1fr 0.9fr 1fr;
          gap: 36px;
        }
        .footer-col-head {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .12em;
          color: #ffffff;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 8px;
        }
        .footer-col-head::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 24px;
          height: 2px;
          background: #D4AF37;
        }
        .footer-brand-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #ffffff;
          font-size: 18px;
          font-weight: 900;
          margin-bottom: 14px;
        }
        .footer-brand-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 20px;
        }
        .founder-quote-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 16px;
        }
        .founder-quote-box p {
          font-size: 12px;
          font-style: italic;
          color: #94a3b8;
          line-height: 1.6;
        }
        .quote-author {
          display: block;
          margin-top: 8px;
          font-size: 11px;
          font-weight: 700;
          color: #D4AF37;
        }
        .footer-links {
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .footer-links li a {
          color: #64748b;
          text-decoration: none;
          font-size: 13px;
          transition: color .15s;
        }
        .footer-links li a:hover {
          color: #00D4FF;
        }
        .corporate-hq-box {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .hq-title {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .08em;
          color: #D4AF37;
          margin-bottom: 6px;
        }
        .corporate-hq-box address {
          font-style: normal;
          font-size: 12px;
          line-height: 1.5;
          color: #64748b;
        }
        .contact-details p {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 8px;
        }
        .footer-social-row {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }
        .footer-social-row a {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 900;
          text-decoration: none;
          transition: background .15s, transform .15s;
        }
        .footer-social-row a:hover {
          background: #00D4FF;
          color: #030c18;
          transform: translateY(-2px);
        }

        .footer-bottom-bar {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 20px 24px;
        }
        .footer-bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #475569;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .hero-container { grid-template-columns: 1fr; }
          .pillars-grid, .tracks-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { grid-template-columns: 1fr; }
          .apply-layout { grid-template-columns: 1fr; }
          .footer-container { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 768px) {
          .header-nav { display: none; }
          .hero-title { font-size: 36px; }
          .pillars-grid, .tracks-grid { grid-template-columns: 1fr; }
          .form-row.two-cols { grid-template-columns: 1fr; }
          .footer-container { grid-template-columns: 1fr; }
          .footer-bottom-inner { flex-direction: column; gap: 8px; }
        }
      `}</style>
    </>
  );
}
