// Independent editorial checklist based on Regulation (EU) 2024/2847.
// Prompts are assessor aids, NOT verbatim legislative requirements or a conformity decision.
export const LAW='Regulation (EU) 2024/2847';
export const GUIDANCE='Commission implementation guidance (27 July 2026)';
const product = [
['A1-01','Risk-based cybersecurity','Annex I, Part I(1)','Document how security architecture and assurance activities reflect product risk.'],
['A1-02','Known exploitable vulnerabilities','Annex I, Part I(2)(a)','Record release checks and treatment of known exploitable vulnerabilities.'],
['A1-03','Secure-by-default configuration','Annex I, Part I(2)(b)','Review initial settings, reset behaviour and agreed product exceptions.'],
['A1-04','Security update capability','Annex I, Part I(2)(c)','Demonstrate the update mechanism, notification and postponement options where applicable.'],
['A1-05','Access control and authentication','Annex I, Part I(2)(d)','Review authentication, authorisation and unauthorised-access reporting.'],
['A1-06','Data confidentiality','Annex I, Part I(2)(e)','Identify sensitive data and assess appropriate confidentiality protections.'],
['A1-07','Data and command integrity','Annex I, Part I(2)(f)','Validate protection against unauthorised changes and corruption reporting.'],
['A1-08','Data minimisation','Annex I, Part I(2)(g)','Document necessary collection, retention and processing of data.'],
['A1-09','Availability and resilience','Annex I, Part I(2)(h)','Review incident resilience and measures against denial of service.'],
['A1-10','Impact on other services','Annex I, Part I(2)(i)','Assess potential disruption caused to connected systems or networks.'],
['A1-11','Attack surface reduction','Annex I, Part I(2)(j)','Review exposed interfaces, services and reachable functionality.'],
['A1-12','Exploit impact mitigation','Annex I, Part I(2)(k)','Identify mechanisms that limit incident impact and exploitability.'],
['A1-13','Security logging and monitoring','Annex I, Part I(2)(l)','Record security events and appropriate monitoring/opt-out capabilities.'],
['A1-14','Secure data and settings removal','Annex I, Part I(2)(m)','Review permanent removal and secure data transfer where provided.']
];
const vuln=[
['VH-01','Inventory and software bill of materials','Annex I, Part II(1)','Identify vulnerabilities and components, including a machine-readable SBOM covering at least top-level dependencies.'],
['VH-02','Vulnerability remediation','Annex I, Part II(2)','Define remediation without delay and security update practices.'],
['VH-03','Regular security tests and reviews','Annex I, Part II(3)','Record an effective and recurrent product security assurance programme.'],
['VH-04','Fixed-vulnerability disclosure','Annex I, Part II(4)','Document appropriate communications concerning fixed vulnerabilities and remediation advice.'],
['VH-05','Coordinated vulnerability disclosure policy','Annex I, Part II(5)','Maintain an enforceable vulnerability disclosure policy.'],
['VH-06','Vulnerability reporting contact','Annex I, Part II(6)','Provide methods for external reporting, including third-party component issues.'],
['VH-07','Secure security-update distribution','Annex I, Part II(7)','Verify integrity and timeliness of security update distribution.'],
['VH-08','Security advisory and free update practices','Annex I, Part II(8)','Verify appropriate dissemination and user advice, taking account of specific permitted arrangements.']
];
const processes=[
['PR-01','Product cybersecurity risk assessment','Article 13(2)','Prepare and maintain a lifecycle product cybersecurity risk assessment.'],
['PR-02','Technical documentation','Article 13; Annex VII','Document the product and supporting security engineering evidence.'],
['PR-03','Support period justification','Article 13','Record expected use and rationale for support and vulnerability handling.'],
['PR-04','Conformity assessment route review','Articles 7–8; Article 32','Determine the product category and evaluate the applicable conformity route; obtain expert review.'],
['PR-05','EU declaration and marking review','Articles 28–30; Annex V','Track readiness to complete relevant conformity documentation and marking obligations.'],
['PR-06','Product and manufacturer identification','Article 13; Annex II','Check user-facing product and manufacturer information.'],
['PR-07','Instructions and secure operation','Annex II','Verify user instructions cover secure use, installation and relevant security information.'],
['PR-08','Supply chain component oversight','Article 13; Annex I','Identify dependencies and document third-party component vulnerability processes.'],
['PR-09','Reportable vulnerability response','Article 14','Maintain a process to detect, evaluate and report actively exploited vulnerabilities.'],
['PR-10','Severe incident reporting response','Article 14','Maintain a process to evaluate/report severe incidents affecting product security.'],
['PR-11','Substantial modification assessment','Article 3; Article 13','Evaluate whether post-placement changes alter regulatory obligations.'],
['PR-12','Operator role identification','Articles 13; 19–24','Identify relevant manufacturer, importer, distributor or steward responsibilities.']
];
function create(list,domain){return list.map(([id,title,ref,guidance])=>({id,title,ref,guidance,domain,priority: id==='A1-02'||id==='VH-02'||id==='PR-09'||id==='PR-10'?'priority':'standard',roles: domain==='Operator processes'?['manufacturer','importer','distributor','steward','other']:['manufacturer']}));}
import {EXPANDED_REQUIREMENTS} from './regulatory-expanded.js';
export const REQUIREMENTS=[...create(product,'Product properties'),...create(vuln,'Vulnerability handling'),...create(processes,'Operator processes'),...EXPANDED_REQUIREMENTS];
export const DOMAINS=[...new Set(REQUIREMENTS.map(x=>x.domain))];
export const DOCS=[
['description','Product description and intended purpose'],['version','Product versions, variants and identifiers'],['architecture','Design and development architecture'],['risk','Cybersecurity risk assessment'],['requirements','Applicable requirements and rationale'],['verification','Verification, validation and test evidence'],['vulnerabilities','Vulnerability handling and support process'],['sbom','Component inventory and SBOM reference'],['user','User information and security instructions'],['conformity','Applicable conformity assessment documentation']
].map(([id,label])=>({id,label}));
export const STRIDE=[['S','Spoofing'],['T','Tampering'],['R','Repudiation'],['I','Information disclosure'],['D','Denial of service'],['E','Elevation of privilege']];
export const STATUS=['not-assessed','implemented','partial','gap','not-applicable'];
export const STATUS_LABEL={'not-assessed':'Not assessed','implemented':'Implemented','partial':'Partly implemented','gap':'Not implemented','not-applicable':'Not applicable'};
export const REVIEWS=['unreviewed','referenced','reviewed','accepted','rejected'];
export const STEPS=['open','in-progress','verification','closed'];
export const REGULATORY_BASELINE=[{label:'Cyber Resilience Act',ref:'Regulation (EU) 2024/2847'},{label:'Important and critical product category descriptions',ref:'Implementing Regulation (EU) 2025/2392'},{label:'CRA implementation guidance',ref:'Commission guidance dated 27 July 2026'}];
// Original, non-regulatory internal maturity prompts. This is NOT an ENISA or standards-certified model.
const maturityGroups={
 'Governance & accountability':[
 'Document product security roles and accountable reviewers',
 'Maintain a product cybersecurity policy and review cycle',
 'Apply formal security acceptance criteria to release decisions',
 'Track risk treatment ownership and leadership decisions',
 'Maintain records of product security training and competence'
 ],
 'Secure development':[
 'Define product threat-model boundaries and trust relationships',
 'Perform security reviews of new interfaces and data flows',
 'Apply code and configuration review controls to changes',
 'Protect and audit build and release processes',
 'Define and verify product security acceptance tests'
 ],
 'Vulnerability management':[
 'Maintain a contact and intake process for vulnerability reports',
 'Triage and prioritise reports based on product context',
 'Maintain and review software component inventory',
 'Track patches, mitigation effectiveness and deployment',
 'Communicate vulnerability advisories to affected users'
 ],
 'Operational resilience':[
 'Identify essential functions and availability dependencies',
 'Design recovery and restoration procedures for the product',
 'Validate security event recording and diagnostic information',
 'Test update failures and rollback scenarios',
 'Review user guidance for secure deployment and hardening'
 ],
 'Assurance & evidence':[
 'Maintain versioned technical and architecture documentation',
 'Trace security risks to controls and test outcomes',
 'Review technical evidence before accepting implementation claims',
 'Track unresolved security findings to closure',
 'Reassess product security following material changes'
 ]
};
export const SME_CONTROLS=Object.entries(maturityGroups).flatMap(([domain,items],di)=>items.map((title,i)=>({id:`M-${di+1}${String(i+1).padStart(2,'0')}`,title,domain,target:4})));
export const SME_DOMAINS=Object.keys(maturityGroups);

import {PROFESSIONAL_CONTROLS} from './professional-maturity.js';
export const MATURITY_CONTROLS=PROFESSIONAL_CONTROLS;
export const MATURITY_DOMAINS=[...new Set(MATURITY_CONTROLS.map(c=>c.domain))];
