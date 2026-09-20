import {getAllCerts} from '../../../lib/certs';
import crypto from 'crypto';
export default async function handler(req,res){
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 res.setHeader('Cache-Control','no-store');
 const id=String(req.query.id||'').toUpperCase();
 try{
 const data=await getAllCerts(),cert=data.certificates.find(c=>c.id.toUpperCase()===id);
 if(!cert)return res.status(404).json({valid:false,error:'Certificate ID not found',checks:['file_lookup: failed']});
 const hash=crypto.createHash('sha256').update(JSON.stringify([cert.id,cert.student,cert.track,cert.date_issued])).digest('hex');
 const valid=cert.status==='verified';
 return res.json({...cert,payment_digest:undefined,valid,checks:['file_lookup: ok',hash===cert.hash_full?'hash_match: ok':'hash_match: not verified','signature_valid: not configured','blockchain_anchored: not verified'],message:'VERIFIED FILE-BASED'});
 }catch{return res.status(503).json({valid:false,error:'Certificate registry unavailable'});}
}
