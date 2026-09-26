import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/PortalLogin.module.css';

export default function LearnerLogin() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/learner/session', { cache: 'no-store' })
      .then(response => { if (response.ok) location.replace('/dashboard'); })
      .catch(() => {});
  }, []);

  const submit = async event => {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/learner/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to sign in.');
      location.assign(data.destination || '/dashboard');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  return <>
    <Head>
      <title>Learner Login | TrustStack Academy</title>
      <meta name="description" content="Secure learner login for TrustStack Academy course dashboards, practical labs, progress and credentials." />
      <meta name="robots" content="noindex,nofollow" />
    </Head>
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.story}>
          <a className={styles.brand} href="/"><img src="/truststack-home-logo.png" alt="TrustStack Academy" /><span>TrustStack Academy</span></a>
          <div className={styles.eyebrow}>SECURE LEARNER ACCESS</div>
          <h1>Your learning. Your evidence. Your future.</h1>
          <p>Continue your practical cybersecurity track, manage lab progress and access your verifiable learner record from one protected workspace.</p>
          <div className={styles.trust}><span>8 CAREER TRACKS</span><span>REAL LABS</span><span>VERIFIABLE PROGRESS</span></div>
        </section>
        <section className={styles.panel}>
          <small>LEARNER PORTAL</small>
          <h2>Welcome back.</h2>
          <p className={styles.intro}>Enter the Learner ID and email used for your enrollment.</p>
          <form onSubmit={submit}>
            <label className={styles.field}><span>LEARNER ID</span><input value={id} onChange={event => setId(event.target.value.toUpperCase())} placeholder="TSA-2026-04F82A" autoComplete="username" required /></label>
            <label className={styles.field}><span>REGISTERED EMAIL</span><input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
            <button className={styles.submit} style={{ display: 'block', marginInline: 'auto' }} disabled={busy}>{busy ? 'Verifying securely…' : 'Enter my dashboard →'}</button>
          </form>
          {message && <div className={styles.notice}>{message}</div>}
          <div className={styles.help}>Older account or missing access? Contact <a href="mailto:helpdesk@truststack.academy?subject=Learner%20portal%20access">helpdesk@truststack.academy</a> for a one-time account update.</div>
          <a className={styles.back} href="/">← Return to TrustStack Academy</a>
        </section>
      </div>
    </main>
  </>;
}
