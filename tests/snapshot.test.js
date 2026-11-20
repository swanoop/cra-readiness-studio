import test from 'node:test';
import assert from 'node:assert/strict';
import {newProduct,createSnapshot} from '../src/engine.js';
test('release snapshots preserve earlier evidence and risk records',()=>{
 const p=newProduct('Demo');
 p.requirements['A1-01']={status:'partial',notes:'Initial review.'};
 p.evidence.push({id:'e1',title:'Initial evidence',requirementIds:['A1-01'],review:'referenced'});
 p.risks.push({id:'r1',title:'Initial risk',likelihood:2,impact:4,residualLikelihood:1,residualImpact:2});
 const snap=createSnapshot(p,'Baseline');
 p.requirements['A1-01'].status='implemented';
 p.evidence[0].title='Changed';p.risks[0].title='Changed';
 assert.equal(snap.requirements['A1-01'].status,'partial');
 assert.equal(snap.state.evidence[0].title,'Initial evidence');
 assert.equal(snap.state.risks[0].title,'Initial risk');
 assert.equal(snap.snapshotVersion,2);
 assert.ok(!('releases' in snap.state));
});
