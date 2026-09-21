import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function KnowledgeBase() {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    fetch('/api/articles').then((response) => response.json()).then((data) => {
      const items = data.articles || [];
      setArticles(items);
      const slug = new URLSearchParams(window.location.search).get('article');
      if (slug) setSelected(items.find((article) => article.slug === slug) || null);
    }).catch(() => setArticles([]));
  }, []);
  const choose = (article) => {
    setSelected(article);
    history.replaceState(null, '', `/knowledge-base?article=${article.slug}`);
    scrollTo(0, 0);
  };
  const close = () => { setSelected(null); history.replaceState(null, '', '/knowledge-base'); };
  const related = selected ? articles.filter((article) => article.id !== selected.id).slice(0, 2) : [];
  const origin = 'https://truststack-academy.vercel.app';
  return <>
    <Head>
      <title>{selected ? `${selected.seoTitle || selected.title} | TrustStack Field Notes` : 'Knowledge Base | TrustStack Academy'}</title>
      <meta name="description" content={selected?.metaDescription || selected?.excerpt || 'Practical cybersecurity guides, SOC playbooks, NDPA explainers and African fintech threat briefs.'}/>
      {selected?.canonical && <link rel="canonical" href={selected.canonical}/>}
      {selected?.noindex && <meta name="robots" content={`${selected.noindex ? 'noindex' : 'index'},${selected.nofollow ? 'nofollow' : 'follow'}`}/>}
      {selected && <>
        <meta property="og:title" content={selected.ogTitle || selected.title}/>
        <meta property="og:description" content={selected.ogDescription || selected.excerpt}/>
        <meta property="og:type" content="article"/>
        {selected.image && <meta property="og:image" content={`${origin}${selected.image}`}/>}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': selected.schemaType || 'Article', headline: selected.title, description: selected.metaDescription || selected.excerpt, image: selected.image ? `${origin}${selected.image}` : undefined, author: { '@type': 'Person', name: selected.author || 'TrustStack Team' }, publisher: { '@type': 'Organization', name: 'TrustStack Academy' } }) }}/>
      </>}
    </Head>
    <div className="top"/>
    <header><a href="/home.html" className="brand"><img src="/truststack-home-logo.png" alt="TrustStack Academy logo"/>TrustStack Academy</a><nav><a href="/home.html">Home</a><a href="/courses">Courses</a><a href="/lms">LMS</a><a href="/verify">Verify Certificate</a></nav></header>
    {selected ? <main className="detail">
      <button className="back" onClick={close}>← All Field Notes</button>
      <article className="story"><span className="tag">{selected.category || 'Field Notes'}</span><h1>{selected.title}</h1><div className="byline">{selected.author || 'TrustStack Team'} · {selected.readTime || 'Practical guide'}</div>{selected.image && <img src={selected.image} alt={selected.imageAlt || selected.title}/>}<p className="intro">{selected.excerpt}</p><div className="copy" dangerouslySetInnerHTML={{ __html: selected.content || `<p>${selected.excerpt}</p>` }}/></article>
      <aside className="related"><h2>Related articles</h2><div>{related.map((article, index) => <button key={article.id} onClick={() => choose(article)} style={{ '--tint': article.color || ['#dff4fb','#fff0e5'][index] }}><span>{article.category}</span><strong>{article.title}</strong><small>{article.readTime || 'Practical guide'} →</small></button>)}</div></aside>
    </main> : <main><div className="introRow"><div><p className="eyebrow">FIELD NOTES</p><h1>Knowledge Base</h1><p className="lead">Practical guides from our team. SOC playbooks, NDPA breakdowns, and fintech threat briefs.</p></div><span>Research · Playbooks · Analysis</span></div><section className="grid">{articles.map((article, index) => <article key={article.id} className="card" onClick={() => choose(article)} style={{ '--tint': article.color || ['#dff4fb','#fff0e5','#f3e4ff'][index % 3] }}><div className="cover">{['🛡','🧪','☁'][index % 3]}<span>{article.category || 'Field Notes'}</span></div><div className="body"><h2>{article.title}</h2><p>{article.excerpt}</p><div>{article.author || 'TrustStack Team'} · {article.readTime || 'Practical guide'} <b>↗</b></div></div></article>)}</section></main>}
    <footer><a href="/home.html">TrustStack Academy</a><span>Practical cybersecurity knowledge for Africa.</span><div><a href="/courses">Courses</a><a href="/verify">Verify</a><a href="/privacy">Privacy</a></div></footer>
    <style jsx>{styles}</style>
  </>;
}

const styles = `*{box-sizing:border-box}.top{height:6px;background:linear-gradient(90deg,#00c6ff,#70ef78,#c8fa00)}header{height:78px;padding:0 max(24px,calc((100% - 1200px)/2));display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e5eaf0}.brand{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:900;color:#0a1931;text-decoration:none}.brand img{width:43px;height:43px}nav{display:flex;gap:25px}nav a{color:#526176;text-decoration:none;font-weight:700}main{max-width:1200px;margin:auto;padding:70px 24px 95px}.introRow{display:flex;justify-content:space-between;align-items:end}.eyebrow,.tag{color:#00aee5;font-weight:900;letter-spacing:.22em}.introRow h1,.story h1{font-size:56px;line-height:1;margin:12px 0;color:#0a1931}.lead{font-size:19px;color:#657186;max-width:620px;line-height:1.5}.introRow>span{font-weight:800;color:#7c8797}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:45px}.card{border:1px solid #dce3e9;border-radius:22px;overflow:hidden;background:#fff;min-height:390px;cursor:pointer;display:flex;flex-direction:column}.cover{height:92px;background:var(--tint);padding:24px;font-size:25px;display:flex;justify-content:space-between;align-items:center}.cover span{font-size:10px;font-weight:900;background:#ffffff88;border-radius:999px;padding:7px 11px;text-transform:uppercase}.body{padding:24px;display:flex;flex:1;flex-direction:column}.body h2{font-size:21px;line-height:1.12}.body p{color:#6b7483;line-height:1.6}.body div{margin-top:auto;color:#8791a0;font-size:13px}.body b{float:right}.detail{max-width:900px}.back{border:0;background:none;font-weight:900;color:#087fa8;cursor:pointer}.story{margin-top:26px}.byline{color:#7a8697;margin:18px 0 28px}.story>img{width:100%;max-height:430px;object-fit:cover;border-radius:20px}.story .intro{font-size:22px;line-height:1.5;color:#43536a}.copy{font-size:18px;line-height:1.75;color:#425066}.copy h2{font-size:30px;color:#0a1931}.copy a{color:#087fa8}.related{margin-top:60px;border-top:1px solid #dce3e9;padding-top:28px}.related>div{display:grid;grid-template-columns:1fr 1fr;gap:18px}.related button{text-align:left;border:1px solid #dce3e9;border-radius:17px;background:linear-gradient(145deg,var(--tint),#fff);padding:22px;cursor:pointer}.related button>*{display:block}.related button span{font-size:10px;font-weight:900;text-transform:uppercase}.related button strong{font-size:17px;margin:10px 0}.related button small{color:#667085}footer{background:#0a1931;color:#fff;padding:30px max(24px,calc((100% - 1200px)/2));display:flex;justify-content:space-between;gap:20px}footer a{color:#fff;text-decoration:none;font-weight:800}footer div{display:flex;gap:20px}@media(max-width:800px){nav{display:none}.grid{grid-template-columns:1fr}.introRow{display:block}.related>div{grid-template-columns:1fr}footer{flex-direction:column}.introRow h1,.story h1{font-size:42px}}`;
