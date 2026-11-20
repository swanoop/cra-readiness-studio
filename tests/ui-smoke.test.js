import test from 'node:test';
import assert from 'node:assert/strict';

test('all application modules render without a network dependency using a minimal DOM harness',async()=>{
 const old={document:globalThis.document,window:globalThis.window,location:globalThis.location,localStorage:globalThis.localStorage,indexedDB:globalThis.indexedDB,confirm:globalThis.confirm};
 const listeners={};let html='';let stored=null;
 const app={addEventListener(type,cb){listeners[type]=cb},set innerHTML(t){html=t},get innerHTML(){return html}};
 globalThis.document={querySelector(selector){return selector==='#app'?app:null}};
 globalThis.window={addEventListener(){},scrollTo(){}};
 globalThis.location={hash:''};globalThis.localStorage={getItem(){return stored},setItem(k,v){stored=v}};
 globalThis.confirm=()=>true;
 globalThis.indexedDB={open(){
   const req={};const db={close(){},transaction(){
     const tx={objectStore(){return {get(){const r={result:null};queueMicrotask(()=>r.onsuccess?.());return r;}}}};
     queueMicrotask(()=>tx.oncomplete?.());return tx;
   }};
   req.result=db;queueMicrotask(()=>req.onsuccess?.());return req;
 }};
 try{
   await import('../src/app.js?ui_smoke=20261022');
   await new Promise(resolve=>setImmediate(resolve));
   assert.match(html,/CRA Assurance/);
   const click=action=>listeners.click({target:{closest(sel){return sel==='[data-action]'?{dataset:{action}}:null}}});
   const nav=page=>listeners.click({target:{closest(sel){return sel==='[data-nav]'?{dataset:{nav:page}}:null}}});
   click('new-product');assert.match(html,/Product profile/);
   nav('requirements');assert.equal((html.match(/class="requirement"/g)||[]).length,112);
   nav('maturity');assert.equal((html.match(/class="maturity-control"/g)||[]).length,25);
   click('maturity-mode:professional');assert.equal((html.match(/class="maturity-control"/g)||[]).length,150);
   click('maturity-mode:sme');assert.equal((html.match(/class="maturity-control"/g)||[]).length,25);
   for(const page of ['traceability','evidence','risks','actions','releases','sbom','vulnerabilities','reporting','documents','settings','overview','export']){
     nav(page);assert.ok(html.length>100,`missing ${page}`);
   }
   assert.match(html,/CSV registers/);
   assert.match(html,/Print \/ Save as PDF/);
   assert.doesNotMatch(html,/https?:\/\//);
 }finally{Object.assign(globalThis,old)}
});
