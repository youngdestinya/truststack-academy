import { useState } from 'react';
import AdminGate from '../components/AdminGate';
import { skillsForTrack } from '../lib/certificate-skills';
function CertificateContent() {
  const [form, setForm] = useState({ name: 'Chinedu Okoro', track: 'Ethical Hacking & Penetration Testing', date: '2026-09-15' });
  const [cert, setCert] = useState(null);
  const generate = () => {
    const hex = [...Array(8)].map(() => Math.floor(Math.random()*16).toString(16).toUpperCase()).join('');
    const id = `2026-${hex}`;
    const hash_full = [...Array(64)].map(() => Math.floor(Math.random()*16).toString(16)).join('');
    setCert({ id, hash_prefix: hex, hash_full, student: form.name, track: form.track, date_issued: form.date, tx: '0x' + hash_full, block: 78492011 + Math.floor(Math.random()*1000), verify_url: `https://truststack-academy.vercel.app/verify?id=${id}` });
  };
  return (
    <div style={{ fontFamily: 'Alegreya Sans', maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 36, fontWeight: 900 }}>Preview <span className="cert-italic">Certificate</span> Generator</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full Name" style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }} />
        <input value={form.track} onChange={e => setForm({...form, track: e.target.value})} placeholder="Track" style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }} />
        <input value={form.date} onChange={e => setForm({...form, date: e.target.value})} type="date" style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }} />
        <button onClick={generate} style={{ background: '#0a1931', color: '#fff', borderRadius: 8, fontWeight: 900 }}>Generate Preview (not issued)</button>
      </div>
      {cert && (
        <div style={{ marginTop: 32, border: '2px solid #0a1931', borderRadius: 16, padding: 32, position: 'relative', overflow: 'hidden', background: '#fff' }}>
          <img src="/Truststack_Logo_PNG.png" style={{ position: 'absolute', width: 600, opacity: 0.06, left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} alt="wm" />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <img src="/Truststack_Logo_PNG.png" width={80} alt="logo" />
              <img src="/Cert_Seal.png" width={180} height={180} style={{ objectFit: 'contain' }} alt="seal" />
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 900, marginTop: 24 }}>TRUSTSTACK ACADEMY</h2>
            <p style={{ fontSize: 18 }}><span className="cert-italic">Certificate</span> of Completion</p>
            <p style={{ fontSize: 32, fontWeight: 900, marginTop: 16 }}>{cert.student}</p>
            <p style={{ marginTop: 8 }}>{cert.track}</p>
            {skillsForTrack(cert.track).length > 0 && <div style={{ marginTop: 18, padding: 14, background: '#f1fafc', borderRadius: 10, textAlign: 'left' }}><strong>CORE SKILLS OBTAINED</strong><ul>{skillsForTrack(cert.track).map(skill => <li key={skill}>{skill}</li>)}</ul></div>}
            <p style={{ marginTop: 16, fontSize: 12 }}>ID: {cert.id} • {cert.date_issued} • HASH: {cert.hash_prefix}</p>
            <div style={{ marginTop: 24, paddingTop: 14, borderTop: '1px solid #ccd5df', textAlign: 'left' }}>
              <strong className="cert-signature">Destiny Young</strong><br />
              Founder and Chief Technology Architect, Truststack Academy and Educational Services Ltd<br />
              For: Truststack Academy
            </div>
            <p style={{ fontSize: 10, wordBreak: 'break-all', opacity: 0.6, marginTop: 8 }}>{cert.hash_full}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default function Certs(){return <AdminGate title="Certificate preview generator"><CertificateContent/></AdminGate>}
