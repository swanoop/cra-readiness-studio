import test from 'node:test';
import assert from 'node:assert/strict';
import {SME_CONTROLS} from '../src/data.js';
test('all 25 core maturity practices have authored prompts and evidenced five-level anchors',()=>{
 assert.equal(SME_CONTROLS.length,25);
 assert.equal(new Set(SME_CONTROLS.map(c=>c.question)).size,25);
 for(const control of SME_CONTROLS){
  assert.ok(control.question.length>50,control.id);
  assert.ok(control.evidence.length>50,control.id);
  assert.equal(control.levels.length,5,control.id);
  assert.equal(new Set(control.levels).size,5,control.id);
  assert.ok(control.levels.every(level=>level.length>20),control.id);
  assert.doesNotMatch(control.question,/How consistently does the organisation perform/i);
 }
});
