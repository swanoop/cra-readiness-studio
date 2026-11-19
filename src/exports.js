// Offline, evidence-focused export formatters. No external calls or dependencies.
const h=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const csvCell=value=>{
  let text=String(value??'');
  // Treat spreadsheet-like formula prefixes as plain text on import.
  if(/^[\s\u0000-\u001f]*[=+@-]/.test(text))text="'"+text;
  return '"'+text.replace(/"/g,'""')+'"';
};
const joinIds=value=>Array.isArray(value)?value.join('; '):'';
const table=(headers,rows)=>'\uFEFF'+[headers,...rows].map(row=>row.map(csvCell).join(',')).join('\r\n')+'\r\n';
const slug=value=>(String(value||'product').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,48)||'product');
export function buildRegisterCsv(product,requirements,register='requirements') {
  const assessments=product.requirements||{};
  const datasets={
    requirements:()=>[
      ['ID','Domain','Legal reference','Assessment question','Status','Rationale','Reviewer','Evidence references'],
      requirements.map(q=>[q.id,q.domain,q.ref,q.guidance||q.title,assessments[q.id]?.status||'not-assessed',assessments[q.id]?.notes,assessments[q.id]?.reviewer,
        (product.evidence||[]).filter(e=>e.requirementIds?.includes(q.id)).map(e=>e.reference||e.title).join('; ')])
    ],
    evidence:()=>[['ID','Title','Reference','Description','Review state','Linked requirement IDs'],
      (product.evidence||[]).map(e=>[e.id,e.title,e.reference,e.description,e.review,joinIds(e.requirementIds)])],
    risks:()=>[['ID','Title','Scenario','STRIDE','Inherent likelihood','Inherent impact','Residual likelihood','Residual impact','Treatment','Owner','Acceptance','Linked requirements'],
      (product.risks||[]).map(r=>[r.id,r.title,r.scenario,r.stride,r.likelihood,r.impact,r.residualLikelihood,r.residualImpact,r.treatment,r.owner,r.acceptance,joinIds(r.requirementIds)])],
    actions:()=>[['ID','Title','Status','Owner','Due date','Description','Linked requirements'],
      (product.actions||[]).map(a=>[a.id,a.title,a.status,a.owner,a.due,a.description,joinIds(a.requirementIds)])],
    vulnerabilities:()=>[['ID','Reference','Title','Severity','Status','Affected component','Exploit evidence','Linked requirements'],
      (product.vulnerabilities||[]).map(v=>[v.id,v.reference,v.title,v.severity,v.status,v.component||v.affectedComponent,v.exploitEvidence,joinIds(v.requirementIds)])],
    sbom:()=>[['Component ID','Name','Version','Supplier','PURL','Licence','Direct dependencies','Hashes'],
      (product.components||[]).map(c=>[c.id,c.name,c.version,c.supplier,c.purl,c.licence,joinIds(c.dependsOn),(c.hashes||[]).map(z=>z.algorithm+':'+z.value).join('; ')])]
  };
  if(!Object.hasOwn(datasets,register))throw Error('Unknown export register');
  const [headers,rows]=datasets[register]();
  return {filename:`cra-${slug(product.name)}-${register}.csv`,mime:'text/csv;charset=utf-8',content:table(headers,rows),count:rows.length};
}
const list=(rows,empty)=>rows.length?'<ul>'+rows.map(x=>'<li>'+h(x)+'</li>').join('')+'</ul>':'<p class="muted">'+h(empty)+'</p>';
const formatDate=(value)=>{const date=new Date(value);return Number.isFinite(+date)?date.toLocaleDateString('en-GB',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}):'Not recorded';};
export function buildPrintReport({product,metrics,review,requirements,documents=[],layout='detailed',prepared=new Date()}) {
  if(!product||!['detailed','summary'].includes(layout))throw Error('Invalid report selection');
  const org=product.organisation?.trim()||'Organisation not recorded';
  const pending=(product.actions||[]).filter(a=>a.status!=='closed');
  const gaps=requirements.filter(r=>['gap','partial'].includes(product.requirements?.[r.id]?.status));
  const summary=layout==='summary';
  const col=(name,value)=>'<div class="meta"><span>'+h(name)+'</span><strong>'+h(value||'—')+'</strong></div>';
  const tableRows=rows=>rows.map(t=>'<tr>'+t.map(v=>'<td>'+h(v)+'</td>').join('')+'</tr>').join('');
  const date=Number.isFinite(+new Date(prepared))?formatDate(prepared):'Not recorded';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${h(product.name)} · CRA assessment report</title>
  <style>
  @page{size:A4;margin:16mm 15mm}*{box-sizing:border-box}body{font:10.5pt/1.5 Arial,Helvetica,sans-serif;margin:0;color:#1b3145}
  .banner{height:10px;background:#0b726f;margin-bottom:25px}.brand{font-size:9pt;letter-spacing:1.9px;font-weight:bold;text-transform:uppercase;color:#0b726f}
  .brand small{display:block;color:#526474;letter-spacing:.4px;font-size:8pt;margin-top:4px}
  h1{font-size:29pt;line-height:1.12;color:#132e44;margin:24px 0 10px}h2{font-size:14pt;color:#173a50;margin:26px 0 10px;break-after:avoid}
  h3{font-size:10pt;margin:20px 0 8px}p{margin:8px 0}.subtitle{font-size:13pt;color:#607785}
  .muted,small{color:#5e7081}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:20px 0}
  .meta{border-top:1px solid #cddbe2;padding:8px 0}.meta span{font-size:9pt;color:#647887;display:block}.meta strong{font-weight:700}
  .numbers{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:20px 0}
  .number{background:#f1f7f7;padding:14px 12px;border-top:3px solid #087b75;min-height:75px}.number b{font-size:19pt;display:block;color:#173a50}.number span{font-size:8pt;color:#506c78}
  .notice{border-left:4px solid #9f6e1f;background:#faf7ee;padding:12px 14px;font-size:9pt}
  table{border-collapse:collapse;width:100%;table-layout:fixed;font-size:8.5pt;margin:10px 0}
  th,td{border-bottom:1px solid #e1e9ec;text-align:left;vertical-align:top;padding:7px 6px;overflow-wrap:anywhere}
  th{background:#eaf2f4;color:#173a50;font-weight:bold;print-color-adjust:exact}
  td:first-child{font-weight:600}ul{padding-left:17px}li{margin:6px 0;break-inside:avoid}
  section{margin:14px 0;break-inside:auto}.new-page{break-before:page}
  .footer{border-top:1px solid #cddbe2;padding-top:10px;margin-top:24px;font-size:8pt;color:#627987}
  @media print{.banner,.number,th,.notice{print-color-adjust:exact;-webkit-print-color-adjust:exact}thead{display:table-header-group}tr{break-inside:avoid}}
  </style></head><body>
  <div class="banner"></div><div class="brand">CRA Assurance Workbench<small>Product cybersecurity assessment · ${h(org)}</small></div>
  <h1>${h(product.name)}</h1><p class="subtitle">${summary?'Executive assessment summary':'Detailed assessment and evidence report'}</p>
  <div class="grid">${col('Product version',product.version)}${col('Prepared on',date)}${col('Prepared by',product.assessor||product.owner)}${col('Assessment status','Draft · reviewer sign-off required')}</div>
  <div class="notice"><strong>Assessment draft, not a declaration of conformity.</strong>
  Statuses are assessor-entered and evidence references are not independently verified.
  This report does not establish regulatory compliance, notified-body approval or market authorisation.</div>
  <h2>Assessment overview</h2>
  <div class="numbers"><div class="number"><b>${h(metrics.coverage)}%</b><span>Questions assessed</span></div>
  <div class="number"><b>${h(metrics.linkedAccepted)}</b><span>Accepted evidence links</span></div>
  <div class="number"><b>${h(gaps.length)}</b><span>Open gaps / partial</span></div>
  <div class="number"><b>${h(pending.length)}</b><span>Open actions</span></div></div>
  <section><h2>Product scope</h2><p><strong>Recorded category:</strong> ${h(product.category||'Unconfirmed')}</p>
  <p><strong>Scope rationale:</strong> ${h(product.scopeRationale||'Not documented')}</p>
  <p><strong>Intended purpose:</strong> ${h(product.purpose||'Not documented')}</p></section>
  <section><h2>Release review — outstanding decisions</h2>
  ${list(review.issues.slice(0,summary?12:40),'No automated flags in the recorded dataset. Human review remains mandatory.')}</section>
  <section><h2>Priority assessment gaps</h2>
  ${list(gaps.slice(0,summary?12:60).map(q=>q.id+' · '+q.title),'No gaps recorded; check assessment coverage before interpreting this result.')}</section>
  <section><h2>Open action register</h2><table><thead><tr><th>Action</th><th>Status</th><th>Owner</th><th>Due</th></tr></thead><tbody>
  ${tableRows(pending.slice(0,summary?15:500).map(a=>[a.title,a.status,a.owner,a.due]))}</tbody></table></section>
  ${summary?'':`<section class="new-page"><h2>Detailed requirement decisions</h2>
  <table><thead><tr><th style="width:14%">Reference</th><th style="width:33%">Assessment</th><th style="width:17%">Status</th><th>Rationale</th></tr></thead><tbody>
  ${tableRows(requirements.map(q=>[q.ref+' / '+q.id,q.title,product.requirements?.[q.id]?.status||'not-assessed',product.requirements?.[q.id]?.notes||'']))}</tbody></table></section>
  <section><h2>Evidence register</h2><table><thead><tr><th>Reference</th><th>Record</th><th>Review</th><th>Linked requirements</th></tr></thead><tbody>
  ${tableRows((product.evidence||[]).map(e=>[e.reference,e.title,e.review,joinIds(e.requirementIds)]))}</tbody></table></section>
  <section><h2>Technical documentation register</h2><table><thead><tr><th>Document</th><th>Recorded reference</th></tr></thead><tbody>
  ${tableRows(documents.map(d=>[d.label,product.documents?.[d.id]?.reference||'Not recorded']))}</tbody></table></section>`}
  <div class="footer">CRA Assurance Workbench · Local assessment record · Regulation (EU) 2024/2847 · ${h(date)}<br>
  Report scope: recorded facts only. Retain source evidence and seek qualified regulatory review.</div>
  </body></html>`;
}
