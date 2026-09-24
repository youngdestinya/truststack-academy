import { useEffect, useState } from 'react';

export default function AdminGate({ children, title = 'Protected workspace' }) {
  const [key, setKey] = useState('');
  const [allowed, setAllowed] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { fetch('/api/admin/session', { cache: 'no-store' }).then(response => setAllowed(response.ok)).catch(() => {}); }, []);
  const login = async () => {
    const response = await fetch('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) });
    if (response.ok) { setKey(''); setAllowed(true); setError(''); } else setError('Invalid admin key.');
  };
  if (allowed) return children;
  return <main style={{fontFamily:'Alegreya Sans',maxWidth:420,margin:'90px auto',padding:30,border:'1px solid #dbe3eb',borderRadius:18}}><div style={{fontSize:12,fontWeight:900,letterSpacing:2,color:'#00aee5'}}>TRUSTSTACK ADMIN</div><h1 style={{color:'#0a1931'}}>{title}</h1><p style={{color:'#667085'}}>This page is restricted to authorized administrators.</p><input type="password" value={key} onChange={e=>setKey(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} placeholder="Admin key" style={{width:'100%',height:46,border:'1px solid #cbd5e1',borderRadius:9,padding:12}}/><button onClick={login} style={{width:'100%',height:46,border:0,borderRadius:9,marginTop:12,background:'#0a1931',color:'#fff',fontWeight:900}}>Continue</button>{error&&<p style={{color:'#b42318',fontWeight:700}}>{error}</p>}</main>;
}
