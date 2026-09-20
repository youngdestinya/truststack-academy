import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
export default function Verify() {
  const [id, setId] = useState('2026-9E43903F');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('id');
    if (q) setId(q.toUpperCase());
  }, []);
  const verify = async () => {
    setLoading(true);
    const r = await fetch(`/api/verify/${id.toUpperCase()}`);
    const j = await r.json();
    setData(j);
    setLoading(false);
  };
  return (
    <div style={{ fontFamily: 'Alegreya Sans', maxWidth: 960, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 40, fontWeight: 900 }}>Verify <span className="cert-italic">Certificate</span></h1>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <input value={id} onChange={e => setId(e.target.value.toUpperCase())} placeholder="2026-9E43903F" style={{ border: '1px solid #0a1931', padding: '10px 14px', borderRadius: 8, width: 260, fontFamily: 'Alegreya Sans' }} />
        <button onClick={verify} style={{ background: '#0a1931', color: '#fff', padding: '10px 18px', borderRadius: 8, fontWeight: 900 }}>{loading ? 'Checking...' : 'Verify'}</button>
      </div>
      {data && (
        <div style={{ marginTop: 32, border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, position: 'relative', overflow: 'hidden', background: '#fff' }}>
          <img src="/Truststack_Logo_PNG.png" style={{ position: 'absolute', width: 600, opacity: 0.06, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} alt="watermark" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {data.valid ? (
              <>
                <div style={{ background: '#10b981', color: '#fff', display: 'inline-block', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 900 }}>VERIFIED FILE-BASED</div>
                <div style={{ marginTop: 16, fontSize: 14 }}>Checks: {data.checks?.join(' • ')}</div>
                <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 140px', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 900 }}>{data.student}</div>
                    <div style={{ fontSize: 14, opacity: 0.7 }}>{data.track}</div>
                    <div style={{ fontSize: 12, marginTop: 8 }}>ID: {data.id} • {data.date_issued}</div>
                    <div style={{ fontSize: 10, marginTop: 8, wordBreak: 'break-all', opacity: 0.6 }}>{data.hash_full}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img src="/Cert_Seal.png" width={120} height={120} style={{ objectFit: 'contain' }} alt="seal" />
                    <QRCodeSVG value={data.verify_url || ''} size={120} style={{marginTop:8}} />
                  </div>
                </div>
              </>
            ) : (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 8, fontWeight: 700 }}>NOT FOUND — {data.error}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}