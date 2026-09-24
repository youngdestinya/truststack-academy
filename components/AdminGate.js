import { useEffect, useState } from 'react';

export default function AdminGate({ children, title = 'Protected workspace' }) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => { fetch('/api/admin/session', { cache: 'no-store' }).then(response => { if (response.ok) setAllowed(true); else location.replace(`/admin/login?next=${encodeURIComponent(location.pathname)}`); }).catch(() => location.replace('/admin/login')); }, []);
  if (allowed) return children;
  return <main style={{fontFamily:'Alegreya Sans',maxWidth:420,margin:'90px auto',padding:30,border:'1px solid #dbe3eb',borderRadius:18}}><div style={{fontSize:12,fontWeight:900,letterSpacing:2,color:'#00aee5'}}>TRUSTSTACK ADMIN</div><h1 style={{color:'#0a1931'}}>{title}</h1><p style={{color:'#667085'}}>Checking your secure administrator session…</p></main>;
}
