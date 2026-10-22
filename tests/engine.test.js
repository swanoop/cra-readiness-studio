import test from 'node:test';
import assert from 'node:assert/strict';
import {newProduct,scope,requirementMetrics,releaseReview,reportingDeadlines,riskRating,createSnapshot,compareSnapshot,safeText} from '../src/engine.js';
import {REQUIREMENTS} from '../src/data.js';
import {parseBackup} from '../src/store.js';
import {readSbom} from '../src/sbom.js';

test('regulatory prompt catalogue has unique identifiers and official references',()=>{
 assert.ok(REQUIREMENTS.length>=30);
 assert.equal(new Set(REQUIREMENTS.map(r=>r.id)).size,REQUIREMENTS.length);
 assert.ok(REQUIREMENTS.every(r=>r.ref&&r.title&&r.guidance));
});
test('scope remains qualified even when inputs look in-scope',()=>{
 const p=newProduct('Industrial gateway');
 assert.equal(scope(p).status,'Needs review');
 Object.assign(p,{eu:'yes',digital:'yes',commercial:'yes',exemption:'no'});
 assert.equal(scope(p).status,'Potentially in scope');
 p.exemption='yes';assert.equal(scope(p).status,'Specialist review');
});
test('differentiate assessment coverage, implementation and accepted evidence',()=>{
 const p=newProduct('Sample');
 const m0=requirementMetrics(p);assert.equal(m0.coverage,0);assert.equal(m0.implementation,null);
 p.requirements['A1-01']={status:'implemented'};
 p.requirements['A1-02']={status:'gap'};
 p.evidence.push({id:'e1',requirementIds:['A1-01'],review:'referenced'});
 let m=requirementMetrics(p);assert.equal(m.linkedAccepted,0);assert.equal(m.implementation,50);
 p.evidence[0].review='accepted';m=requirementMetrics(p);assert.equal(m.linkedAccepted,1);
 assert.ok(m.coverage>0&&m.coverage<100);
});
test('release review never implies certification based on score alone',()=>{
 const p=newProduct('Sample');const review=releaseReview(p);
 assert.ok(!review.ready);assert.ok(review.issues.length>=3);
});
test('snapshot comparison is stable',()=>{
 const p=newProduct('test');p.requirements['A1-01']={status:'implemented'};
 const s=createSnapshot(p,'V1');p.requirements['A1-01']={status:'gap'};
 const change=compareSnapshot(p,s);assert.equal(change.length,1);assert.equal(change[0].before,'implemented');
});
test('risk scoring uses labelled planning bands',()=>{
 assert.equal(riskRating(5,5).level,'Critical');assert.equal(riskRating(1,3).level,'Low');
});
test('Article 14 reporting deadlines calculated from awareness',()=>{
 const c=reportingDeadlines({kind:'vulnerability',awareness:'2026-10-22T12:00:00Z',remedy:'2026-10-24T12:00:00Z'});
 assert.equal(c.early.toISOString(),'2026-10-23T12:00:00.000Z');
 assert.equal(c.notification.toISOString(),'2026-10-25T12:00:00.000Z');
 assert.equal(c.final.toISOString(),'2026-11-07T12:00:00.000Z');
});
test('SPDX and CycloneDX SBOMs parse without network',()=>{
 const c=readSbom({bomFormat:'CycloneDX',specVersion:'1.6',components:[{name:'alpha',version:'1.2',purl:'pkg:npm/alpha@1.2'}]});assert.equal(c.components[0].name,'alpha');
 const s=readSbom({spdxVersion:'SPDX-2.3',packages:[{name:'beta',SPDXID:'SPDXRef-b',versionInfo:'2'}]});assert.equal(s.components[0].version,'2');
 assert.throws(()=>readSbom({foo:1}),/Supported formats/);
});
test('historical v1 import preserves, but never silently remaps, answers',()=>{
 const data=parseBackup({schemaVersion:1,products:[{name:'Old',roles:['manufacturer'],answers:{'LEGACY-1':{value:'yes'}}}]});
 assert.equal(data.schema,2);assert.equal(data.products.length,1);
 assert.equal(Object.keys(data.products[0].requirements).length,0);
 assert.equal(data.products[0].legacy.originalAnswers['LEGACY-1'].value,'yes');
});
test('HTML escaping prevents stored markup execution',()=>{
 assert.equal(safeText('<img src=x onerror="x">'),'&lt;img src=x onerror=&quot;x&quot;&gt;');
});
import {maturityMetrics} from '../src/engine.js';
import {MATURITY_CONTROLS,SME_CONTROLS,DOMAINS,REGULATORY_BASELINE} from '../src/data.js';
test('maturity ratings are independent from regulatory scores',()=>{
 const p=newProduct('test');assert.equal(MATURITY_CONTROLS.length,150);assert.equal(SME_CONTROLS.length,25);assert.equal(maturityMetrics(p).average,null);
 p.maturity[MATURITY_CONTROLS[0].id]={current:'3',target:'4'};
 const m=maturityMetrics(p);assert.equal(m.assessed,1);assert.equal(m.below,1);assert.equal(m.average,3);
 assert.equal(requirementMetrics(p).coverage,0);
});

test('backup import rejects untrusted HTML attribute identifiers',()=>{
 const p=newProduct('Security test');p.evidence=[{id:'x\" onfocus=\"alert(1)',title:'Unsafe'}];
 assert.throws(()=>parseBackup({schema:2,products:[p]}),/invalid record identifiers/);
});

test('full catalogue and level-based maturity model are present',()=>{
 assert.equal(REQUIREMENTS.length,118);assert.equal(DOMAINS.length,11);
 assert.equal(MATURITY_CONTROLS.length,150);assert.equal(SME_CONTROLS.length,25);
 assert.equal(MATURITY_CONTROLS.reduce((n,x)=>n+x.levels.length,0),750);
 assert.ok(MATURITY_CONTROLS.every(x=>x.question&&x.evidence));
 assert.equal(new Set([...MATURITY_CONTROLS,...SME_CONTROLS].map(x=>x.id)).size,175);
 assert.equal(REGULATORY_BASELINE.length,3);
});
test('not-applicable decisions without rationale do not count as assessed',()=>{
 const p=newProduct('test');p.requirements['A1-01']={status:'not-applicable'};
 const first=requirementMetrics(p);assert.equal(first.assessed,0);
 p.requirements['A1-01'].notes='No corresponding product function; confirmed through interface inventory.';
 assert.equal(requirementMetrics(p).assessed,1);
});
