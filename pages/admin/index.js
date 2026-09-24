import { useState, useEffect } from 'react';
export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [key, setKey] = useState('');
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({ student: '', track: 'Ethical Hacking & Penetration Testing', date: '2026-09-15' });
  const [newCert, setNewCert] = useState(null);
  useEffect(() => { fetch('/certs.json').then(r => r.json()).then(j => setCerts(j.certificates || [])); fetch('/api/admin/session',{cache:'no-store'}).then(r=>setAuth(r.ok)).catch(()=>{}); }, []);
  const login=async()=>{
   try{const r=await fetch('/api/admin/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key})});if(r.ok){setKey('');setAuth(true);}else alert('Invalid admin key');}catch{alert('Login unavailable');}
  };
  const addLocal=async()=>{
   try{const r=await fetch('/api/certs/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({student:form.student,track:form.track,date_issued:form.date})});const j=await r.json();if(!r.ok)throw new Error(j.error);setNewCert(j.cert);}catch(e){alert(e.message);}
  };
  const pushGithub=async()=>{
   try{const r=await fetch('/api/admin/certs/github',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({student:form.student,track:form.track,date_issued:form.date})});const j=await r.json();if(!r.ok)throw new Error(j.error);setNewCert(j.cert);setCerts([...certs,j.cert]);alert(`Saved ${j.cert.id} to GitHub`);}catch(e){alert(e.message);}
  };
  if (!auth) return (
    <div style={{ fontFamily: 'Alegreya Sans', maxWidth: 360, margin: '80px auto', padding: 24, border: '1px solid #e5e7eb', borderRadius: 12 }}>
      <h2 style={{ fontWeight: 900 }}>Admin Login</h2>
      <input value={key} onChange={e => setKey(e.target.value)} placeholder="Admin key" type="password" style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8, width: '100%', marginTop: 12 }} />
      <button onClick={login} style={{ background: '#0a1931', color: '#fff', padding: '10px 16px', borderRadius: 8, width: '100%', marginTop: 12, fontWeight: 900 }}>Login</button>
    </div>
  );
  return (
    <div style={{ fontFamily: 'Alegreya Sans', padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 900 }}>Admin</h1>
      <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse', fontSize: 13 }}>
        <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}><th>ID</th><th>Student</th><th>Track</th><th>Date</th></tr></thead>
        <tbody>{certs.map(c => <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '8px 0', fontWeight: 700 }}>{c.id}</td><td>{c.student}</td><td>{c.track}</td><td>{c.date_issued}</td></tr>)}</tbody>
      </table>
      <div style={{ marginTop: 24, border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
        <h3 style={{ fontWeight: 900 }}>Add New — Auto ID 2026-HEX8</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px', gap: 8, marginTop: 12 }}>
          <input value={form.student} onChange={e => setForm({...form, student: e.target.value})} placeholder="Full Name" style={{ border: '1px solid #ccc', padding: 8, borderRadius: 8 }} />
          <select value={form.track} onChange={e => setForm({...form, track: e.target.value})} style={{ border: '1px solid #ccc', padding: 8, borderRadius: 8 }}>
            <option>Ethical Hacking & Penetration Testing</option><option>SOC Analyst</option><option>Digital Forensics</option><option>Cloud Security</option>
          </select>
          <input value={form.date} onChange={e => setForm({...form, date: e.target.value})} type="date" style={{ border: '1px solid #ccc', padding: 8, borderRadius: 8 }} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={addLocal} style={{ background: '#00C6FF', color: '#0a1931', padding: '8px 14px', borderRadius: 8, fontWeight: 900, fontSize: 12 }}>Generate Preview</button>
          <button onClick={pushGithub} style={{ background: '#10b981', color: '#fff', padding: '8px 14px', borderRadius: 8, fontWeight: 900, fontSize: 12 }}>Generate & Save to GitHub</button>
        </div>
        {newCert && (
          <div style={{ marginTop: 20, border: '1px solid #0a1931', borderRadius: 12, padding: 16, position: 'relative', overflow: 'hidden', background: '#fff' }}>
            <img src="/Truststack_Logo_PNG.png" style={{ position: 'absolute', width: 400, opacity: 0.06, left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} alt="wm" />
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ fontWeight: 900 }}>TRUSTSTACK ACADEMY — <span className="cert-italic">Certificate</span></div>
              <div style={{ fontSize: 20, fontWeight: 900, marginTop: 8 }}>{newCert.student}</div>
              <div style={{ fontSize: 12 }}>{newCert.track} • {newCert.id}</div>
              <img src="/Cert_Seal.png" width={80} style={{ marginTop: 8 }} alt="seal" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
