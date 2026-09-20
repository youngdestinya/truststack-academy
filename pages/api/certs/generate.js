import {authorized,makeCert} from '../../../lib/certs';
export default function handler(req,res){
 if(req.method!=='POST')return res.status(405).end();
 if(!authorized(req))return res.status(401).json({error:'Unauthorized'});
 try{return res.json({success:true,cert:makeCert(req.body)});}catch(e){return res.status(400).json({error:e.message});}
}
