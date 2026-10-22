// Local-file parsing only. No network calls or live vulnerability-feed claims.
export function readSbom(json){if(!json||typeof json!=='object')throw Error('SBOM must be a JSON object.');let components=[];let format='';
 if(json.bomFormat==='CycloneDX'&&Array.isArray(json.components)){
  format=`CycloneDX ${json.specVersion||''}`;components=json.components.map(c=>({id:String(c['bom-ref']||c.purl||c.name||'').slice(0,180),name:String(c.name||'Unknown').slice(0,180),version:String(c.version||'').slice(0,120),supplier:String(c.supplier?.name||'').slice(0,180),purl:String(c.purl||'').slice(0,300),licence:(c.licenses||[]).map(z=>z.license?.id||z.license?.name||z.expression).filter(Boolean).join(', ').slice(0,180)}));
 }else if(typeof json.spdxVersion==='string'&&Array.isArray(json.packages)){
  format=json.spdxVersion;components=json.packages.map(p=>({id:String(p.SPDXID||p.name||'').slice(0,180),name:String(p.name||'Unknown').slice(0,180),version:String(p.versionInfo||'').slice(0,120),supplier:String(p.supplier||'').slice(0,180),purl:String((p.externalRefs||[]).find(x=>String(x.referenceType||'').includes('purl'))?.referenceLocator||'').slice(0,300),licence:String(p.licenseConcluded||'').slice(0,180)}));
 }else throw Error('Supported formats: CycloneDX JSON and SPDX 2.x JSON.');
 if(components.length>10000)throw Error('SBOM exceeds the local 10,000-component limit.');return{format,components,importedAt:new Date().toISOString()};}
