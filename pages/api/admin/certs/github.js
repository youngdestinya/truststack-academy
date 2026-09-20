import {authorized,makeCert,saveCert} from '../../../../lib/certs';
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).end();
 if(!authorized(req))return res.status(401).json({error:'Unauthorized'});
 let cert;try{cert=makeCert(req.body);}catch(e){return res.status(400).json({error:e.message});}
 try{return res.json({success:true,cert:await saveCert(cert),message:'Saved to GitHub'});}catch(e){return res.status(503).json({error:e.message});}
}
