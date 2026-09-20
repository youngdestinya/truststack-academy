import { useState, useEffect } from 'react';
export default function Pay() {
  const [form, setForm] = useState({ email: '', name: '', track: 'Ethical Hacking & Penetration Testing' });
  const [status, setStatus] = useState('');
  useEffect(()=>{
    const reference=new URLSearchParams(window.location.search).get('reference');
    if(reference){
      setStatus('Verifying payment...');
      fetch('/api/paystack/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({reference})}).then(r=>r.json()).then(j=>setStatus(j.valid ? `Payment verified. Certificate ID: ${j.id}` : j.error)).catch(()=>setStatus('Verification unavailable. Refresh to retry.'));
    }
  },[]);
  const pay=async()=>{
    setStatus('Opening secure checkout...');
    try{
      const r=await fetch('/api/paystack/initialize',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
      const j=await r.json();if(j.url)window.location.assign(j.url);else setStatus(j.error);
    }catch{setStatus('Checkout unavailable. Please try again.');}
  };
  return (
    <div style={{ fontFamily: 'Alegreya Sans', maxWidth: 520, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 36, fontWeight: 900 }}>Pay ₦25k — Secure Checkout</h1>
      <p style={{ opacity: 0.7, fontSize: 14, marginTop: 8 }}>Paystack • ID auto 2026-HEX8 like 2026-A3F9C12E</p>
      <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }} />
        <input placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }} />
        <select value={form.track} onChange={e => setForm({...form, track: e.target.value})} style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>
          <option>Ethical Hacking & Penetration Testing</option><option>SOC Analyst</option><option>Digital Forensics</option><option>Cloud Security</option><option>GRC & Compliance</option><option>Threat Intelligence</option><option>Incident Response</option><option>Bundle: All 8 Tracks</option>
        </select>
        <button onClick={pay} style={{ background: '#D4A72C', color: '#0a1931', padding: 14, borderRadius: 8, fontWeight: 900 }}>Pay ₦25,000 via Paystack</button>
        {status && <div style={{ background: '#f3f4f6', padding: 12, borderRadius: 8, fontSize: 13 }}>{status}</div>}
      </div>
    </div>
  );
}