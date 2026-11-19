// Portable, browser-native encrypted backups. New v2 files retain v1 read compatibility.
// PBKDF2-HMAC-SHA256 and AES-256-GCM; no network requests or server-side key storage.
const FORMAT = 'cra-readiness-studio-encrypted'; // Stable identifier for existing backups.
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const MAX_CIPHERTEXT = 25 * 1024 * 1024;
const ITERATIONS_V2 = 600000;
function b64(bytes) {
  let text = '';
  for (let offset = 0; offset < bytes.length; offset += 8192) {
    text += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  }
  return btoa(text);
}
function unb64(value, maxBytes = MAX_CIPHERTEXT) {
  if (typeof value !== 'string' || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value)
      || value.length > Math.ceil(maxBytes / 3) * 4 + 4) {
    throw Error('Invalid backup contents');
  }
  const bytes = Uint8Array.from(atob(value), c => c.charCodeAt(0));
  if (bytes.length > maxBytes) throw Error('Invalid backup contents');
  return bytes;
}
async function derive(password, salt, iterations) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    {name:'PBKDF2', salt, iterations, hash:'SHA-256'},
    key, {name:'AES-GCM', length:256}, false, ['encrypt','decrypt']
  );
}
function authenticatedHeader(value) {
  return encoder.encode([value.format, value.version, value.kdf, value.iterations, value.cipher].join('|'));
}
function validateHeader(value) {
  if (!isEncryptedBackup(value) || value.kdf !== 'PBKDF2-SHA256' || value.cipher !== 'AES-256-GCM') {
    throw Error('Unsupported encrypted backup');
  }
  if (value.version === 1 && value.iterations === 250000) return;
  if (value.version === 2 && Number.isSafeInteger(value.iterations)
      && value.iterations >= ITERATIONS_V2 && value.iterations <= 2000000) return;
  throw Error('Unsupported encrypted backup');
}
export function isEncryptedBackup(value) {
  return Boolean(value && typeof value === 'object' && value.format === FORMAT);
}
export async function encryptWorkspace(plain, password) {
  if (typeof plain !== 'string' || typeof password !== 'string' || password.length < 12) {
    throw Error('Strong password required');
  }
  if (encoder.encode(plain).length > MAX_CIPHERTEXT - 32) throw Error('Backup exceeds encryption size limit');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const result = {
    format: FORMAT, version: 2, kdf:'PBKDF2-SHA256', iterations:ITERATIONS_V2,
    cipher:'AES-256-GCM', salt:b64(salt), nonce:b64(nonce)
  };
  const key = await derive(password, salt, result.iterations);
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt(
    {name:'AES-GCM', iv:nonce, additionalData: authenticatedHeader(result)}, key, encoder.encode(plain)
  ));
  return {...result, ciphertext:b64(ciphertext)};
}
export async function decryptWorkspace(value, password) {
  validateHeader(value);
  if (typeof password !== 'string') throw Error('Password required');
  const salt = unb64(value.salt, 16);
  const nonce = unb64(value.nonce, 12);
  const ciphertext = unb64(value.ciphertext);
  if (salt.length !== 16 || nonce.length !== 12 || ciphertext.length < 16) throw Error('Invalid backup contents');
  try {
    const key = await derive(password, salt, value.iterations);
    const parameters = {name:'AES-GCM', iv:nonce};
    if (value.version === 2) parameters.additionalData = authenticatedHeader(value);
    return decoder.decode(await crypto.subtle.decrypt(parameters, key, ciphertext));
  } catch {
    throw Error('Incorrect password or damaged encrypted backup');
  }
}
