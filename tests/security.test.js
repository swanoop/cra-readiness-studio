import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {encryptWorkspace,decryptWorkspace,isEncryptedBackup} from '../src/secure-backup.js';
import {readFileSync} from 'node:fs';
import {REQUIREMENTS,MATURITY_CONTROLS,SME_CONTROLS} from '../src/data.js';
const original=globalThis.crypto;
if(!globalThis.crypto) globalThis.crypto=webcrypto;
test('encrypted backup roundtrip with AES-256-GCM',async()=>{
 const backup='{"schema":2,"products":[]}';
 const encrypted=await encryptWorkspace(backup,'sufficiently-long-test-password');
 assert.ok(isEncryptedBackup(encrypted));assert.ok(encrypted.ciphertext&&!JSON.stringify(encrypted).includes('"products"'));
 assert.equal(await decryptWorkspace(encrypted,'sufficiently-long-test-password'),backup);
 await assert.rejects(decryptWorkspace(encrypted,'wrong-password'));
 await assert.rejects(encryptWorkspace(backup,'too-short'));
});
test('no external URLs, former brand names, or promotional references in app source',()=>{
 for(const p of ['src/app.js','src/data.js','src/regulatory-expanded.js','src/professional-maturity.js','index.html']){
   const text=readFileSync(new URL('../'+p,import.meta.url),'utf8');
   assert.doesNotMatch(text,/https?:\/\//i,`external URL found in ${p}`);
   assert.doesNotMatch(text,/forte.?cra|cyber.?forte|inspiration|inspired by/i,`former brand found in ${p}`);
 }
});
test('full regulatory and maturity catalogues contain 118/150/25 records',()=>{
 assert.equal(REQUIREMENTS.length,118);assert.equal(MATURITY_CONTROLS.length,150);assert.equal(SME_CONTROLS.length,25);
 assert.equal(MATURITY_CONTROLS.reduce((n,c)=>n+c.levels.length,0),750);
});

test('backup v2 validates metadata and opens historical v1 files',async()=>{
 const plain='{"schema":2,"products":[]}';
 const pass='very-long-test-passphrase';
 const modern=await encryptWorkspace(plain,pass);
 assert.equal(modern.version,2);
 assert.ok(modern.iterations>=600000);
 assert.equal(await decryptWorkspace(modern,pass),plain);
 await assert.rejects(decryptWorkspace({...modern,iterations:modern.iterations+1},pass));
 const salt=webcrypto.getRandomValues(new Uint8Array(16));
 const nonce=webcrypto.getRandomValues(new Uint8Array(12));
 const raw=await webcrypto.subtle.importKey('raw',new TextEncoder().encode(pass),'PBKDF2',false,['deriveKey']);
 const key=await webcrypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:250000,hash:'SHA-256'},raw,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
 const ct=await webcrypto.subtle.encrypt({name:'AES-GCM',iv:nonce},key,new TextEncoder().encode(plain));
 const legacy={format:'cra-readiness-studio-encrypted',version:1,kdf:'PBKDF2-SHA256',iterations:250000,cipher:'AES-256-GCM',
 salt:Buffer.from(salt).toString('base64'),nonce:Buffer.from(nonce).toString('base64'),ciphertext:Buffer.from(ct).toString('base64')};
 assert.equal(await decryptWorkspace(legacy,pass),plain);
});
