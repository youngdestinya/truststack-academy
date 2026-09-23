import {getAllLearners,publicLearner} from '../../../lib/learners';

export default async function handler(req,res){
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 res.setHeader('Cache-Control','no-store');
 const id=String(req.query.id||'').trim().toUpperCase();
 if(!/^TSA-\d{4}-[A-F0-9]{6}$/.test(id))return res.status(400).json({valid:false,error:'Enter a valid TSA learner ID'});
 try{
  const data=await getAllLearners();
  const learner=data.learners.find(item=>item.id.toUpperCase()===id);
  if(!learner)return res.status(404).json({valid:false,error:'Learner ID not found'});
  return res.json({valid:true,learner:publicLearner(learner),message:'OFFICIAL LEARNER REGISTRY RECORD'});
 }catch{return res.status(503).json({valid:false,error:'Learner registry unavailable'});}
}
