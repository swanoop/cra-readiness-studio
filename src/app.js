import {REQUIREMENTS,DOMAINS,DOCS,MATURITY_CONTROLS,MATURITY_DOMAINS,STATUS_LABEL,STATUS,REVIEWS,STEPS,STRIDE,SME_CONTROLS,SME_DOMAINS,REGULATORY_BASELINE,LAW} from './data.js';
import {newProduct,uid,scope,requirementMetrics,maturityMetrics,relevantRequirements,riskRating,releaseReview,createSnapshot,compareSnapshot,reportingDeadlines,safeText as esc,isoDate} from './engine.js';
import {loadWorkspace,persistWorkspace,exportWorkspace,downloadText,parseBackup,getProduct} from './store.js';
import {readSbom} from './sbom.js';
import {encryptWorkspace,decryptWorkspace,isEncryptedBackup} from './secure-backup.js';
import {buildRegisterCsv,buildPrintReport} from './exports.js';
import {requestPassword} from './password-dialog.js';
import {createPages} from './pages.js';

const app=document.querySelector('#app');
let work=loadWorkspace();let page='overview';let filter='all';let search='';let toastText='';let storageFailure=false;let maturityMode='sme';
const ROUTES=[['overview','Overview','01'],['product','Product & scope','02'],['requirements','Requirements','03'],['maturity','Security maturity','04'],['traceability','Traceability','05'],['evidence','Evidence register','06'],['risks','Threats & risks','07'],['actions','Action plan','08'],['releases','Release reviews','09'],['sbom','SBOM explorer','10'],['vulnerabilities','Vulnerabilities','11'],['reporting','Incident reporting','12'],['documents','Documentation','13'],['settings','Data & settings','14'],['export','Reports & exports','15']];
const CORE_PAGES=['overview','product','requirements','evidence','actions','releases','export'];
const CORE_ROUTES=ROUTES.filter(r=>CORE_PAGES.includes(r[0]));
const ADVANCED_ROUTES=ROUTES.filter(r=>!CORE_PAGES.includes(r[0]));
function navLink([id,label]){
 const selected=page===id;
 return '<button class="nav-link '+(selected?'active':'')+'" data-nav="'+id+'" '+(selected?'aria-current="page"':'')+
 '>'+esc(label)+'</button>';
}
function navigationHtml(){
 return '<nav class="navigation" aria-label="Assessment workflow"><span class="nav-heading">Assessment workflow</span>'+
 CORE_ROUTES.map(navLink).join('')+
 '<details class="nav-more" '+(ADVANCED_ROUTES.some(r=>r[0]===page)?'open':'')+'>'+
 '<summary>Advanced tools <span aria-hidden="true">⌄</span></summary>'+
 ADVANCED_ROUTES.map(navLink).join('')+'</details></nav>';
}
const attr=v=>esc(v);const option=(v,t,current)=>`<option value="${attr(v)}" ${String(v)===String(current)?'selected':''}>${esc(t)}</option>`;
const selected=(list,current)=>list.map(([v,t])=>option(v,t,current)).join('');
const select=(name,options,value)=>`<select name="${attr(name)}">${selected(options,value)}</select>`;
const input=(name,val='',type='text',placeholder='')=>`<input type="${type}" name="${attr(name)}" value="${attr(val)}" placeholder="${attr(placeholder)}"/>`;
const textarea=(name,val='',placeholder='')=>`<textarea name="${attr(name)}" rows="3" placeholder="${attr(placeholder)}">${esc(val)}</textarea>`;
const field=(title,content,description='')=>`<label class="field"><span>${title}</span>${content}${description?`<small>${description}</small>`:''}</label>`;
const tag=(text,tone='neutral')=>`<span class="tag ${tone}">${esc(text)}</span>`;
function notify(message){toastText=message;render();}
function save(){const p=getProduct(work);if(p)p.updated=new Date().toISOString();try{persistWorkspace(work);storageFailure=false;}catch(e){storageFailure=true;}render();}
function navigate(p){page=ROUTES.some(x=>x[0]===p)?p:'overview';location.hash=page;filter='all';search='';render();window.scrollTo({top:0,behavior:'instant'});}
function header(title,sub='',actions=''){return `<header class="page-header"><div><span class="eyebrow">CRA / PRODUCT ASSURANCE</span><h1>${esc(title)}</h1>${sub?`<p>${esc(sub)}</p>`:''}</div>${actions?`<div class="page-header-actions">${actions}</div>`:''}</header>`;}
function notice(text,kind='info'){return `<div class="notice ${kind}"><span class="notice-icon">i</span><p>${text}</p></div>`;}
function empty(title,description,cta=''){return `<div class="empty"><span class="empty-mark">◎</span><h3>${esc(title)}</h3><p>${esc(description)}</p>${cta}</div>`;}
function btn(label,act,cls=''){return `<button type="button" class="button ${cls}" data-action="${act}">${label}</button>`;}
function metric(value,title,note=''){return `<div class="metric"><span class="metric-label">${esc(title)}</span><strong>${esc(value)}</strong><span class="metric-note">${esc(note)}</span></div>`;}
function p(){return getProduct(work);}
function requireProduct(title){return empty('Create a product to begin',`${title} becomes available once a product profile exists.`,btn('Create product','new-product','primary'));}
function productSelector(){const name=p()?.name||'No product selected';return `<div class="product-selector"><span>WORKSPACE</span><select aria-label="Current product" id="choose-product"><option value="" ${p()?'':'selected'} disabled>${esc(name)}</option>${work.products.map(x=>option(x.id,`${x.name} · ${x.version||'version not set'}`,p()?.id)).join('')}</select></div>`;}
function frame(){const current=ROUTES.find(x=>x[0]===page)?.[1]||'Overview';return `<div class="shell"><aside class="sidebar" id="sidebar"><div class="brand"><span class="brand-logo"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 12h34M7 24h25M7 36h34" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="37" cy="24" r="5" fill="currentColor"/></svg></span><span><strong>CRA Assurance</strong><small>WORKBENCH / PRODUCT SECURITY</small></span></div>${productSelector()}${navigationHtml()}<div class="sidebar-bottom"><span class="green-dot"></span> Local-first workspace<p>Data remains in this browser unless you export it. Not a regulatory certification service.</p><span class="legal-reference">Regulation (EU) 2024/2847</span></div></aside><div class="main-shell"><div class="topbar"><button class="mobile-menu" data-action="mobile-nav" aria-label="Toggle menu">☰</button><div class="breadcrumb">Product Security <span>/</span> ${esc(current)}</div><div class="top-actions"><span class="local-label"><span class="green-dot"></span> Saved locally</span>${btn('Reports & exports','export','quiet')}${btn('+ New product','new-product','primary small')}</div></div><main id="content" tabindex="-1">${content()}</main><footer class="footer"><span>CRA ASSURANCE WORKBENCH · Independent product-security assessment</span><span>Regulatory baseline: EU 2024/2847 · Guidance reviewed Nov 2026</span></footer></div></div>${toastText?`<div role="status" class="toast">${esc(toastText)} <button data-action="clear-toast" aria-label="Dismiss notice">×</button></div>`:''}`;}
function printDocument(){
 const x=p();if(!x)return;
 const layout=document.querySelector('#report-layout')?.value||'detailed';
 const html=buildPrintReport({product:x,metrics:requirementMetrics(x),review:releaseReview(x),
   requirements:relevantRequirements(x),documents:DOCS,layout});
 const w=window.open('','_blank');
 if(!w){notify('Allow pop-ups for this site and retry the PDF export.');return;}
 w.document.open();w.document.write(html);w.document.close();
 w.focus();
 setTimeout(()=>w.print(),180);
}
function content(){const views=createPages({work,filter,search,maturityMode,p,header,notice,empty,btn,tag,metric,field,input,textarea,select,selected,attr,requireProduct});switch(page){case'overview':return views.overview();case'product':return views.productPage();case'requirements':return views.requirementsPage();case'maturity':return views.maturityPage();case'traceability':return views.traceabilityPage();case'evidence':return views.evidencePage();case'risks':return views.risksPage();case'actions':return views.actionsPage();case'releases':return views.releasesPage();case'sbom':return views.sbomPage();case'vulnerabilities':return views.vulnerabilitiesPage();case'reporting':return views.reportingPage();case'documents':return views.documentsPage();case'settings':return views.settingsPage();case'export':return views.exportsPage();default:return views.overview();}}
function render(){app.innerHTML=frame();}
const values=(form)=>Object.fromEntries([...new FormData(form).entries()]);
const parseIds=s=>String(s||'').split(/[,;\s]+/).map(s=>s.trim().toUpperCase()).filter(z=>REQUIREMENTS.some(r=>r.id===z)).filter((v,i,a)=>a.indexOf(v)===i);
function addDemo(){const x=newProduct('Industrial Edge Gateway · demo');Object.assign(x,{version:'2.2',organisation:'Illustrative manufacturer',owner:'Product security team',assessor:'Example assessor',eu:'yes',digital:'yes',commercial:'yes',exemption:'no',purpose:'Illustrative OT gateway linking field networks to a managed network; fictional example only.',scopeRationale:'Demonstration only — not a legal determination.'});REQUIREMENTS.forEach((r,i)=>{if(i%4!==3)x.requirements[r.id]={status:i%4===0?'implemented':i%4===1?'partial':'gap',notes:'Fictional assessment for UI demonstration.'};});x.evidence.push({id:uid(),title:'Architecture review record',reference:'DEMO-ARCH-01',description:'Illustrative evidence reference, not a real review.',requirementIds:['A1-01','A1-11'],review:'accepted'});x.risks.push({id:uid(),title:'Weak management interface authentication',stride:'Spoofing',scenario:'A remote user might impersonate an authorised administrator.',requirementIds:['A1-05'],likelihood:3,impact:4,residualLikelihood:2,residualImpact:3,treatment:'Enforce MFA and restrict administrative interfaces.',owner:'Engineering',acceptance:'open'});x.actions.push({id:uid(),title:'Verify firmware update process',owner:'Platform team',due:'',description:'Demonstrate authenticated signing and rollback behaviour.',status:'in-progress',requirementIds:['A1-04','VH-07']});work.products.push(x);work.productId=x.id;save();notify('Fictional demonstration added.');}
app.addEventListener('click',e=>{const nav=e.target.closest('[data-nav]');if(nav){navigate(nav.dataset.nav);return;}const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;const x=p();
 if(a==='clear-toast'){toastText='';render();return;}
 if(a.startsWith('maturity-mode:')){maturityMode=a.split(':')[1]==='sme'?'sme':'professional';render();return;}
 if(a==='mobile-nav'){document.querySelector('#sidebar')?.classList.toggle('sidebar-open');return;}
 if(a==='reference'){navigate('requirements');return;}
 if(ROUTES.some(r=>r[0]===a)){navigate(a);return;}
 if(a==='new-product'){const n=newProduct(`New product ${work.products.length+1}`);work.products.push(n);work.productId=n.id;save();navigate('product');return;}
 if(a==='export-workspace'){downloadText('cra-assurance-workbench-backup.json',exportWorkspace(work),'application/json');toastText='Backup downloaded. Store it securely.';render();return;}
 if(a==='csv-export'){
 const product=p();if(!product){notify('Create an assessment first.');return;}
 const register=document.querySelector('#csv-register')?.value||'requirements';
 try{
   const csv=buildRegisterCsv(product,relevantRequirements(product),register);
   downloadText(csv.filename,csv.content,csv.mime);
   notify(csv.count+' '+register+' rows exported.');
 }catch(error){notify(error.message||'CSV export failed.');}
 return;
}
 if(a==='encrypted-backup'){requestPassword({title:'Protect the exported backup',confirm:true}).then(pass=>{if(pass===null)return;return encryptWorkspace(exportWorkspace(work),pass).then(blob=>{downloadText('cra-assurance-workbench-encrypted.json',JSON.stringify(blob,null,2),'application/json');notify('Encrypted backup downloaded; store the password securely.');}).catch(()=>notify('Encryption failed. Check Web Crypto availability and storage.'));});return;}
 if(a==='demo-product'){addDemo();navigate('overview');return;}
 if(a==='clear-workspace'){if(confirm('Delete ALL products saved by this application in this browser? Export a backup before proceeding.')){work={schema:2,productId:null,products:[]};save();navigate('overview');}return;}
 if(a==='print-report'){printDocument();return;}
 if(a==='seed-actions'&&x){const gaps=relevantRequirements(x).filter(q=>['gap','partial'].includes(x.requirements[q.id]?.status));let added=0;for(const q of gaps){if(x.actions.some(z=>z.sourceRequirementId===q.id))continue;x.actions.push({id:uid(),title:'Resolve: '+q.title,description:'Assess gap, define treatment and retain verification evidence. '+q.ref,owner:'',due:'',status:'open',sourceRequirementId:q.id,requirementIds:[q.id]});added++;}save();notify(added+' linked remediation actions added; duplicates skipped.');return;}
 if(a==='clear-sbom'&&x){if(confirm('Clear the imported SBOM inventory for this product?')){x.components=[];save();}return;}
 if(a.startsWith('evidence-for:')){navigate('evidence');const r=a.split(':')[1];const inp=app.querySelector('[name=requirementIds]');if(inp)inp.value=r;return;}
 if(!x)return;
 const [command,id]=a.split(':');
 const kinds={'delete-evidence':'evidence','delete-risk':'risks','delete-action':'actions','delete-vulnerability':'vulnerabilities'};if(kinds[command]){if(confirm('Delete this record?')){x[kinds[command]]=x[kinds[command]].filter(t=>t.id!==id);save();}return;}
 if(command==='accept-risk'){const r=x.risks.find(z=>z.id===id);if(r){r.acceptance=r.acceptance==='accepted'?'open':'accepted';save();}return;}
});
app.addEventListener('change',async e=>{const t=e.target;const x=p();if(t.id==='choose-product'){work.productId=t.value;save();return;}if(t.id==='requirements-filter'){filter=t.value;render();return;}if(t.dataset.maturity&&x){const opened=[...document.querySelectorAll('.maturity-group[open],.maturity-control[open]')].map(z=>z.id);x.maturity??={};x.maturity[t.dataset.maturity]??={};x.maturity[t.dataset.maturity][t.dataset.maturityField]=String(t.value);save();for(const id of opened)document.getElementById(id)?.setAttribute('open','');return;}if(t.dataset.requirement&&x){x.requirements[t.dataset.requirement]??={};x.requirements[t.dataset.requirement][t.dataset.reqField]=t.value;save();const det=document.querySelector('#r-'+t.dataset.requirement);det?.setAttribute('open','');return;}if(t.dataset.evidenceReview&&x){const z=x.evidence.find(z=>z.id===t.dataset.evidenceReview);if(z){z.review=t.value;save();}return;}if(t.dataset.vulnerabilityStatus&&x){const v=x.vulnerabilities?.find(z=>z.id===t.dataset.vulnerabilityStatus);if(v){v.status=t.value;save();}return;}if(t.dataset.actionStatus&&x){const z=x.actions.find(z=>z.id===t.dataset.actionStatus);if(z){z.status=t.value;save();}return;}
 if(t.id==='sbom-upload'&&x){const f=t.files[0];if(!f)return;if(f.size>5*1024*1024){notify('SBOM is larger than the 5 MB limit.');return;}try{const z=readSbom(JSON.parse(await f.text()));x.components=z.components;x.sbomInfo={format:z.format,importedAt:z.importedAt,coverage:z.coverage,warnings:z.warnings};save();notify(`${z.components.length} components imported. No online vulnerability lookup performed.`);}catch(err){notify(err.message||'Cannot parse this SBOM.');}return;}
 if(t.id==='backup-import'){const f=t.files[0];if(!f)return;if(f.size>10*1024*1024){notify('Backup exceeds 10 MB.');return;}try{let contents=JSON.parse(await f.text());if(isEncryptedBackup(contents)){const pass=await requestPassword({title:'Unlock imported backup'});if(pass===null)return;contents=JSON.parse(await decryptWorkspace(contents,pass));}const imported=parseBackup(contents);if(confirm('Replace the current browser workspace with this imported backup? Export the current workspace first if needed.')){work=imported;save();navigate('overview');notify('Backup imported. Review any preserved legacy fields.');}}catch(err){notify(err.message||'Import failed.');}}
});
app.addEventListener('input',e=>{if(e.target.id!=='requirement-search')return;search=e.target.value;const cursor=e.target.selectionStart;render();const el=document.querySelector('#requirement-search');el?.focus();el?.setSelectionRange(cursor,cursor);});
app.addEventListener('submit',e=>{const form=e.target.closest('[data-form]');if(!form)return;e.preventDefault();const k=form.dataset.form;const v=values(form);const x=p();if(!x)return;
 if(k==='profile'){for(const key of ['name','version','organisation','owner','assessor','role','eu','digital','commercial','exemption','category','placed','supportEnd','purpose','scopeRationale'])x[key]=String(v[key]||'').trim();}
 if(k==='evidence'){if(!String(v.title||'').trim())return notify('Evidence title is required.');x.evidence.push({id:uid(),title:v.title,reference:v.reference,description:v.description,requirementIds:parseIds(v.requirementIds),review:'referenced'});}
 if(k==='risk'){if(!String(v.title||'').trim())return notify('Risk title is required.');x.risks.push({id:uid(),...v,requirementIds:parseIds(v.requirementIds),acceptance:'open'});}
 if(k==='action'){if(!String(v.title||'').trim())return notify('Action title is required.');x.actions.push({id:uid(),...v,requirementIds:parseIds(v.requirementIds),status:'open'});}
 if(k==='vulnerability'){if(!String(v.reference||v.title||'').trim())return notify('Enter an identifier or title.');x.vulnerabilities??=[];x.vulnerabilities.push({id:uid(),...v,status:'open',requirementIds:parseIds(v.requirementIds)});}
 if(k==='snapshot'){x.releases.push(createSnapshot(x,String(v.label||`Review ${x.version}`).slice(0,160)));}
 if(k==='incident'){
   x.incident={...v};
   for(const key of ['awareness','remedy','notification']){
     if(v[key]){
       const parsed=new Date(v[key]);
       if(!Number.isFinite(parsed.getTime()))return notify('Enter a valid date and time.');
       x.incident[key]=parsed.toISOString();
     }
   }
 }
 if(k==='documents')for(const d of DOCS)x.documents[d.id]={reference:String(v[d.id]||'').trim()};
 save();toastText=`${k[0].toUpperCase()+k.slice(1)} saved in this browser.`;render();});
window.addEventListener('hashchange',()=>{const next=location.hash.slice(1);if(next!==page)navigate(next);});
page=ROUTES.some(r=>r[0]===location.hash.slice(1))?location.hash.slice(1):'overview';render();
