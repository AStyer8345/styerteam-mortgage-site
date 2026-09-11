// Controlled local preview: no production service is contacted by submissions.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHandler } from '../netlify/functions/saved-analysis.ts';
const root=process.argv[2];if(!root)throw new Error('Supply the prepared preview directory');
const records=new Map();
const handler=createHandler({get:async(key)=>records.get(key)||null,setJSON:async(key,value)=>{records.set(key,value)},delete:async(key)=>{records.delete(key)}});
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url||'/', 'http://127.0.0.1:4173');
  const chunks=[];for await(const chunk of req)chunks.push(chunk);const body=Buffer.concat(chunks);
  res.setHeader('X-Robots-Tag','noindex, nofollow');
  if(url.pathname==='/api/saved-analysis'){
   const result=await handler(new Request(url,{method:req.method,headers:req.headers as HeadersInit,body:req.method==='GET'?undefined:body}));res.writeHead(result.status,Object.fromEntries(result.headers));res.end(await result.text());return;
  }
  if(url.pathname==='/.netlify/functions/lead-intake'){
   const data=JSON.parse(body.toString());res.setHeader('Content-Type','application/json');res.end(JSON.stringify({captured:true,preview:true,inquiry_id:data.inquiry_id,ownerNotified:false}));return;
  }
  if(req.method!=='GET'){res.writeHead(405);res.end('Preview: disabled');return;}
  const relative=decodeURIComponent(url.pathname).replace(/^\//,'')||'index.html';
  const target=path.resolve(root,relative);if(!target.startsWith(path.resolve(root)+path.sep)){res.writeHead(403);res.end();return;}
  let file=target;try{if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');}catch{if(!path.extname(file))file+='.html';}
  const content=await fs.readFile(file);const type=({'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon'} as Record<string,string>)[path.extname(file)]||'application/octet-stream';res.setHeader('Content-Type',type);res.end(content);
 }catch{res.writeHead(404);res.end('Not found');}
});server.listen(4173,'127.0.0.1',()=>console.log('Controlled preview ready: http://127.0.0.1:4173'));
