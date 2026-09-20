import Link from 'next/link';
export default function Home() {
  const tracks = [
    { title: 'Ethical Hacking & Penetration Testing', desc: 'Master offensive security' },
    { title: 'SOC Analyst', desc: 'Defend 24/7 operations' },
    { title: 'Digital Forensics', desc: 'Investigate breaches' },
    { title: 'Cloud Security', desc: 'Secure AWS/Azure' },
    { title: 'GRC & Compliance', desc: 'Risk frameworks' },
    { title: 'Threat Intelligence', desc: 'Hunt APTs' },
    { title: 'Incident Response', desc: 'Contain & recover' },
    { title: 'Bundle: All Tracks', desc: '8 tracks + labs' },
  ];
  return (
    <div style={{ fontFamily: 'Alegreya Sans', background: '#fff', color: '#0a1931' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
        <img src="/Truststack_Logo_PNG.png" width={40} height={40} alt="logo" />
        <span style={{ fontWeight: 900, fontSize: 18, color: '#0a1931', letterSpacing: 0.5 }}>TRUSTSTACK ACADEMY</span>
        <span style={{ background: '#0a1931', color: '#fff', fontSize: 10, padding: '4px 8px', borderRadius: 999, marginLeft: 12 }}>VERCEL FREE $0</span>
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: 18, fontSize: 14 }}>
          <Link href="/">Home</Link><Link href="/courses">Courses</Link><Link href="/verify">Verify</Link><Link href="/pay">Pay</Link><Link href="/admin">Admin</Link>
          <Link href="/dashboard" style={{ background: '#D4A72C', color: '#0a1931', padding: '6px 14px', borderRadius: 999, fontWeight: 900 }}>Enter LMS</Link>
        </nav>
      </header>
      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 24px' }}>
        <h1 style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, maxWidth: 800 }}>Choose Your Track</h1>
        <p style={{ fontSize: 18, marginTop: 16, opacity: 0.8, maxWidth: 760 }}>8 tracks • ₦25k file-based verification ID 2026-9E43903F • Pure <span className="cert-italic">Certificate</span> italic only</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <Link href="/courses" style={{ background: '#0a1931', color: '#fff', padding: '12px 22px', borderRadius: 8, fontWeight: 700 }}>View Courses</Link>
          <Link href="/verify" style={{ border: '1px solid #0a1931', padding: '12px 22px', borderRadius: 8, fontWeight: 700 }}>Verify <span className="cert-italic">Certificate</span></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16, marginTop: 56 }}>
          {tracks.map(t => (
            <div key={t.title} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>{t.title}</div>
              <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}>{t.desc}</div>
              <div style={{ marginTop: 12, fontSize: 12 }}>6 Weeks • Intermediate • 12 Labs</div>
              <div style={{ marginTop: 12, fontWeight: 900 }}>₦25,000 <Link href="/pay" style={{ color: '#D4A72C', marginLeft: 8 }}>Enroll →</Link></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}