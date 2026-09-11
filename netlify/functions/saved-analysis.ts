import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';

type Envelope = { version: 1; iv: string; ciphertext: string; expiresAt: number; updatedAt: number };
type Store = { get(key:string,options:{type:'json'}):Promise<unknown>; setJSON(key:string,value:Envelope):Promise<unknown>; delete(key:string):Promise<unknown> };
const headers = { 'Content-Type':'application/json', 'Cache-Control':'private, no-store', 'X-Robots-Tag':'noindex, nofollow', 'Referrer-Policy':'no-referrer', 'X-Content-Type-Options':'nosniff' };
const respond=(status:number,body:unknown)=>new Response(JSON.stringify(body),{status,headers});
export function createHandler(store:Store, now:()=>number=Date.now) {
 return async (request:Request):Promise<Response> => {
  if(!['GET','POST','DELETE'].includes(request.method))return respond(405,{error:'Method not allowed'});
  const origin=request.headers.get('origin');
  if(origin&&origin!==new URL(request.url).origin)return respond(403,{error:'Origin not allowed'});
  const token=request.headers.get('authorization')?.match(/^Bearer ([A-Za-z0-9_-]{43})$/)?.[1];
  if(!token)return respond(401,{error:'A private return link is required'});
  // The bearer capability never appears in paths, stored records or logs.
  const key=createHash('sha256').update(token).digest('hex');
  try {
   if(request.method==='GET'){
    const record=await store.get(key,{type:'json'}) as Envelope|null;
    if(!record)return respond(404,{error:'This saved analysis is unavailable'});
    if(record.expiresAt<=now()){await store.delete(key);return respond(410,{error:'This return link has expired'});}
    return respond(200,record);
   }
   if(request.method==='DELETE'){await store.delete(key);return respond(200,{deleted:true});}
   if(!request.headers.get('content-type')?.includes('application/json'))return respond(415,{error:'JSON required'});
   if(Number(request.headers.get('content-length')||0)>24000)return respond(413,{error:'Analysis too large'});
   const text=await request.text();if(text.length>24000)return respond(413,{error:'Analysis too large'});
   let body;try{body=JSON.parse(text);}catch{return respond(400,{error:'Invalid analysis'});}
   if(body.version!==1||typeof body.iv!=='string'||!/^[A-Za-z0-9_-]{16}$/.test(body.iv)||typeof body.ciphertext!=='string'||!/^[A-Za-z0-9_-]{32,20000}$/.test(body.ciphertext))return respond(400,{error:'Invalid encrypted analysis'});
   // Only encrypted calculator data; no contact, CRM, email or marketing action.
   const record:Envelope={version:1,iv:body.iv,ciphertext:body.ciphertext,updatedAt:now(),expiresAt:now()+90*24*60*60*1000};
   await store.setJSON(key,record);
   return respond(200,{saved:true,expiresAt:record.expiresAt,updatedAt:record.updatedAt});
  }catch{return respond(503,{error:'Saving is unavailable. Your numbers are still here; please retry.'});}
 };
}
export default async (request:Request, context:Context) => {
 const production=context.deploy.context==='production'&&context.deploy.published;
 const name=production?'saved-analyses-v1':'saved-analyses-preview-'+context.deploy.id;
 return createHandler(getStore({name,consistency:'strong'}))(request);
};
export const config:Config={path:'/api/saved-analysis',rateLimit:{action:'rate_limit',aggregateBy:'ip',windowLimit:30,windowSize:60}};
