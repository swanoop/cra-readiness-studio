import test from 'node:test';
import assert from 'node:assert/strict';
import {buildRegisterCsv,buildPrintReport} from '../src/exports.js';
const product={
 name:'Fictional Gateway',organisation:'Example Engineering',version:'2.0',assessor:'Tester',scopeRationale:'Fictional',
 requirements:{'SEC-01':{status:'gap',notes:'Review required'}},
 evidence:[{id:'e1',title:'Architecture review',reference:'EV-01',review:'accepted',requirementIds:['SEC-01']}],
 actions:[{id:'a1',title:'Fix firmware update',status:'open',owner:'Engineering',due:'2026-12-01'}],
 risks:[],vulnerabilities:[],components:[],documents:{},category:'unconfirmed',purpose:'Demo use'};
const req=[{id:'SEC-01',title:'Threat model',ref:'Art. 13',domain:'Security',guidance:'Is risk documented?'}];
test('CSV exports requirements, evidence and action records',()=>{
 const r=buildRegisterCsv(product,req,'requirements');
 assert.equal(r.count,1);assert.match(r.content,/EV-01/);
 assert.match(buildRegisterCsv(product,req,'actions').content,/Engineering/);
 assert.throws(()=>buildRegisterCsv(product,req,'unknown'),/Unknown export/);
});
test('CSV prevents formula execution in spreadsheet imports',()=>{
 const p={...product,evidence:[{id:'x',title:'=HYPERLINK(1)',reference:'+SUM(1)',review:'referenced'}]};
 const csv=buildRegisterCsv(p,req,'evidence').content;
 assert.match(csv,/\'=HYPERLINK/);assert.match(csv,/\'\+SUM/);
});
test('A4 report is branded and escapes user content',()=>{
 const p={...product,name:'<img src=x onerror=alert(1)>'};
 const html=buildPrintReport({product:p,metrics:{coverage:25,linkedAccepted:1},review:{issues:['Missing evidence']},requirements:req});
 assert.match(html,/CRA Assurance Workbench/);assert.match(html,/@page\{size:A4/);
 assert.match(html,/Example Engineering/);assert.doesNotMatch(html,/<img src=x/);
 const concise=buildPrintReport({product,metrics:{coverage:25,linkedAccepted:1},review:{issues:[]},requirements:req,layout:'summary'});
 assert.doesNotMatch(concise,/Detailed requirement decisions/);
});
