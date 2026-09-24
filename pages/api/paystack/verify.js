import crypto from 'crypto';
import {checkoutProduct} from '../../../lib/checkout-pricing';
import {makeLearner,saveLearner} from '../../../lib/learners';
import {methodNotAllowed,rateLimit,requireJson,requireSameOrigin} from '../../../lib/security';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return methodNotAllowed(res,['POST']);
 if(!rateLimit(req,res,{bucket:'checkout-verify',limit:20,windowMs:10*60*1000}))return;
 if(!requireSameOrigin(req,res)||!requireJson(req,res))return;
 if(!process.env.PAYSTACK_SECRET_KEY||!process.env.GITHUB_TOKEN)return res.status(503).json({valid:false,error:'Payments are not configured yet'});
 const reference=req.body?.reference;
 if(typeof reference!=='string'||!reference||reference.length>200)return res.status(400).json({valid:false,error:'Invalid reference'});
 try{
 const r=await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,{headers:{Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`}});
 const j=await r.json(),d=j.data;
 const product=checkoutProduct(d?.metadata?.track_slug || d?.metadata?.track);
 if(!r.ok||!j.status||d?.status!=='success'||d.currency!=='NGN'||!product||d.amount!==product.amount)return res.status(400).json({valid:false,error:'Payment has not been verified'});
 const payment_digest=crypto.createHash('sha256').update(reference).digest('hex');
 const learner=makeLearner({track:product.title,payment_digest});
 const saved=await saveLearner(learner);
 return res.json({valid:true,learner_id:saved.id,status:saved.status,verify_url:saved.verify_url});
 }catch{return res.status(502).json({valid:false,error:'Unable to verify or save payment. Retry with the same payment reference.'});}
}
