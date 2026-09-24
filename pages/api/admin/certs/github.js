import {authorized,makeCert,saveCert} from '../../../../lib/certs';
import {methodNotAllowed,rateLimit,requireJson,requireSameOrigin} from '../../../../lib/security';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return methodNotAllowed(res,['POST']);
 if(!rateLimit(req,res,{bucket:'cert-save',limit:20,windowMs:10*60*1000}))return;
 if(!requireSameOrigin(req,res)||!requireJson(req,res))return;
 if(!authorized(req))return res.status(401).json({error:'Unauthorized'});
 let cert;try{cert=makeCert(req.body);}catch(e){return res.status(400).json({error:e.message});}
 try{return res.json({success:true,cert:await saveCert(cert),message:'Saved to GitHub'});}catch(e){return res.status(503).json({error:e.message});}
}
