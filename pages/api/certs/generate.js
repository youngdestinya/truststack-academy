import {authorized,makeCert} from '../../../lib/certs';
import {methodNotAllowed,rateLimit,requireJson,requireSameOrigin} from '../../../lib/security';
export default function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return methodNotAllowed(res,['POST']);
 if(!rateLimit(req,res,{bucket:'cert-preview',limit:30,windowMs:10*60*1000}))return;
 if(!requireSameOrigin(req,res)||!requireJson(req,res))return;
 if(!authorized(req))return res.status(401).json({error:'Unauthorized'});
 try{return res.json({success:true,cert:makeCert(req.body)});}catch(e){return res.status(400).json({error:e.message});}
}
