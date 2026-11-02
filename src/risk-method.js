// Independently authored, deterministic asset-to-threat prompts. Human review is mandatory.
export const ASSET_TYPES=[
 ['software','Application / firmware'],['compute','Controller / compute'],
 ['interface','Network / external interface'],['data','Sensitive data / configuration'],
 ['identity','Credentials / identities'],['service','External service / cloud dependency'],
 ['physical','Physical access / maintenance']
];
export const THREAT_LIBRARY=[
 {id:'T-01',types:['software','compute'],stride:'Tampering',title:'Unauthorised code modification',scenario:'An attacker alters executable code or firmware in {asset}, causing untrusted behaviour.',links:['A1-07','A1-11']},
 {id:'T-02',types:['software','compute'],stride:'Elevation of privilege',title:'Compromised update path',scenario:'An attacker introduces an untrusted update to {asset}, affecting product integrity.',links:['A1-04','VH-07']},
 {id:'T-03',types:['interface'],stride:'Spoofing',title:'Impersonated network peer',scenario:'An unauthorised endpoint impersonates a trusted peer communicating with {asset}.',links:['A1-05']},
 {id:'T-04',types:['interface'],stride:'Denial of service',title:'Interface saturation',scenario:'Excess or malformed traffic disrupts the availability of {asset}.',links:['A1-09']},
 {id:'T-05',types:['interface'],stride:'Tampering',title:'Command or message tampering',scenario:'An unauthorised actor modifies messages entering or leaving {asset}.',links:['A1-07']},
 {id:'T-06',types:['data'],stride:'Information disclosure',title:'Unauthorised sensitive-data access',scenario:'Sensitive data stored or processed by {asset} becomes accessible to an unauthorised actor.',links:['A1-06']},
 {id:'T-07',types:['data'],stride:'Tampering',title:'Configuration integrity loss',scenario:'The integrity of configuration or stored data in {asset} is altered without authorisation.',links:['A1-07']},
 {id:'T-08',types:['identity'],stride:'Spoofing',title:'Credential compromise',scenario:'Stolen, weak or default credentials for {asset} enable impersonation.',links:['A1-05']},
 {id:'T-09',types:['identity'],stride:'Elevation of privilege',title:'Excessive privileges',scenario:'An identity associated with {asset} obtains privileges beyond its intended authorisation.',links:['A1-05']},
 {id:'T-10',types:['service'],stride:'Denial of service',title:'Dependency outage',scenario:'Loss or degradation of {asset} disrupts essential product functions.',links:['A1-09']},
 {id:'T-11',types:['service'],stride:'Information disclosure',title:'Third-party data exposure',scenario:'Information crossing the trust boundary to {asset} is disclosed improperly.',links:['A1-06']},
 {id:'T-12',types:['physical'],stride:'Tampering',title:'Unauthorised maintenance access',scenario:'An attacker with physical or maintenance access to {asset} modifies product configuration or software.',links:['A1-11','A1-05']}
];
export const DEFAULT_RISK_CRITERIA={threshold:10,likelihood:'1 Rare to 5 Frequent',impact:'1 Minor to 5 Severe',rationale:''};
export function riskCriteria(product){const x=product.riskCriteria||{};const threshold=Number(x.threshold);return {threshold:Number.isInteger(threshold)&&threshold>=1&&threshold<=25?threshold:DEFAULT_RISK_CRITERIA.threshold,likelihood:String(x.likelihood||DEFAULT_RISK_CRITERIA.likelihood),impact:String(x.impact||DEFAULT_RISK_CRITERIA.impact),rationale:String(x.rationale||'')};}
export function candidateThreats(product){const existing=new Set((product.risks||[]).map(r=>`${r.assetId||''}:${r.threatId||''}`));const out=[];for(const asset of product.assets||[]){if(!ASSET_TYPES.some(x=>x[0]===asset.type))continue;for(const t of THREAT_LIBRARY){if(!t.types.includes(asset.type)||existing.has(`${asset.id}:${t.id}`))continue;out.push({assetId:asset.id,assetName:asset.name,threatId:t.id,title:`${asset.name}: ${t.title}`,stride:t.stride,scenario:t.scenario.replace('{asset}',asset.name),requirementIds:t.links});}}return out;}
export function riskNeedsTreatment(product,risk){const criteria=riskCriteria(product);return Number(risk.likelihood)*Number(risk.impact)>=criteria.threshold;}
export function riskReviewFlags(product){const policy=riskCriteria(product);const flags=[];if(!(product.assets||[]).length)flags.push('No product assets have been identified.');if(!policy.rationale.trim())flags.push('Document risk acceptance criteria and their rationale.');for(const risk of product.risks||[]){if(!riskNeedsTreatment(product,risk))continue;if(!String(risk.treatment||'').trim())flags.push(`No treatment documented for ${risk.title}.`);if(risk.acceptance==='accepted'&&(!String(risk.acceptanceReason||'').trim()||!String(risk.acceptedBy||'').trim()))flags.push(`Risk acceptance needs reviewer and justification: ${risk.title}.`);}return flags;}
