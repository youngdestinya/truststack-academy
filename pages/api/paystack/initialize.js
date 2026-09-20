export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).end();
 if(!process.env.PAYSTACK_SECRET_KEY||!process.env.GITHUB_TOKEN)return res.status(503).json({error:'Payments are not configured yet'});
 const {email,name,track}=req.body||{};
 if(typeof email!=='string'||!/^\S+@\S+\.\S+$/.test(email)||typeof name!=='string'||!name.trim()||name.length>120||typeof track!=='string'||!track.trim()||track.length>180)return res.status(400).json({error:'Enter a valid email, name and track'});
 try{
 const r=await fetch('https://api.paystack.co/transaction/initialize',{method:'POST',headers:{Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({email,amount:2500000,currency:'NGN',callback_url:`${process.env.NEXT_PUBLIC_BASE_URL}/pay`,metadata:{student:name,track}})});
 const j=await r.json();if(!r.ok||!j.status)throw new Error();
 return res.json({url:j.data.authorization_url});
 }catch{return res.status(502).json({error:'Unable to start checkout'});}
}
