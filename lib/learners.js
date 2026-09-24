import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {learnerEmailDigest} from './learner-auth';

const headers=()=>({Authorization:`Bearer ${process.env.GITHUB_TOKEN}`,Accept:'application/vnd.github+json','Content-Type':'application/json'});
const url=()=>`https://api.github.com/repos/${process.env.GITHUB_REPO || 'youngdestinya/truststack-academy'}/contents/data/learners.json`;

export function makeLearner({track,payment_digest,email,display_name}){
 if(typeof track!=='string'||!track.trim()||track.length>180)throw new Error('A valid track is required');
 const year=new Date().getUTCFullYear();
 const token=crypto.randomBytes(3).toString('hex').toUpperCase();
 const learner={id:`TSA-${year}-${token}`,track:track.trim(),status:'Active Learner',enrolled_on:new Date().toISOString().slice(0,10),public_profile:false};
 if(payment_digest)learner.payment_digest=payment_digest;
 const emailDigest=learnerEmailDigest(email);
 if(emailDigest)learner.login_email_digest=emailDigest;
 if(typeof display_name==='string'&&display_name.trim())learner.display_name=display_name.trim().slice(0,120);
 learner.verify_url=`${process.env.NEXT_PUBLIC_BASE_URL || 'https://truststack.academy'}/learner?id=${learner.id}`;
 return learner;
}

export async function getAllLearners(){
 if(process.env.GITHUB_TOKEN){
  const response=await fetch(url(),{headers:headers(),cache:'no-store'});
  if(!response.ok)throw new Error('Learner registry unavailable');
  const file=await response.json();
  return JSON.parse(Buffer.from(file.content,'base64').toString());
 }
 return JSON.parse(fs.readFileSync(path.join(process.cwd(),'data/learners.json'),'utf8'));
}

export async function saveLearner(learner){
 if(!process.env.GITHUB_TOKEN)throw new Error('Learner storage is not configured');
 for(let attempt=0;attempt<4;attempt++){
  const response=await fetch(url(),{headers:headers(),cache:'no-store'});
  if(!response.ok)throw new Error('Learner registry unavailable');
  const file=await response.json();
  const data=JSON.parse(Buffer.from(file.content,'base64').toString());
  const existing=data.learners.find(item=>item.id===learner.id||(learner.payment_digest&&item.payment_digest===learner.payment_digest));
  if(existing)return existing;
  data.learners.push(learner);data.meta.total=data.learners.length;
  const write=await fetch(url(),{method:'PUT',headers:headers(),body:JSON.stringify({message:`Add learner ${learner.id}`,sha:file.sha,content:Buffer.from(JSON.stringify(data,null,2)+'\n').toString('base64')})});
  if(write.ok)return learner;
  if(write.status!==409)throw new Error('Could not save learner');
 }
 throw new Error('Registry busy; retry the request');
}

export function publicLearner(record){
 const result={id:record.id,track:record.track,status:record.status,enrolled_on:record.enrolled_on,verify_url:record.verify_url,public_profile:Boolean(record.public_profile)};
 if(record.public_profile&&record.display_name)result.display_name=record.display_name;
 if(record.public_profile&&Array.isArray(record.verified_skills))result.verified_skills=record.verified_skills;
 if(record.certificate_id)result.certificate_id=record.certificate_id;
 return result;
}
