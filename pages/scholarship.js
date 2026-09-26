import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const tracks = [
  'SOC Analyst', 'Digital Forensics', 'Threat Intelligence', 'Penetration Testing',
  'Cloud Security', 'Governance & GRC', 'Malware Analysis', 'Security Engineering'
];

const modules = {
  'SOC Analyst': 'SIEM monitoring, incident triage, detection engineering and response reporting',
  'Digital Forensics': 'Evidence handling, disk and memory analysis, timeline reconstruction and investigation reporting',
  'Threat Intelligence': 'Threat research, indicator analysis, adversary profiling and intelligence reporting',
  'Penetration Testing': 'Reconnaissance, vulnerability assessment, exploitation and professional reporting',
  'Cloud Security': 'Cloud identity, secure configuration, monitoring and incident response',
  'Governance & GRC': 'Risk assessment, policy, audit evidence, NDPA and ISO 27001 controls',
  'Malware Analysis': 'Static analysis, behavioural analysis, sandboxing and indicator extraction',
  'Security Engineering': 'Secure architecture, application security, automation and defensive tooling'
};

const emptyForm = { firstName: '', lastName: '', email: '', mobile: '', track: '', comment: '', consent: false, company: '' };

const benefits = [
  { n: '01', icon: '🎯', t: 'Choose your path', d: 'Select one of eight job-focused career tracks, each designed around real security roles in the field.' },
  { n: '02', icon: '⚡', t: 'Learn by doing', d: 'Complete practical, guided security labs in isolated environments. No theory without application.' },
  { n: '03', icon: '🏅', t: 'Prove your skills', d: 'Earn a portfolio-ready, verifiable credential recognised by employers across Africa and beyond.' },
];

const included = [
  'Full tuition for one career track',
  'Hands-on labs and assessments',
  'Mentor-led learning support',
  'Official verifiable certificate',
  'Founding cohort community access',
];

export default function Scholarship() {
  const [form, setForm] = useState(emptyForm);
  const [state, setState] = useState({ status: 'idle', message: '' });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  async function submit(event) {
    event.preventDefault();
    setState({ status: 'loading', message: '' });
    try {
      let response;
      try {
        response = await fetch('/api/scholarship/apply', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
        });
      } catch (err) {
        response = await fetch('https://gifabmhvfxqleilpipsz.supabase.co/functions/v1/scholarship-waitlist', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
        });
      }
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'We could not submit your application. Please try again.');
      setForm(emptyForm);
      setState({ status: 'success', message: result.message || 'Your scholarship interest has been received. We will be in touch.' });
    } catch (error) {
      setState({ status: 'error', message: error.message });
    }
  }

  return <>
    <Head>
      <title>Early Bird Cybersecurity Scholarship | TrustStack Academy</title>
      <meta name="description" content="Join the TrustStack Academy Early Bird Scholarship waitlist for practical cybersecurity, data protection and digital compliance training in Africa." />
      <link rel="canonical" href="https://truststack.academy/scholarship" />
      <meta property="og:title" content="TrustStack Academy Early Bird Scholarship" />
      <meta property="og:description" content="Apply for a fully funded place on one of eight practical cybersecurity career tracks." />
      <meta property="og:url" content="https://truststack.academy/scholarship" />
      <meta property="og:type" content="website" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,400;0,700;0,900;1,900&display=swap" rel="stylesheet" />
    </Head>

    {/* ── NAV ─────────────────────────────────────────────── */}
    <header className="nav">
      <Link href="/" className="brand">
        <img src="/truststack-home-logo.png" alt="TrustStack Academy" style={{ width: "42px", height: "42px", objectFit: "contain", display: "block" }} />
        <strong>TrustStack Academy</strong>
      </Link>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/courses">Career Tracks</Link>
        <Link href="/verify">Verify</Link>
        <a href="#apply" className="nav-cta">Apply Now</a>
      </nav>
    </header>

    {/* ── HERO ────────────────────────────────────────────── */}
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="pill">EARLY BIRD SCHOLARSHIP · 2026 · LIMITED SEATS</div>
          <h1>Build practical<br /><em>cyber skills.</em><br />We fund your start.</h1>
          <p>Apply for a fully funded place on one of eight hands-on career tracks in digital trust, security and compliance — built for African talent.</p>
          <div className="hero-actions">
            <a href="#apply" className="btn-primary">Reserve my slot →</a>
            <a href="#benefits" className="btn-ghost">How it works</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-top">
            <span className="hero-pct">100%</span>
            <strong>Scholarship-funded tuition</strong>
            <p>Selected learners pay no course fee.</p>
          </div>
          <div className="hero-tags">
            <span>8 career tracks</span>
            <span>Practical labs</span>
            <span>Verifiable certificate</span>
            <span>Africa-focused</span>
          </div>
        </div>
      </div>
      <div className="hero-strip">
        {tracks.map(t => <span key={t}>{t}</span>)}
      </div>
    </section>

    {/* ── COHORT INTRO ───────────────────────────────────── */}
    <section className="intro" id="benefits">
      <div className="intro-label">
        <div className="label-line" />
        <span>PREPARING FOR LAUNCH</span>
      </div>
      <div className="intro-body">
        <h2>A first cohort built for African talent</h2>
        <p>TrustStack Academy is inviting early adopters to experience our practical learning model before the public launch. Selected applicants receive one career track free of charge, with guided labs, assessment and a verifiable completion certificate.</p>
        <p>Places are limited. Selection considers application order, suitability and the information you provide. We will use your details only to assess your interest and send scholarship or onboarding updates.</p>
      </div>
    </section>

    {/* ── BENEFITS ───────────────────────────────────────── */}
    <section className="benefits">
      {benefits.map(({ n, icon, t, d }) => (
        <article key={n} className="benefit-card">
          <div className="benefit-num">{n}</div>
          <div className="benefit-icon">{icon}</div>
          <h3>{t}</h3>
          <p>{d}</p>
        </article>
      ))}
    </section>

    {/* ── APPLY SECTION ──────────────────────────────────── */}
    <section className="apply" id="apply">
      <div className="apply-inner">

        {/* Form */}
        <div className="form-card">
          <div className="form-header">
            <div className="secure-badge">🔒 SECURE APPLICATION</div>
            <h2>Join the scholarship waitlist</h2>
            <p>Your submission is encrypted in transit, validated on the server and stored privately.</p>
          </div>
          <form onSubmit={submit}>
            <div className="two">
              <label>First name<input required minLength="2" maxLength="80" name="firstName" value={form.firstName} onChange={update} autoComplete="given-name" placeholder="Ada" /></label>
              <label>Last name<input required minLength="2" maxLength="80" name="lastName" value={form.lastName} onChange={update} autoComplete="family-name" placeholder="Okonkwo" /></label>
            </div>
            <label>Email address<input required type="email" maxLength="254" name="email" value={form.email} onChange={update} autoComplete="email" placeholder="you@example.com" /></label>
            <label>Mobile number <small>(WhatsApp preferred)</small><input required type="tel" minLength="7" maxLength="30" name="mobile" value={form.mobile} onChange={update} autoComplete="tel" placeholder="+234 800 000 0000" /></label>
            <label>Preferred career track
              <select required name="track" value={form.track} onChange={update}>
                <option value="">Select a career track</option>
                {tracks.map(t => <option key={t}>{t}</option>)}
              </select>
            </label>
            {form.track && (
              <div className="modules-box">
                <strong>Core modules</strong>
                <span>{modules[form.track]}</span>
              </div>
            )}
            <label>Why are you interested? <small>(optional)</small>
              <textarea maxLength="1000" rows="4" name="comment" value={form.comment} onChange={update} placeholder="Tell us about your background and goals…" />
            </label>
            <label className="honeypot" aria-hidden="true">Company<input name="company" value={form.company} onChange={update} tabIndex="-1" autoComplete="off" /></label>
            <label className="consent-row">
              <input required type="checkbox" name="consent" checked={form.consent} onChange={update} />
              <span>I have read the <Link href="/privacy" target="_blank">Privacy Policy</Link> and consent to the processing of my application.</span>
            </label>
            <button type="submit" className="submit-btn" disabled={state.status === 'loading'}>
              {state.status === 'loading' ? 'Submitting securely…' : 'Reserve my scholarship slot →'}
            </button>
            {state.message && (
              <div role="status" className={state.status === 'success' ? 'msg-success' : 'msg-error'}>
                {state.status === 'success' ? '✅ ' : '⚠️ '}{state.message}
              </div>
            )}
          </form>
        </div>

        {/* Sidebar */}
        <aside className="apply-side">
          <div className="side-block">
            <h3>What selected learners receive</h3>
            <ul>
              {included.map(item => <li key={item}><span className="check">✓</span>{item}</li>)}
            </ul>
          </div>
          <div className="side-steps">
            <strong>How it works</strong>
            <div className="step"><span>1</span><p>Submit your interest on this page</p></div>
            <div className="step"><span>2</span><p>Shortlisted applicants are contacted</p></div>
            <div className="step"><span>3</span><p>Complete onboarding and start learning</p></div>
          </div>
          <p className="side-note">No payment is required to join the waitlist. TrustStack Academy will never ask for your password or card details in a scholarship message.</p>
        </aside>
      </div>
    </section>

    {/* ── FOOTER ─────────────────────────────────────────── */}
    <footer className="footer">
      <div className="footer-brand">
        <Link href="/" className="brand">
          <img src="/truststack-home-logo.png" alt="TrustStack Academy" style={{ width: "42px", height: "42px", objectFit: "contain", display: "block" }} />
          <strong>TrustStack Academy</strong>
        </Link>
        <p>Practical cybersecurity education for Africa.</p>
      </div>
      <div>
        <strong>Explore</strong>
        <Link href="/courses">Career tracks</Link>
        <Link href="/cdpo">Free CDPO lesson</Link>
        <Link href="/career-badges">Career badges</Link>
      </div>
      <div>
        <strong>Legal</strong>
        <Link href="/privacy">Privacy policy</Link>
        <Link href="/terms">Terms of use</Link>
        <a href="mailto:privacy@truststack.academy">Privacy contact</a>
      </div>
    </footer>

    <style jsx>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Alegreya Sans', system-ui, sans-serif; }
      html { scroll-behavior: smooth; }
      body { background: #04111f; color: #f1f5f9; }

      /* ── NAV ── */
      .nav {
        position: sticky; top: 0; z-index: 50;
        height: 72px; padding: 0 max(5vw, 24px);
        display: flex; align-items: center; justify-content: space-between;
        background: rgba(4, 17, 31, 0.92); backdrop-filter: blur(16px);
        border-bottom: 1px solid rgba(255,255,255,0.07);
      }
      .brand { display: flex; align-items: center; gap: 11px; text-decoration: none; color: #fff; font-size: 19px; font-weight: 900; }
      .brand img { width: 40px; height: 40px; object-fit: contain; }
      nav { display: flex; align-items: center; gap: 28px; }
      nav a { color: #94a3b8; text-decoration: none; font-weight: 700; font-size: 15px; transition: color .15s; }
      nav a:hover { color: #fff; }
      .nav-cta {
        background: linear-gradient(135deg, #09bfe6, #0ea5e9);
        color: #fff !important; padding: 10px 20px; border-radius: 999px; font-weight: 900 !important;
      }

      /* ── HERO ── */
      .hero {
        background:
          radial-gradient(ellipse at 75% 0%, rgba(9,191,230,0.22) 0%, transparent 55%),
          radial-gradient(ellipse at 10% 80%, rgba(99,102,241,0.12) 0%, transparent 50%),
          #04111f;
        padding: 100px max(7vw, 28px) 0;
      }
      .hero-grid { display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 70px; align-items: center; }
      .pill {
        display: inline-flex; align-items: center; gap: 8px;
        border: 1px solid rgba(9,191,230,0.4); color: #09bfe6;
        background: rgba(9,191,230,0.07);
        padding: 7px 14px; border-radius: 999px; font-size: 11px; font-weight: 900; letter-spacing: .14em;
      }
      h1 { font-size: clamp(50px, 6.5vw, 96px); line-height: .92; letter-spacing: -.04em; margin: 24px 0; color: #f8fafc; font-weight: 900; }
      h1 em { font-style: normal; background: linear-gradient(90deg, #09bfe6, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .hero-copy > p { font-size: 19px; line-height: 1.7; color: #94a3b8; max-width: 580px; }
      .hero-actions { display: flex; gap: 14px; margin-top: 36px; flex-wrap: wrap; }
      .btn-primary {
        display: inline-flex; align-items: center;
        background: linear-gradient(135deg, #09bfe6 0%, #0ea5e9 100%);
        color: #04111f; font-weight: 900; font-size: 16px;
        padding: 16px 28px; border-radius: 999px; text-decoration: none;
        box-shadow: 0 0 0 0 rgba(9,191,230,0.5); transition: box-shadow .2s, transform .15s;
      }
      .btn-primary:hover { box-shadow: 0 0 32px rgba(9,191,230,0.4); transform: translateY(-2px); }
      .btn-ghost {
        display: inline-flex; align-items: center;
        border: 1px solid rgba(255,255,255,0.15); color: #cbd5e1;
        font-weight: 700; font-size: 15px; padding: 16px 26px; border-radius: 999px; text-decoration: none; transition: border-color .2s, color .2s;
      }
      .btn-ghost:hover { border-color: rgba(255,255,255,0.35); color: #fff; }
      .hero-card {
        background: linear-gradient(155deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
        border: 1px solid rgba(255,255,255,0.1); border-radius: 28px;
        padding: 36px; backdrop-filter: blur(10px);
      }
      .hero-pct {
        display: block; font-size: 80px; font-weight: 900; line-height: 1;
        background: linear-gradient(135deg, #09bfe6, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .hero-card strong { display: block; font-size: 22px; margin: 12px 0 6px; color: #f1f5f9; }
      .hero-card > div > p { color: #94a3b8; font-size: 15px; }
      .hero-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
      .hero-tags span { border: 1px solid rgba(9,191,230,0.3); color: #67e8f9; background: rgba(9,191,230,0.06); border-radius: 999px; padding: 7px 12px; font-size: 12px; font-weight: 700; }
      .hero-strip {
        display: flex; gap: 24px; overflow: hidden; margin-top: 64px;
        padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.06);
        mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
      }
      .hero-strip span { white-space: nowrap; color: rgba(255,255,255,0.25); font-size: 13px; font-weight: 700; letter-spacing: .06em; }

      /* ── INTRO ── */
      .intro {
        max-width: 1200px; margin: auto; padding: 100px 28px;
        display: grid; grid-template-columns: .5fr 1.5fr; gap: 80px; align-items: start;
      }
      .intro-label { display: flex; align-items: center; gap: 12px; padding-top: 6px; }
      .label-line { width: 36px; height: 2px; background: linear-gradient(90deg, #09bfe6, #a78bfa); border-radius: 2px; }
      .intro-label span { font-size: 11px; font-weight: 900; letter-spacing: .2em; color: #09bfe6; white-space: nowrap; }
      .intro-body h2 { font-size: clamp(32px, 4vw, 52px); line-height: 1.06; margin-bottom: 24px; color: #f1f5f9; }
      .intro-body p { font-size: 17px; line-height: 1.8; color: #64748b; margin-bottom: 18px; }

      /* ── BENEFITS ── */
      .benefits {
        max-width: 1200px; margin: 0 auto 100px;
        padding: 0 28px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
      }
      .benefit-card {
        background: linear-gradient(155deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%);
        border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 36px;
        position: relative; overflow: hidden; transition: border-color .2s, transform .2s;
      }
      .benefit-card:hover { border-color: rgba(9,191,230,0.3); transform: translateY(-4px); }
      .benefit-num { position: absolute; top: 24px; right: 28px; font-size: 13px; font-weight: 900; color: rgba(255,255,255,0.12); letter-spacing: .1em; }
      .benefit-icon { font-size: 36px; margin-bottom: 20px; }
      .benefit-card h3 { font-size: 21px; font-weight: 900; margin-bottom: 12px; color: #f1f5f9; }
      .benefit-card p { font-size: 15px; line-height: 1.7; color: #64748b; }

      /* ── APPLY ── */
      .apply {
        background:
          radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 50%),
          rgba(255,255,255,0.015);
        border-top: 1px solid rgba(255,255,255,0.06);
        padding: 100px max(5vw, 28px);
      }
      .apply-inner { max-width: 1200px; margin: auto; display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 40px; align-items: start; }
      .form-card { background: #07192e; border: 1px solid rgba(255,255,255,0.1); border-radius: 28px; padding: 48px; box-shadow: 0 40px 100px rgba(0,0,0,0.4); }
      .form-header .secure-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 900; letter-spacing: .18em; color: #10b981; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); border-radius: 999px; padding: 6px 12px; margin-bottom: 16px; }
      .form-header h2 { font-size: 36px; font-weight: 900; color: #f1f5f9; margin-bottom: 10px; }
      .form-header p { font-size: 15px; color: #64748b; line-height: 1.6; }
      form { display: grid; gap: 20px; margin-top: 32px; }
      .two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      form label { font-size: 12px; font-weight: 900; letter-spacing: .1em; color: #94a3b8; display: grid; gap: 8px; }
      form small { font-weight: 500; color: #475569; letter-spacing: 0; }
      form input, form select, form textarea {
        font: inherit; font-size: 15px; font-weight: 500;
        color: #f1f5f9; padding: 14px 16px;
        background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px; outline: none; transition: border-color .15s, box-shadow .15s;
      }
      form input::placeholder, form textarea::placeholder { color: #475569; }
      form input:focus, form select:focus, form textarea:focus { border-color: #09bfe6; box-shadow: 0 0 0 3px rgba(9,191,230,0.15); }
      form select option { background: #07192e; }
      .modules-box { border-left: 3px solid #09bfe6; background: rgba(9,191,230,0.06); border-radius: 10px; padding: 14px 16px; display: grid; gap: 6px; }
      .modules-box strong { font-size: 11px; font-weight: 900; letter-spacing: .14em; color: #09bfe6; }
      .modules-box span { font-size: 14px; color: #94a3b8; line-height: 1.6; }
      .honeypot { position: absolute !important; left: -10000px !important; width: 1px; height: 1px; overflow: hidden; }
      .consent-row { display: flex !important; flex-direction: row !important; align-items: flex-start; gap: 12px; font-size: 14px; font-weight: 500; color: #94a3b8; letter-spacing: 0; }
      .consent-row input { margin-top: 3px; width: 17px; height: 17px; accent-color: #09bfe6; }
      .consent-row a { color: #09bfe6; }
      .submit-btn {
        border: 0; border-radius: 999px;
        background: linear-gradient(135deg, #09bfe6 0%, #0ea5e9 100%);
        color: #04111f; padding: 18px; font-weight: 900; font-size: 16px;
        cursor: pointer; transition: opacity .2s, transform .15s;
        letter-spacing: .02em;
      }
      .submit-btn:hover:not(:disabled) { opacity: .9; transform: translateY(-2px); }
      .submit-btn:disabled { opacity: .5; cursor: not-allowed; }
      .msg-success { background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); color: #34d399; padding: 16px; border-radius: 12px; font-weight: 700; font-size: 15px; line-height: 1.5; }
      .msg-error { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); color: #f87171; padding: 16px; border-radius: 12px; font-weight: 700; font-size: 15px; }

      /* ── SIDEBAR ── */
      .apply-side { display: flex; flex-direction: column; gap: 20px; }
      .side-block { background: linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 32px; }
      .side-block h3 { font-size: 22px; font-weight: 900; color: #f1f5f9; margin-bottom: 22px; }
      .side-block ul { list-style: none; display: grid; gap: 14px; }
      .side-block li { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: #94a3b8; line-height: 1.5; }
      .check { color: #10b981; font-weight: 900; font-size: 16px; flex-shrink: 0; margin-top: 1px; }
      .side-steps { background: rgba(9,191,230,0.04); border: 1px solid rgba(9,191,230,0.15); border-radius: 24px; padding: 28px; }
      .side-steps strong { display: block; font-size: 12px; font-weight: 900; letter-spacing: .18em; color: #09bfe6; margin-bottom: 20px; }
      .step { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 18px; }
      .step:last-child { margin-bottom: 0; }
      .step span { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: rgba(9,191,230,0.15); color: #09bfe6; font-size: 13px; font-weight: 900; flex-shrink: 0; }
      .step p { font-size: 14px; color: #94a3b8; line-height: 1.5; }
      .side-note { font-size: 13px; color: #475569; line-height: 1.7; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; }

      /* ── FOOTER ── */
      .footer {
        background: #030d1a; border-top: 1px solid rgba(255,255,255,0.06);
        padding: 60px max(7vw, 28px);
        display: grid; grid-template-columns: 1.5fr .5fr .5fr; gap: 50px;
      }
      .footer-brand { display: flex; flex-direction: column; gap: 12px; }
      .footer-brand .brand { color: #f1f5f9; }
      .footer-brand p { color: #475569; font-size: 14px; }
      .footer > div { display: flex; flex-direction: column; gap: 10px; }
      .footer > div > strong { font-size: 11px; letter-spacing: .15em; color: #475569; font-weight: 900; margin-bottom: 4px; }
      .footer > div > a, .footer > div > span { color: #64748b; text-decoration: none; font-size: 14px; transition: color .15s; }
      .footer > div > a:hover { color: #94a3b8; }

      /* ── RESPONSIVE ── */
      @media (max-width: 900px) {
        .hero-grid { grid-template-columns: 1fr; }
        .hero-card { max-width: 420px; }
        .intro { grid-template-columns: 1fr; gap: 24px; padding: 70px 20px; }
        .benefits { grid-template-columns: 1fr; padding: 0 20px 70px; }
        .apply-inner { grid-template-columns: 1fr; }
        .footer { grid-template-columns: 1fr; gap: 32px; }
      }
      @media (max-width: 640px) {
        .nav nav { display: none; }
        h1 { font-size: 46px; }
        .two { grid-template-columns: 1fr; }
        .hero { padding: 72px 20px 0; }
        .form-card { padding: 28px 20px; }
        .apply { padding: 60px 20px; }
        .hero-actions { flex-direction: column; }
        .btn-primary, .btn-ghost { width: 100%; justify-content: center; }
      }
    `}</style>
  </>;
}
