import crypto from 'crypto';
import {makeCert,saveCert} from '../../../lib/certs';
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).end();
 if(!process.env.PAYSTACK_SECRET_KEY||!process.env.GITHUB_TOKEN)return res.status(503).json({valid:false,error:'Payments are not configured yet'});
 const reference=req.body?.reference;
 if(typeof reference!=='string'||!reference||reference.length>200)return res.status(400).json({valid:false,error:'Invalid reference'});
 try{
 const r=await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,{headers:{Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`}});
 const j=await r.json(),d=j.data;
 if(!r.ok||!j.status||d?.status!=='success'||d.currency!=='NGN'||d.amount!==2500000)return res.status(400).json({valid:false,error:'Payment has not been verified'});
 const cert=makeCert({student:d.metadata?.student,track:d.metadata?.track});
 cert.payment_digest=crypto.createHash('sha256').update(reference).digest('hex');
 const saved=await saveCert(cert);
 return res.json({valid:true,id:saved.id,verify_url:saved.verify_url});
 }catch{return res.status(502).json({valid:false,error:'Unable to verify or save payment. Retry with the same payment reference.'});}
}
