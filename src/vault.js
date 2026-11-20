import {encryptWorkspace,decryptWorkspace} from './secure-backup.js';
import {exportWorkspace,parseBackup,STORAGE_KEY} from './store.js';
// A self-contained AES-256-GCM encrypted workspace stored in IndexedDB.
const NAME='cra-assurance-workbench-encrypted-v1', STORE='vault', KEY='workspace';
let writer=Promise.resolve();
function dbOpen(){
 return new Promise((resolve,reject)=>{
  if(!globalThis.indexedDB)return reject(Error('IndexedDB unavailable.'));
  const req=indexedDB.open(NAME,1);
  req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE))req.result.createObjectStore(STORE);};
  req.onerror=()=>reject(req.error||Error('Database unavailable.'));
  req.onsuccess=()=>resolve(req.result);
 });
}
async function read(){
 const db=await dbOpen();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,'readonly'),request=tx.objectStore(STORE).get(KEY);
  request.onsuccess=()=>resolve(request.result||null);
  request.onerror=()=>reject(request.error||Error('Cannot read encrypted workspace.'));
  tx.oncomplete=()=>db.close();
  tx.onabort=()=>{db.close();reject(tx.error||Error('Database read aborted.'));};
 });
}
async function write(value){
 const db=await dbOpen();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,'readwrite');
  tx.objectStore(STORE).put(value,KEY);
  tx.oncomplete=()=>{db.close();resolve();};
  tx.onerror=()=>{db.close();reject(tx.error||Error('Encrypted workspace save failed.'));};
  tx.onabort=()=>{db.close();reject(tx.error||Error('Database write aborted.'));};
 });
}
export async function encryptedVaultExists(){return (await read())!==null;}
export async function unlockEncryptedVault(password){
 const data=await read();
 if(!data)throw Error('No encrypted workspace exists.');
 return parseBackup(JSON.parse(await decryptWorkspace(data,password)));
}
export async function enableEncryptedVault(workspace,password){
 if(await encryptedVaultExists())throw Error('An encrypted workspace already exists.');
 const ciphertext=await encryptWorkspace(exportWorkspace(workspace),password);
 await write(ciphertext);
 // Verify successful recovery before removing the existing clear-text key.
 await unlockEncryptedVault(password);
 localStorage.removeItem(STORAGE_KEY);
}
export function persistEncryptedVault(workspace,password){
 const snapshot=exportWorkspace(workspace);
 writer=writer.catch(()=>{}).then(async()=>write(await encryptWorkspace(snapshot,password)));
 return writer;
}
