import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import AdminGate from '../components/AdminGate';
function DashboardContent() {
  const labs = Array.from({ length: 12 }, (_, i) => ({ id: i+1, title: `Lab ${i+1}: ${['Recon','Scanning','Exploitation','Post-Exploitation','Pivoting','Privesc','Persistence','Cleanup','SIEM','Forensics','Cloud','Report'][i]}`, done: i < 3 }));
  const [checked, setChecked] = useState(labs.map(l => l.done));
  const progress = Math.round((checked.filter(Boolean).length / 12) * 100);
  return (
    <div style={{ fontFamily: 'Alegreya Sans', display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
      <aside style={{ background: '#0a1931', color: '#fff', padding: 20 }}>
        <div style={{ fontWeight: 900 }}>TRUSTSTACK LMS v2</div>
        <div style={{ marginTop: 24, fontSize: 12, opacity: 0.6 }}>TRACK: Ethical Hacking</div>
        <div style={{ marginTop: 16, fontSize: 13 }}>Progress {progress}%</div>
        <div style={{ height: 6, background: '#1e3a5f', borderRadius: 999, marginTop: 6 }}><div style={{ width: `${progress}%`, height: '100%', background: '#10b981', borderRadius: 999 }} /></div>
      </aside>
      <main style={{ padding: 24, background: '#f9fafb' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900 }}>Dashboard — LMS v2 flags terminal</h1>
        <section style={{marginTop:18,display:'grid',gridTemplateColumns:'1fr auto',gap:24,alignItems:'center',background:'#fff',border:'2px solid #d4af37',borderRadius:18,padding:22}}>
          <div><div style={{fontSize:11,fontWeight:900,letterSpacing:2,color:'#008fb7'}}>TRUSTSTACK VERIFIED LEARNER</div><h2 style={{margin:'8px 0 4px',fontSize:25}}>Chinedu Okoro</h2><div style={{fontFamily:'monospace',fontWeight:900}}>TSA-2026-04F82A</div><div style={{marginTop:9,color:'#526176'}}>Digital Forensics · <strong style={{color:'#07865a'}}>● Active Learner</strong></div><a href="/learner?id=TSA-2026-04F82A" style={{display:'inline-block',marginTop:12,color:'#007fa7',fontWeight:900}}>Open verified learner profile →</a></div>
          <QRCodeSVG value="https://truststack-academy.vercel.app/learner?id=TSA-2026-04F82A" size={100}/>
        </section>
        <div style={{ display: 'grid', gap: 8, marginTop: 20 }}>
          {labs.map((lab, i) => (
            <label key={lab.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}>
              <input type="checkbox" checked={checked[i]} onChange={() => { const c=[...checked]; c[i]=!c[i]; setChecked(c); }} />
              <span style={{ fontSize: 14, fontWeight: checked[i] ? 700 : 400 }}>{lab.title}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, background: checked[i] ? '#10b981' : '#e5e7eb', color: checked[i] ? '#fff' : '#000', padding: '2px 8px', borderRadius: 999 }}>{checked[i] ? 'DONE' : 'TODO'}</span>
            </label>
          ))}
        </div>
        <div style={{ marginTop: 24, background: '#000', color: '#0f0', fontFamily: 'monospace', fontSize: 12, padding: 16, borderRadius: 8 }}>
          <div>$ truststack labs --status</div>
          <div>{checked.filter(Boolean).length}/12 complete • {progress}%</div>
          <div>{progress === 100 ? '$ cert generate --id 2026-XXXX --track ethical-hacking' : '$ keep hacking...'}</div>
        </div>
        {progress === 100 && <div style={{ marginTop: 16, background: '#10b981', color: '#fff', padding: 12, borderRadius: 8, fontWeight: 900, textAlign: 'center' }}>Complete! Generate <span className="cert-italic">Certificate</span> ID 2026-HEX8</div>}
      </main>
    </div>
  );
}
export default function Dashboard(){return <AdminGate title="Learner dashboard"><DashboardContent/></AdminGate>}
