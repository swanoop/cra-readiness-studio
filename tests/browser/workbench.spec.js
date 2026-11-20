import {test,expect} from '@playwright/test';
import {resolve} from 'node:path';
const sample=resolve('examples/industrial-gateway.json');
async function importDemo(page){
  await page.goto('/#settings');
  await expect(page.locator('#backup-import')).toHaveCount(1);
  page.once('dialog',d=>d.accept());
  await page.locator('#backup-import').setInputFiles(sample);
  await expect(page.locator('#content')).toContainText('Assessment overview');
}
test('all routes render without browser exceptions or network leaks',async({page})=>{
  const errors=[],outbound=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',request=>{if(!request.url().startsWith('http://127.0.0.1:8765/'))outbound.push(request.url());});
  await page.goto('/');
  await importDemo(page);
  const routes=['overview','product','requirements','maturity','traceability','evidence','risks','actions','releases','sbom','vulnerabilities','reporting','documents','settings','export'];
  for(const name of routes){
    await page.goto('/#'+name);
    await expect(page.locator('#content .page-header')).toBeVisible();
    await expect(page.locator('body')).not.toContainText('Uncaught');
  }
  expect(errors).toEqual([]);
  expect(outbound).toEqual([]);
});
test('partly completed assessments are in progress and role total is displayed',async({page})=>{
  await page.goto('/');
  await importDemo(page);
  await expect(page.locator('.workflow-card').filter({hasText:'Assess requirements'})).toContainText('In progress');
  await page.goto('/#requirements');
  await expect(page.locator('#content .page-header')).toContainText('apply to the manufacturer role');
});
test('encrypted backup uses masked modal, validation, and a download',async({page})=>{
  await page.goto('/#settings');
  await page.locator('[data-action="encrypted-backup"]').click();
  const modal=page.locator('dialog.password-dialog');
  await expect(modal).toBeVisible();
  await expect(modal.locator('input[name="secret"]')).toHaveAttribute('type','password');
  await modal.locator('input[name="secret"]').fill('short');
  await modal.locator('button[type="submit"]').click();
  await expect(modal).toContainText('at least 16 characters');
  await modal.locator('input[name="secret"]').fill('A-Unique-Long-Demo-Passphrase-2026');
  await modal.locator('input[name="again"]').fill('A-Unique-Long-Demo-Passphrase-2026');
  const download=page.waitForEvent('download');
  await modal.locator('button[type="submit"]').click();
  expect((await download).suggestedFilename()).toMatch(/encrypted.*json$/);
});
test('HTML in user-controlled profile fields is rendered as text',async({page})=>{
  await page.goto('/');
  await page.locator('[data-action="new-product"]').first().click();
  const profile=page.locator('form[data-form="profile"]');
  await profile.locator('[name="name"]').fill('<img src=x onerror=alert(1)>');
  await profile.locator('[name="organisation"]').fill('<script>window.X=1</script>');
  await profile.locator('button[type="submit"]').click();
  await expect(page.locator('#content')).toContainText('<img src=x onerror=alert(1)>');
  expect(await page.locator('#content img[src="x"]').count()).toBe(0);
  expect(await page.evaluate(()=>window.X)).toBeUndefined();
});
test('CSV export downloads a register and stays local',async({page})=>{
  await page.goto('/');
  await importDemo(page);
  await page.goto('/#export');
  const dl=page.waitForEvent('download');
  await page.locator('[data-action="csv-export"]').first().click();
  expect((await dl).suggestedFilename()).toMatch(/csv$/);
});

test('encrypted IndexedDB migration removes plaintext records and locks on reload',async({page})=>{
 await page.goto('/');
 await page.locator('[data-action="new-product"]').first().click();
 await page.goto('/#settings');
 await page.locator('[data-action="vault-enable"]').click();
 const modal=page.locator('dialog.password-dialog');
 await modal.locator('[name="secret"]').fill('Long-Unique-Vault-Passphrase-2026');
 await modal.locator('[name="again"]').fill('Long-Unique-Vault-Passphrase-2026');
 await modal.locator('button[type="submit"]').click();
 await expect(page.locator('#content')).toContainText('Encrypted IndexedDB');
 expect(await page.evaluate(()=>localStorage.getItem('cra-readiness-studio-independent-v1'))).toBeNull();
 await page.reload();
 await expect(page.locator('#content')).toContainText('Encrypted workspace locked');
 await page.locator('[data-action="vault-unlock"]').click();
 await page.locator('dialog.password-dialog [name="secret"]').fill('Long-Unique-Vault-Passphrase-2026');
 await page.locator('dialog.password-dialog button[type="submit"]').click();
 await expect(page.locator('#content')).toContainText('New product 1');
});

test('narrow viewport layout does not have page-level horizontal overflow',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/');
 await expect(page.locator('#content')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)).toBe(true);
});
