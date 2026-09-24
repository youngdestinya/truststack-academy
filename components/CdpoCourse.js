import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Cdpo.module.css';

const base = 'https://truststack.academy';
const actUrl = 'https://ndpc.gov.ng/download/nigeria-data-protection-act-2023/';
const gaidUrl = 'https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf';
const dayUrl = (day) => day === 1 ? '/cdpo' : `/cdpo/day/${day}`;

function RichBlocks({ blocks }) {
  return blocks.map((block, index) => {
    if (block.type === 'table') {
      if (block.rows.length === 1 && block.rows[0].length === 1) {
        return <div className={styles.callout} key={index}>{block.rows[0][0]}</div>;
      }
      return <div className={styles.tableScroll} key={index}><table><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => rowIndex === 0 ? <th key={cellIndex} scope="col">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
    }
    const text = block.text;
    switch (block.style) {
      case 'Heading 1': return <h2 className={styles.sectionTitle} key={index}>{text}</h2>;
      case 'Heading 2': return <h3 className={styles.subTitle} key={index}>{text}</h3>;
      case 'Answer Text': return <details className={styles.answer} key={index}><summary>Show model response</summary><p>{text}</p></details>;
      case 'List Bullet': return <p className={styles.bullet} key={index}>{text}</p>;
      case 'List Bullet 2': return <p className={styles.option} key={index}>{text}</p>;
      case 'List Number': return <p className={styles.number} key={index}>{text}</p>;
      case 'Source Note': return <p className={styles.sourceNote} key={index}>{text}</p>;
      default: return <p className={styles.paragraph} key={index}>{text}</p>;
    }
  });
}

function ExamBlocks({ blocks }) {
  const answerStart = blocks.findIndex((block) => block.type === 'text' && block.text === 'Mock Examination Answer Framework');
  const evaluationStart = blocks.findIndex((block, index) => index > answerStart && block.type === 'text' && block.text === 'Final Evaluation Record');
  if (answerStart < 0) return <RichBlocks blocks={blocks} />;
  return <><RichBlocks blocks={blocks.slice(0, answerStart)} /><details className={styles.examAnswers}><summary>Reveal the examination answer framework</summary><RichBlocks blocks={blocks.slice(answerStart + 1, evaluationStart < 0 ? undefined : evaluationStart)} /></details>{evaluationStart >= 0 && <RichBlocks blocks={blocks.slice(evaluationStart)} />}</>;
}

export default function CdpoCourse({ index, lesson, intro, sources, isHome = false, isExam = false }) {
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    try { setCompleted(JSON.parse(localStorage.getItem('truststack-cdpo-completed') || '[]')); } catch { setCompleted([]); }
  }, []);
  const day = lesson.day;
  const current = isExam ? '/cdpo/exam' : dayUrl(day);
  const title = isExam
    ? 'Free CDPO Practice Exam | Nigeria Data Protection Act | TrustStack Academy'
    : isHome
      ? 'Free CDPO Course: 30-Day Nigeria Data Protection Act Study | TrustStack Academy'
      : `Day ${day}: ${lesson.title} | Free CDPO Course | TrustStack Academy`;
  const description = isExam
    ? 'Practice with the final mock examination from the free 30-day CDPO study programme covering the Nigeria Data Protection Act 2023.'
    : isHome
      ? 'Study Nigeria data protection for free with 30 full CDPO lessons, diagnostics, model answers, scenarios, practical tasks and a final mock exam.'
      : `Free CDPO study lesson ${day}: ${lesson.title}. Read the complete lesson, test yourself, review model responses and apply Nigeria data protection concepts.`;
  const schema = isHome ? {
    '@context': 'https://schema.org', '@type': 'Course', name: 'Free 30-Day CDPO Study Programme',
    description, url: `${base}/cdpo`, inLanguage: 'en-NG', isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: 'TrustStack Academy', url: base },
    educationalLevel: 'Professional', about: { '@type': 'Thing', name: 'Nigeria Data Protection Act 2023' },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: '30 self-paced study days' },
    syllabusSections: index.map((item) => ({ '@type': 'Syllabus', name: `Day ${item.day}: ${item.title}` })),
  } : {
    '@context': 'https://schema.org', '@type': 'LearningResource', name: isExam ? 'CDPO Final Mock Examination' : `CDPO Day ${day}: ${lesson.title}`,
    description, url: `${base}${current}`, inLanguage: 'en-NG', isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: 'TrustStack Academy', url: base },
    isPartOf: { '@type': 'Course', name: 'Free 30-Day CDPO Study Programme', url: `${base}/cdpo` },
  };
  const breadcrumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/home.html` },
    { '@type': 'ListItem', position: 2, name: 'CDPO Course', item: `${base}/cdpo` },
    ...(!isHome ? [{ '@type': 'ListItem', position: 3, name: isExam ? 'Practice Exam' : `Day ${day}`, item: `${base}${current}` }] : []),
  ] };
  function toggleComplete() {
    const next = completed.includes(day) ? completed.filter((value) => value !== day) : [...completed, day];
    setCompleted(next);
    try { localStorage.setItem('truststack-cdpo-completed', JSON.stringify(next)); } catch { /* Private browsing can block storage. */ }
  }
  return <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <meta name="keywords" content="free CDPO course, data protection officer Nigeria, Nigeria Data Protection Act 2023, NDPA study, privacy compliance training" />
      <link rel="canonical" href={`${base}${current}`} />
      <meta property="og:type" content={isHome ? 'website' : 'article'} />
      <meta property="og:site_name" content="TrustStack Academy" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${base}${current}`} />
      <meta property="og:image" content={`${base}/cdpo-og.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Free 30-day CDPO study programme from TrustStack Academy" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${base}/cdpo-og.png`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\\u003c') }} />
    </Head>
    <div className={styles.page}>
      <header className={styles.header}><div className={styles.headerInner}>
        <Link className={styles.brand} href="/home.html"><img src="/truststack-home-logo.png" alt="TrustStack Academy official logo" /><span>TrustStack Academy</span></Link>
        <nav aria-label="Main navigation"><Link href="/home.html">Home</Link><Link href="/courses">Career tracks</Link><Link href="/lms">LMS</Link><Link className={styles.activeNav} href="/cdpo">Free CDPO course</Link></nav>
      </div></header>
      <section className={styles.hero}><div className={styles.heroInner}>
        <div><span className={styles.eyebrow}>FREE LEARNING PATH · DATA PROTECTION</span><h1>{isExam ? 'Test your CDPO knowledge' : isHome ? 'Become a stronger data protection professional.' : `Day ${day}: ${lesson.title}`}</h1>
          <p>{isExam ? 'Use this practice examination to check your understanding across the programme.' : 'A complete 30-day study path through the Nigeria Data Protection Act—practical lessons, scenarios and self-checks, open to everyone.'}</p>
          <div className={styles.heroActions}><a href="#lesson" className={styles.primaryButton}>{isExam ? 'Open practice exam' : 'Read the lesson'} <span aria-hidden="true">→</span></a><a href={actUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>Read the Act ↗</a></div>
        </div><div className={styles.heroVisual}><img className={styles.courseBadge} src="/cdpo-badge.svg" alt="TrustStack Academy CDPO study badge: free 30-day data protection learning path" /><span className={styles.badgeCaption}>A study-path badge, not a professional certification</span></div>
      </div></section>
      <div className={styles.stats}><div><strong>30</strong><span>complete study days</span></div><div><strong>Free</strong><span>no sign-in or payment</span></div><div><strong>Practice</strong><span>diagnostics and model answers</span></div><div><strong>Self-paced</strong><span>progress saved in this browser</span></div></div>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Course contents"><div className={styles.sidebarHead}><span>YOUR LEARNING MAP</span><strong>{completed.length} / 30 days marked complete</strong><div className={styles.progress}><span style={{ width: `${completed.length / 30 * 100}%` }} /></div></div>
          <div className={styles.mobileSelect}><label htmlFor="cdpo-day">Jump to lesson</label><select id="cdpo-day" value={current} onChange={(event) => { window.location.href = event.target.value; }}>{index.map((item) => <option key={item.day} value={dayUrl(item.day)}>{`Day ${item.day}: ${item.title}`}</option>)}<option value="/cdpo/exam">Final practice exam</option></select></div>
          <ol className={styles.dayList}>{index.map((item) => <li key={item.day}><Link href={dayUrl(item.day)} className={!isExam && item.day === day ? styles.selectedDay : ''} aria-current={!isExam && item.day === day ? 'page' : undefined}><span className={styles.dayNumber}>{String(item.day).padStart(2, '0')}</span><span>{item.title}</span>{completed.includes(item.day) && <span className={styles.check} aria-label="Completed">✓</span>}</Link></li>)}</ol>
          <Link href="/cdpo/exam" className={`${styles.examLink} ${isExam ? styles.selectedDay : ''}`}>Final practice exam <span>↗</span></Link>
        </aside>
        <main className={styles.main} id="lesson">
          {isHome && <div className={styles.intro}><span className={styles.overline}>ABOUT THIS FREE COURSE</span><h2>Learn the law. Practise the decisions.</h2><p>This free course adapts the supplied 30-day CDPO tutor handbook into a readable, interactive learning path. Work through each day, try the questions before revealing the model responses, and apply the ideas to realistic Nigerian workplace scenarios.</p><details><summary>How to use the handbook and view the full roadmap</summary><RichBlocks blocks={intro.blocks} /></details></div>}
          <div className={styles.lessonHead}><div><span className={styles.overline}>{isExam ? 'FINAL ASSESSMENT' : `LESSON ${String(day).padStart(2, '0')} OF 30`}</span><h2>{isExam ? lesson.title : lesson.title}</h2><p>{isExam ? 'Complete the questions before consulting the answer framework.' : 'Read the assigned provisions, attempt the diagnostics, then compare your reasoning with the model responses.'}</p></div>{!isExam && <button className={completed.includes(day) ? styles.completeDone : styles.completeButton} onClick={toggleComplete}>{completed.includes(day) ? '✓ Marked complete' : 'Mark day complete'}</button>}</div>
          <article className={styles.lessonBody}>{isExam ? <ExamBlocks blocks={lesson.blocks} /> : <RichBlocks blocks={lesson.blocks} />}</article>
          {isExam && sources && <section className={styles.sources}><h2>Source register</h2><RichBlocks blocks={sources.blocks} /></section>}
          <div className={styles.lessonNav}>{day > 1 && !isExam ? <Link href={dayUrl(day - 1)}>← Day {day - 1}</Link> : <span />}{isExam ? <Link href="/cdpo">Back to course overview →</Link> : <Link href={day < 30 ? dayUrl(day + 1) : '/cdpo/exam'}>{day < 30 ? `Day ${day + 1}` : 'Final practice exam'} →</Link>}</div>
        </main>
      </div>
      <footer className={styles.footer}><div><Link className={styles.footerBrand} href="/home.html"><img src="/truststack-home-logo.png" alt="" />TrustStack Academy</Link><p>Free, practical data-protection learning for Nigeria. This independent study aid is not an NDPC-issued qualification or legal advice. Check current official sources before relying on any legal detail.</p></div><div><strong>Keep learning</strong><Link href="/cdpo">Course overview</Link><Link href="/cdpo/exam">Practice exam</Link><Link href="/courses">Career tracks</Link></div><div><strong>Primary sources</strong><a href={actUrl} target="_blank" rel="noopener noreferrer">Nigeria Data Protection Act 2023 ↗</a><a href={gaidUrl} target="_blank" rel="noopener noreferrer">NDPC GAID 2025 ↗</a><Link href="/home.html#contact">Contact TrustStack</Link></div></footer>
    </div>
  </>;
}
