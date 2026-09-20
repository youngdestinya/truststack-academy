import {authorized} from '../../../lib/certs';
export default function handler(req,res){res.setHeader('Cache-Control','no-store');if(req.method!=='POST')return res.status(405).end();return res.status(authorized(req)?200:401).json({success:authorized(req)});}
