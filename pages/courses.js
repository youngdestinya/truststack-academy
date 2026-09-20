import Link from 'next/link';
export default function Courses() {
  const courses = [
    { id: 1, title: 'Ethical Hacking & Penetration Testing', desc: 'Offensive security, Burp, Metasploit', meta: '6 Weeks • Intermediate • 12 Labs' },
    { id: 2, title: 'SOC Analyst', desc: 'SIEM, Splunk, Incident triage', meta: '6 Weeks • Intermediate • 12 Labs' },
    { id: 3, title: 'Digital Forensics', desc: 'Memory, disk, chain of custody', meta: '6 Weeks • Intermediate • 12 Labs' },
    { id: 4, title: 'Cloud Security', desc: 'IAM, misconfigurations, CNAPP', meta: '6 Weeks • Intermediate • 12 Labs' },
    { id: 5, title: 'GRC & Compliance', desc: 'ISO 27001, NIST, SOC2', meta: '6 Weeks • Intermediate • 12 Labs' },
    { id: 6, title: 'Threat Intelligence', desc: 'OSINT, MISP, ATT&CK', meta: '6 Weeks • Intermediate • 12 Labs' },
    { id: 7, title: 'Incident Response', desc: 'Containment, eradication, lessons', meta: '6 Weeks • Intermediate • 12 Labs' },
    { id: 8, title: 'Bundle: All 8 Tracks', desc: 'Full academy access + certificate bundle', meta: '12 Weeks • Advanced • 96 Labs' },
  ];
  return (
    <div style={{ fontFamily: 'Alegreya Sans', padding: 24 }}>
      <h1 style={{ fontSize: 48, fontWeight: 900 }}>Courses — 8 Tracks • ₦25k each</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16, marginTop: 32 }}>
        {courses.map(c => (
          <div key={c.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 900 }}>{c.title}</div>
            <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}>{c.desc}</div>
            <div style={{ fontSize: 12, marginTop: 8 }}>{c.meta}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, alignItems: 'center' }}>
              <span style={{ fontWeight: 900 }}>₦25,000</span>
              <Link href="/pay" style={{ background: '#D4A72C', padding: '6px 12px', borderRadius: 999, fontWeight: 700, fontSize: 12 }}>Enroll</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}