// Browser-native encryption for portable offline workspace backups.
const encoder=new TextEncoder();const decoder=new TextDecoder();
const b64=bytes=>btoa(String.fromCharCode(...bytes));
const unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function derive(pass,salt){
 const key=await crypto.subtle.importKey('raw',encoder.encode(pass),'PBKDF2',false,['deriveKey']);
 return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:250000,hash:'SHA-256'},key,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
export async function encryptWorkspace(plain,password){
 if(typeof plain!=='string'||password.length<12)throw Error('Strong password required');
 const salt=crypto.getRandomValues(new Uint8Array(16)),nonce=crypto.getRandomValues(new Uint8Array(12));
 const key=await derive(password,salt);
 const ciphertext=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv:nonce},key,encoder.encode(plain)));
 return {format:'cra-readiness-studio-encrypted',version:1,kdf:'PBKDF2-SHA256',iterations:250000,cipher:'AES-256-GCM',salt:b64(salt),nonce:b64(nonce),ciphertext:b64(ciphertext)};
}
export function isEncryptedBackup(value){return value?.format==='cra-readiness-studio-encrypted';}
export async function decryptWorkspace(value,password){
 if(!isEncryptedBackup(value)||value.version!==1||value.iterations!==250000||value.cipher!=='AES-256-GCM')throw Error('Unsupported encrypted backup');
 const salt=unb64(value.salt),nonce=unb64(value.nonce),cipher=unb64(value.ciphertext);
 if(salt.length!==16||nonce.length!==12||cipher.length>25*1024*1024)throw Error('Invalid backup contents');
 try{const key=await derive(password,salt);return decoder.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:nonce},key,cipher))}catch{throw Error('Incorrect password or damaged encrypted backup')}
}
