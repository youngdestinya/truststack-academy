import {getAllCerts} from '../../../lib/certs';
import {methodNotAllowed,rateLimit} from '../../../lib/security';
export default async function handler(req,res){
 if(req.method!=='GET')return methodNotAllowed(res,['GET']);
 res.setHeader('Cache-Control','no-store');
 if(!rateLimit(req,res,{bucket:'certificate-lookup',limit:60,windowMs:60*1000}))return;
 const id=String(req.query.id||'').toUpperCase();
 if(!/^\d{4}-[A-F0-9]{8}$/.test(id))return res.status(400).json({valid:false,error:'Enter a valid certificate ID'});
 try{
 const data=await getAllCerts(),cert=data.certificates.find(c=>c.id.toUpperCase()===id);
 if(!cert)return res.status(404).json({valid:false,error:'Certificate ID not found',checks:['file_lookup: failed']});
 const valid=cert.status==='verified';
 return res.json({id:cert.id,student:cert.student,track:cert.track,date_issued:cert.date_issued,status:valid?'verified':'not verified',valid,message:'OFFICIAL REGISTRY RECORD'});
 }catch{return res.status(503).json({valid:false,error:'Certificate registry unavailable'});}
}
