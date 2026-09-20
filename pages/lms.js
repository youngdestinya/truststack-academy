import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/lms.module.css';

const modules = [
  ['01', 'Network foundations', '6 lessons • 4 labs', 100],
  ['02', 'Traffic analysis with Wireshark', '8 lessons • 5 labs', 72],
  ['03', 'Firewalls and network controls', '7 lessons • 4 labs', 18],
  ['04', 'Intrusion detection and response', '9 lessons • 6 labs', 0],
];
const tracks = [
  ['◎', 'SOC Analyst', '42 lessons', '#20d5ef'],
  ['◇', 'Cloud Security', '38 lessons', '#8ee84f'],
  ['⌁', 'Digital Forensics', '34 lessons', '#ffc857'],
];

export default function Lms() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(1);
  return <>
    <Head><title>My Learning | TrustStack Academy</title></Head>
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${menu ? styles.open : ''}`}>
        <div className={styles.brand}><img src="/Truststack_Logo_PNG.png" alt=""/><div><b>TrustStack</b><span>ACADEMY</span></div></div>
        <nav>
          <small>LEARNING</small>
          <a className={styles.selected} href="#overview">⌂ <span>Overview</span></a>
          <a href="#course">▷ <span>My course</span></a>
          <a href="#tracks">▦ <span>Explore tracks</span></a>
          <Link href="/certificates">♢ <span>Certificates</span></Link>
          <small>ACCOUNT</small>
          <Link href="/verify">✓ <span>Verify credential</span></Link>
          <Link href="/">↗ <span>Main website</span></Link>
        </nav>
        <div className={styles.help}><small>NEED SUPPORT?</small><b>We’re here to help.</b><button>Contact learning support</button></div>
      </aside>
      {menu && <button className={styles.backdrop} onClick={()=>setMenu(false)} aria-label="Close navigation"/>}

      <main className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.menu} onClick={()=>setMenu(true)}>☰</button>
          <div className={styles.search}>⌕ <span>Search courses, lessons and labs</span><kbd>⌘ K</kbd></div>
          <div className={styles.profile}><button>♢<i/></button><div className={styles.avatar}>DY</div><p><b>Destiny Young</b><small>LEARNER</small></p></div>
        </header>

        <div className={styles.content} id="overview">
          <section className={styles.welcome}>
            <div><small className={styles.eyebrow}>SATURDAY, 20 SEPTEMBER</small><h1>Welcome back, Destiny.</h1><p>You’re building real defensive security skills. Keep the momentum going.</p></div>
            <div className={styles.streak}>⚡ <p><b>7 day streak</b><small>Your longest is 12 days</small></p></div>
          </section>

          <section className={styles.stats}>
            <article><small>COURSE PROGRESS</small><b>48%</b><div><i style={{width:'48%'}}/></div><p>24 of 50 lessons complete</p></article>
            <article><small>HANDS-ON LABS</small><b>18</b><p>12 completed • 6 remaining</p></article>
            <article><small>LEARNING TIME</small><b>32h</b><p>4h 20m this week</p></article>
            <article><small>SKILL SCORE</small><b className={styles.cyan}>742</b><p>↑ 68 points this month</p></article>
          </section>

          <div className={styles.layout}>
            <section className={styles.primary}>
              <div className={styles.heading} id="course"><div><small className={styles.eyebrow}>CURRENT COURSE</small><h2>Network Security & Defense</h2></div><Link href="/courses">Course details ↗</Link></div>
              <article className={styles.continue}>
                <div className={styles.visual}><div><img src="/Truststack_Logo_PNG.png" alt=""/></div><small>MODULE 02</small></div>
                <div className={styles.courseCopy}><small>LESSON 6 OF 8</small><h3>Analysing suspicious traffic with Wireshark</h3><p>Follow TCP streams, identify anomalous packets and extract indicators of compromise from a real capture.</p><div className={styles.progress}><span><i style={{width:'72%'}}/></span><b>72%</b></div><button>Continue lesson <b>→</b></button></div>
              </article>
              <div className={styles.modules}>{modules.map((m,i)=><button key={m[0]} className={active===i?styles.moduleActive:''} onClick={()=>setActive(i)}><i>{m[3]===100?'✓':m[0]}</i><span><b>{m[1]}</b><small>{m[2]}</small></span><em>{m[3]}%</em><strong>›</strong></button>)}</div>

              <div className={styles.heading} id="tracks"><div><small className={styles.eyebrow}>NEXT SKILLS</small><h2>Recommended tracks</h2></div><Link href="/courses">View all tracks →</Link></div>
              <div className={styles.tracks}>{tracks.map(t=><article key={t[1]} style={{'--accent':t[3]}}><i>{t[0]}</i><h3>{t[1]}</h3><p>{t[2]} • Practical labs</p><Link href="/courses">Explore track →</Link></article>)}</div>
            </section>

            <aside className={styles.rail}>
              <article><div className={styles.railTitle}><h3>Coming up</h3><span>•••</span></div><div className={styles.event}><b>23<small>SEP</small></b><p><strong>Live lab: Packet analysis</strong><span>Tuesday • 6:00 PM WAT</span></p></div><div className={styles.event}><b>27<small>SEP</small></b><p><strong>Module assessment</strong><span>Saturday • Self-paced</span></p></div><button className={styles.textButton}>View learning calendar</button></article>
              <article className={styles.certCard}><div className={styles.certLabel}><span>CERTIFICATE PATH</span><b>48%</b></div><div className={styles.cert}><img src="/Truststack_Logo_PNG.png" alt=""/><small>TRUSTSTACK ACADEMY</small><strong className="cert-italic">Certificate</strong><span>OF COMPLETION</span><i/><p>NETWORK SECURITY</p></div><h3>Your credential is taking shape.</h3><p>Complete the remaining modules and final assessment to unlock your verifiable certificate.</p><Link href="/certificates">View certificate centre →</Link></article>
              <article className={styles.community}><small>COMMUNITY</small><h3>Learn alongside 1,248 defenders.</h3><p>Share lab notes, ask questions and join this week’s challenge.</p><button>Open learner community ↗</button></article>
            </aside>
          </div>
        </div>
      </main>
    </div>
  </>;
}
