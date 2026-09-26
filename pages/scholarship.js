import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react';
import styles from '../styles/Scholarship.module.css';

const tracks = [
  'SOC Analyst', 'Digital Forensics', 'Threat Intelligence', 'Penetration Testing',
  'Cloud Security', 'Governance & GRC', 'Malware Analysis', 'Security Engineering'
];

const modules = {
  'SOC Analyst':'SIEM monitoring, incident triage, detection engineering and response reporting',
  'Digital Forensics':'Evidence handling, disk and memory analysis, timeline reconstruction and investigation reporting',
  'Threat Intelligence':'Threat research, indicator analysis, adversary profiling and intelligence reporting',
  'Penetration Testing':'Reconnaissance, vulnerability assessment, exploitation and professional reporting',
  'Cloud Security':'Cloud identity, secure configuration, monitoring and incident response',
  'Governance & GRC':'Risk assessment, policy, audit evidence, NDPA and ISO 27001 controls',
  'Malware Analysis':'Static analysis, behavioural analysis, sandboxing and indicator extraction',
  'Security Engineering':'Secure architecture, application security, automation and defensive tooling'
};

const emptyForm = {firstName:'', lastName:'', email:'', mobile:'', track:'', comment:'', consent:false, company:''};

export default function Scholarship(){
  const [form,setForm] = useState(emptyForm);
  const [state,setState] = useState({status:'idle',message:''});
  const update = (event) => setForm({...form,[event.target.name]:event.target.type === 'checkbox' ? event.target.checked : event.target.value});
  async function submit(event){
    event.preventDefault();
    setState({status:'loading',message:''});
    try{
      let response;
      try {
        response = await fetch('/api/scholarship/apply', {
          method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)
        });
      } catch (err) {
        response = await fetch('https://gifabmhvfxqleilpipsz.supabase.co/functions/v1/scholarship-waitlist', {
          method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)
        });
      }
      const result = await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(result.message || 'We could not submit your application. Please try again.');
      setForm(emptyForm);
      setState({status:'success',message:result.message || 'Your scholarship interest has been received.'});
    }catch(error){
      setState({status:'error',message:error.message});
    }
  }
  return <>
    <Head>
      <title>Early Bird Cybersecurity Scholarship | TrustStack Academy</title>
      <meta name="description" content="Join the TrustStack Academy Early Bird Scholarship waitlist for practical cybersecurity, data protection and digital compliance training in Africa."/>
      <link rel="canonical" href="https://truststack.academy/scholarship"/>
      <meta property="og:title" content="TrustStack Academy Early Bird Scholarship"/>
      <meta property="og:description" content="Apply for a fully funded place on one of eight practical cybersecurity career tracks."/>
      <meta property="og:url" content="https://truststack.academy/scholarship"/>
      <meta property="og:type" content="website"/>
    </Head>
    <div className={styles.page}>
      <header className={styles.header}><Link href="/home.html" className={styles.brand}><img src="/truststack-home-logo.png" alt="TrustStack Academy official logo"/><strong>TrustStack Academy</strong></Link><nav><Link href="/home.html">Home</Link><Link href="/courses-tracks.html">Career tracks</Link><Link href="/privacy">Privacy</Link></nav></header>
      <main>
        <section className={styles.hero}><div><span className={styles.eyebrow}>EARLY BIRD SCHOLARSHIP · 2026</span><h1>Build practical cyber skills.<br/><em>We’ll fund your start.</em></h1><p>Apply for a fully funded place on one of eight hands-on career tracks in digital trust, security and compliance.</p><a href="#waitlist" className={styles.cta}>Join the waitlist →</a></div><aside><b>100%</b><strong>Scholarship-funded tuition</strong><p>Selected learners pay no course fee.</p><div><span>8 career tracks</span><span>Practical labs</span><span>Verifiable certificate</span></div></aside></section>
        <section className={styles.intro}><div><span>PREPARING FOR LAUNCH</span><h2>A first cohort built for African talent</h2></div><div><p>TrustStack Academy is inviting early adopters to experience our practical learning model before the public launch. Selected applicants receive one career track free of charge, with guided labs, assessment and a verifiable completion certificate.</p><p>Places are limited. Selection considers application order, suitability and the information you provide. We will use your details only to assess your interest and send scholarship or onboarding updates.</p></div></section>
        <section className={styles.benefits}>{[['01','Choose your path','Select one of eight job-focused tracks.'],['02','Learn by doing','Complete practical, guided security labs.'],['03','Prove your skills','Earn a portfolio-ready, verifiable certificate.']].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</section>
        <section id="waitlist" className={styles.apply}>
          <div className={styles.formWrap}><span className={styles.eyebrow}>SECURE APPLICATION</span><h2>Join the scholarship waitlist</h2><p>Your submission is encrypted in transit, validated on the server and stored privately.</p>
            <form onSubmit={submit}>
              <div className={styles.two}><label>First name<input required minLength="2" maxLength="80" name="firstName" value={form.firstName} onChange={update} autoComplete="given-name"/></label><label>Last name<input required minLength="2" maxLength="80" name="lastName" value={form.lastName} onChange={update} autoComplete="family-name"/></label></div>
              <label>Email address<input required type="email" maxLength="254" name="email" value={form.email} onChange={update} autoComplete="email"/></label>
              <label>Mobile number <small>(WhatsApp preferred)</small><input required type="tel" minLength="7" maxLength="30" name="mobile" value={form.mobile} onChange={update} autoComplete="tel"/></label>
              <label>Preferred career track<select required name="track" value={form.track} onChange={update}><option value="">Select a career track</option>{tracks.map(track=><option key={track}>{track}</option>)}</select></label>
              {form.track && <div className={styles.modules}><strong>Core modules</strong><span>{modules[form.track]}</span></div>}
              <label>Why are you interested? <small>(optional)</small><textarea maxLength="1000" rows="4" name="comment" value={form.comment} onChange={update}/></label>
              <label className={styles.honeypot} aria-hidden="true">Company<input name="company" value={form.company} onChange={update} tabIndex="-1" autoComplete="off"/></label>
              <label className={styles.consent}><input required type="checkbox" name="consent" checked={form.consent} onChange={update}/><span>I have read the <Link href="/privacy" target="_blank">Privacy Policy</Link> and consent to the processing of my application.</span></label>
              <button disabled={state.status==='loading'}>{state.status==='loading'?'Submitting securely…':'Reserve my scholarship slot →'}</button>
              {state.message && <div role="status" className={state.status==='success'?styles.success:styles.error}>{state.message}</div>}
            </form>
          </div>
          <aside className={styles.side}><h3>What selected learners receive</h3><ul><li>Full tuition for one career track</li><li>Hands-on labs and assessments</li><li>Mentor-led learning support</li><li>Official verifiable certificate</li><li>Founding cohort community access</li></ul><div><strong>How it works</strong><p><b>1.</b> Submit your interest</p><p><b>2.</b> Shortlisted applicants are contacted</p><p><b>3.</b> Complete onboarding and start learning</p></div><small>No payment is required to join the waitlist. TrustStack Academy will never ask for your password or card details in a scholarship message.</small></aside>
        </section>
      </main>
      <footer><div><Link href="/home.html" className={styles.brand}><img src="/truststack-home-logo.png" alt=""/><strong>TrustStack Academy</strong></Link><p>Practical cybersecurity education for Africa.</p></div><div><strong>Explore</strong><Link href="/courses-tracks.html">Career tracks</Link><Link href="/cdpo">Free CDPO lesson</Link><Link href="/career-badges">Career badges</Link></div><div><strong>Legal</strong><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link><a href="mailto:privacy@truststack.academy">Privacy contact</a></div></footer>
    </div>
  </>;
}
