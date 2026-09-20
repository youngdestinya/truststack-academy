import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
export function authorized(req) {
 const expected=process.env.ADMIN_KEY;
 const supplied=req.headers['x-admin-key'];
 return Boolean(expected && typeof supplied==='string' && Buffer.byteLength(expected)===Buffer.byteLength(supplied) && crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(supplied)));
}
export function makeCert({student,track,date_issued}) {
 if(typeof student!=='string'||!student.trim()||student.length>120||typeof track!=='string'||!track.trim()||track.length>180) throw new Error('Name and track are required');
 const date=date_issued || new Date().toISOString().slice(0,10);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))) throw new Error('Invalid date');
 const hex=crypto.randomBytes(4).toString('hex').toUpperCase();
 const cert={id:`${new Date().getUTCFullYear()}-${hex}`,student:student.trim(),track:track.trim(),date_issued:date,hash_prefix:hex,status:'verified'};
 cert.hash_full=crypto.createHash('sha256').update(JSON.stringify([cert.id,cert.student,cert.track,cert.date_issued])).digest('hex');
 cert.verify_url=`${process.env.NEXT_PUBLIC_BASE_URL || 'https://truststack-academy.vercel.app'}/verify?id=${cert.id}`;
 return cert;
}
const headers=()=>({Authorization:`Bearer ${process.env.GITHUB_TOKEN}`,Accept:'application/vnd.github+json','Content-Type':'application/json'});
const url=()=>`https://api.github.com/repos/${process.env.GITHUB_REPO || 'youngdestinya/truststack-academy'}/contents/public/certs.json`;
export async function getAllCerts() {
 if(process.env.GITHUB_TOKEN){
  const r=await fetch(url(),{headers:headers(),cache:'no-store'});
  if(!r.ok)throw new Error('Certificate registry unavailable');
  const file=await r.json();return JSON.parse(Buffer.from(file.content,'base64').toString());
 }
 return JSON.parse(fs.readFileSync(path.join(process.cwd(),'public/certs.json'),'utf8'));
}
export async function saveCert(cert) {
 if(!process.env.GITHUB_TOKEN)throw new Error('Certificate storage is not configured');
 for(let i=0;i<4;i++){
  const r=await fetch(url(),{headers:headers(),cache:'no-store'});
  if(!r.ok)throw new Error('Certificate registry unavailable');
  const file=await r.json(),data=JSON.parse(Buffer.from(file.content,'base64').toString());
  const existing=data.certificates.find(c=>c.id===cert.id || (cert.payment_digest && c.payment_digest===cert.payment_digest));
  if(existing)return existing;
  data.certificates.push(cert);data.meta.total=data.certificates.length;
  const w=await fetch(url(),{method:'PUT',headers:headers(),body:JSON.stringify({message:`Add certificate ${cert.id}`,sha:file.sha,content:Buffer.from(JSON.stringify(data,null,2)+'\n').toString('base64')})});
  if(w.ok)return cert;
  if(w.status!==409)throw new Error('Could not save certificate');
 }
 throw new Error('Registry busy; retry the request');
}
