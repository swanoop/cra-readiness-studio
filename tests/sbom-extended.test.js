import test from 'node:test';
import assert from 'node:assert/strict';
import {readSbom} from '../src/sbom.js';
test('CycloneDX nested components and relationships survive import',()=>{
 const x=readSbom({bomFormat:'CycloneDX',specVersion:'1.6',
 components:[{'bom-ref':'root',name:'Gateway',hashes:[{alg:'SHA-256',content:'ab'}],
  components:[{'bom-ref':'dep',name:'Library',version:'1'}]}],
 dependencies:[{ref:'root',dependsOn:['dep']}]});
 assert.equal(x.components.length,2);
 const root=x.components.find(c=>c.id==='root');
 assert.deepEqual(root.dependsOn,['dep']);
 assert.equal(root.hashes[0].algorithm,'SHA-256');
 assert.match(x.coverage.label,/not BSI compliance/);
});
test('SPDX 2.x and preliminary SPDX 3.x graph links',()=>{
 const x=readSbom({spdxVersion:'SPDX-2.3',packages:[{SPDXID:'r',name:'root'},{SPDXID:'d',name:'dep'}],
  relationships:[{spdxElementId:'r',relationshipType:'DEPENDS_ON',relatedSpdxElement:'d'}]});
 assert.deepEqual(x.components[0].dependsOn,['d']);
 const z=readSbom({'@graph':[{'type':'software_Package',spdxId:'a',name:'A'},
  {'type':'software_Package',spdxId:'b',name:'B'},{type:'Relationship',from:'a',to:['b'],relationshipType:'dependsOn'}]});
 assert.equal(z.components.length,2);assert.deepEqual(z.components[0].dependsOn,['b']);
});
test('duplicate component identities are rejected',()=>{
 assert.throws(()=>readSbom({bomFormat:'CycloneDX',specVersion:'1.6',components:[
 {'bom-ref':'duplicate',name:'A'},{'bom-ref':'duplicate',name:'B'}]}),/duplicate/);
});
