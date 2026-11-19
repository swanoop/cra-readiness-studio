// Offline SBOM inspection. This parser does not validate complete CycloneDX/SPDX conformance.
const MAX_COMPONENTS = 10000;
const MAX_RELATIONSHIPS = 50000;
const text = (value, limit=180) => String(value ?? '').slice(0, limit);
const list = value => Array.isArray(value) ? value : [];
const nameOf = value => typeof value === 'string' ? value : text(value?.name || value?.spdxId || '');
const digest = hash => ({algorithm:text(hash?.alg || hash?.algorithm || '',40),value:text(hash?.content || hash?.hashValue || '',150)});
function coverage(components, meta={}) {
  // Informational field-presence report only; NOT a BSI TR-03183-2 conformance score.
  const required=['name','version','supplier','purl','hashes','dependsOn'];
  const perComponent=components.map(c=>({
    id:c.id,
    present:required.filter(k=>k==='hashes'?c.hashes.length>0:k==='dependsOn'?Array.isArray(c.dependsOn)&&c.dependencyDeclared:Boolean(c[k])).length,
    possible:required.length
  }));
  const observed=perComponent.reduce((sum,x)=>sum+x.present,0);
  const possible=perComponent.length*required.length;
  return {label:'Indicative field presence (not BSI compliance)',observed,possible,percent:possible?Math.round(observed/possible*100):0,
    documentCreator:Boolean(meta.creator),documentTimestamp:Boolean(meta.timestamp),perComponent};
}
function result(format, components, metadata={}) {
  if(components.length>MAX_COMPONENTS) throw Error('SBOM exceeds the local 10,000-component limit.');
  const ids=new Set();
  for(const item of components){
    if(!item.id) throw Error('SBOM has a component without an identifier.');
    if(ids.has(item.id)) throw Error('SBOM has duplicate component identifiers: '+item.id);
    ids.add(item.id);
  }
  const warnings=[];
  for(const c of components){
    const unresolved=c.dependsOn.filter(ref=>!ids.has(ref));
    if(unresolved.length)warnings.push('Unresolved dependencies for '+c.name+': '+unresolved.slice(0,3).join(', '));
  }
  return {format,components,importedAt:new Date().toISOString(),metadata,coverage:coverage(components,metadata),warnings:warnings.slice(0,100)};
}
function cyclone(json) {
  const components=[];
  const graph=new Map();
  const declared=new Set();
  const stack=list(json.components).map(c=>({c,parent:null,depth:0}));
  if(json.metadata?.component) stack.push({c:json.metadata.component,parent:null,depth:0});
  while(stack.length){
    const {c,parent,depth}=stack.pop();
    if(!c||typeof c!=='object')continue;
    if(depth>64)throw Error('SBOM component nesting exceeds the safe depth limit.');
    const id=text(c['bom-ref']||c.purl||[c.group,c.name,c.version].filter(Boolean).join(':')||'',300);
    const dependencies=list(c.components);
    if(components.length>=MAX_COMPONENTS)throw Error('SBOM exceeds the local 10,000-component limit.');
    components.push({id,name:text(c.name||'Unknown'),version:text(c.version,120),supplier:text(nameOf(c.supplier)),
      purl:text(c.purl,300),licence:list(c.licenses).map(x=>text(x?.license?.id||x?.license?.name||x?.expression)).filter(Boolean).join(', ').slice(0,180),
      hashes:list(c.hashes).map(digest),dependsOn:[],dependencyDeclared:false,parentId:parent,scope:text(c.scope,40)});
    if(parent){const current=graph.get(parent)||new Set();current.add(id);graph.set(parent,current);declared.add(parent);}
    for(const child of dependencies)stack.push({c:child,parent:id,depth:depth+1});
  }
  const entries=list(json.dependencies);
  if(entries.length>MAX_RELATIONSHIPS)throw Error('SBOM dependency graph is too large.');
  for(const d of entries){
    const id=text(d.ref,300);if(!id)continue;
    const children=[...list(d.dependsOn),...list(d.provides)].map(x=>text(x,300));
    const current=graph.get(id)||new Set();children.forEach(x=>current.add(x));
    graph.set(id,current);declared.add(id);
  }
  for(const component of components){
    component.dependsOn=[...(graph.get(component.id)||[])];
    component.dependencyDeclared=declared.has(component.id);
  }
  return result('CycloneDX '+text(json.specVersion,20),components,
    {creator:list(json.metadata?.tools?.components).map(x=>text(x.name)).join(', ')||text(json.metadata?.tools?.[0]?.name),
     timestamp:text(json.metadata?.timestamp,40),serialNumber:text(json.serialNumber,150),relationships:entries.length});
}
function spdxTwo(json) {
  const graph=new Map();const declared=new Set();
  const packages=list(json.packages);
  if(packages.length>MAX_COMPONENTS)throw Error('SBOM exceeds the local 10,000-component limit.');
  const relationships=list(json.relationships);
  if(relationships.length>MAX_RELATIONSHIPS)throw Error('SBOM dependency graph is too large.');
  for(const r of relationships){
    let from=text(r.spdxElementId,300),to=text(r.relatedSpdxElement,300);
    const type=text(r.relationshipType).toUpperCase();
    if(type==='DEPENDENCY_OF'){[from,to]=[to,from];}
    else if(!['DEPENDS_ON','CONTAINS'].includes(type))continue;
    const deps=graph.get(from)||new Set();deps.add(to);graph.set(from,deps);declared.add(from);
  }
  const components=packages.map(p=>{
    const id=text(p.SPDXID||p.name,300);
    const purl=list(p.externalRefs).find(x=>/purl/i.test(text(x.referenceType)))?.referenceLocator||'';
    return {id,name:text(p.name||'Unknown'),version:text(p.versionInfo,120),supplier:text(p.supplier),
      purl:text(purl,300),licence:text(p.licenseConcluded||p.licenseDeclared),hashes:list(p.checksums).map(digest),
      dependsOn:[...(graph.get(id)||[])],dependencyDeclared:declared.has(id),parentId:null,scope:''};
  });
  return result(text(json.spdxVersion,30),components,{creator:list(json.creationInfo?.creators).join(', '),timestamp:text(json.creationInfo?.created,40),relationships:relationships.length});
}
function spdxThree(json){
  const entries=list(json['@graph']||json.elements);
  if(entries.length>MAX_RELATIONSHIPS)throw Error('SPDX graph exceeds the local element limit.');
  const isType=(entry,name)=>list(Array.isArray(entry.type)?entry.type:[entry.type]).some(t=>text(t).toLowerCase().endsWith(name.toLowerCase()));
  const packages=entries.filter(e=>isType(e,'Package')&&!isType(e,'DatasetPackage'));
  const nodes=new Map(entries.filter(e=>e.spdxId||e['@id']).map(e=>[text(e.spdxId||e['@id'],300),e]));
  const relations=entries.filter(e=>isType(e,'Relationship'));
  const graph=new Map();const declared=new Set();
  for(const r of relations){
    let from=text(r.from?.spdxId||r.from,300);
    const ends=list(Array.isArray(r.to)?r.to:[r.to]).map(v=>text(v?.spdxId||v,300)).filter(Boolean);
    const type=text(r.relationshipType).toLowerCase();
    if(type.includes('dependson')){const set=graph.get(from)||new Set();ends.forEach(x=>set.add(x));graph.set(from,set);declared.add(from);}
    else if(type.includes('dependencyof')){for(const end of ends){const set=graph.get(end)||new Set();set.add(from);graph.set(end,set);declared.add(end);}}
  }
  const components=packages.map(p=>{
    const id=text(p.spdxId||p['@id'],300);
    const refs=list(p.externalIdentifier);
    const purl=refs.find(v=>/purl/i.test(text(v.externalIdentifierType)))?.identifier||'';
    const supplier=p.suppliedBy && nodes.get(text(p.suppliedBy,300));
    return {id,name:text(p.name||'Unknown'),version:text(p.software_packageVersion||p.packageVersion,120),
      supplier:text(supplier?.name||nameOf(p.suppliedBy)),purl:text(purl,300),licence:text(p.licenseConcluded||'',180),
      hashes:list(p.verifiedUsing).filter(x=>x?.hashValue).map(digest),dependsOn:[...(graph.get(id)||[])],
      dependencyDeclared:declared.has(id),parentId:null,scope:''};
  });
  return result('SPDX 3.x JSON-LD',components,{creator:'',timestamp:'',relationships:relations.length});
}
export function readSbom(json) {
  if(!json || typeof json!=='object' || Array.isArray(json))throw Error('SBOM must be a JSON object.');
  if(json.bomFormat==='CycloneDX' && Array.isArray(json.components))return cyclone(json);
  if(typeof json.spdxVersion==='string' && Array.isArray(json.packages))return spdxTwo(json);
  if(Array.isArray(json['@graph']) || (Array.isArray(json.elements)&&json.spdxVersion?.startsWith('SPDX-3')))return spdxThree(json);
  throw Error('Supported formats: CycloneDX JSON, SPDX 2.x JSON, and SPDX 3.x JSON-LD.');
}
