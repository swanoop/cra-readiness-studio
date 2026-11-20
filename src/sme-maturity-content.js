// Independent, original editorial rubric for product-security process maturity.
// Not a reproduction, endorsement or conformity assessment model from ENISA.
const entries=[
  [
    "M-101",
    "Who is accountable for product cybersecurity decisions, and how are cross-team responsibilities resolved?",
    "Approved RACI, role appointments, escalation decisions and sampled engineering tickets.",
    [
      "No named product-security owner or documented decision authority.",
      "An individual informally takes responsibility, but hand-offs and escalations are inconsistent.",
      "Product-security roles, deputies and escalation rules are approved and used.",
      "Sampled product decisions show assigned authority, review and independent challenge.",
      "Role performance and decision delays are analysed, with documented improvement actions."
    ]
  ],
  [
    "M-102",
    "How is the product-security policy kept applicable to product families, releases and suppliers?",
    "Approved policy, review history, product tailoring decisions and supplier obligations.",
    [
      "No product-security policy is available.",
      "Security expectations exist in isolated team documents.",
      "An approved policy defines product coverage, responsibilities and periodic review.",
      "Release and supplier samples demonstrate policy application and controlled exceptions.",
      "Policy effectiveness is reviewed against incident, audit and engineering trend evidence."
    ]
  ],
  [
    "M-103",
    "What security criteria must a release satisfy, and who can approve residual exceptions?",
    "Release-gate checklist, risk acceptance authority, sign-off records and rejected releases.",
    [
      "Release decisions omit explicit cybersecurity criteria.",
      "Security checks are performed when concerns arise.",
      "Documented security exit criteria and risk acceptance authorities govern release.",
      "Independent samples confirm evidence review, exception tracking and authorised approvals.",
      "Release outcomes and escaped defects drive measurable refinements to acceptance criteria."
    ]
  ],
  [
    "M-104",
    "How are risk treatment owners assigned, monitored and escalated when remediation slips?",
    "Risk register, ownership decisions, treatment approvals and overdue escalation logs.",
    [
      "Risks lack treatment owners or disposition.",
      "Owners are assigned to selected high-profile findings.",
      "Risk treatments have named owners, deadlines, acceptance criteria and escalation rules.",
      "Management periodically verifies treatment evidence and resolves overdue exceptions.",
      "Trend analysis improves treatment prioritisation and reduces repeated delays."
    ]
  ],
  [
    "M-105",
    "How is product-security competence demonstrated for engineers, reviewers and release approvers?",
    "Role-based training matrix, competence assessments and review authorisations.",
    [
      "Competence expectations are not defined.",
      "General security training is available but not tied to product roles.",
      "Role-specific knowledge and assessor competence requirements are documented.",
      "Sampled high-risk work is performed or reviewed by demonstrably competent personnel.",
      "Skills gaps, assessment outcomes and changing product technologies inform improvements."
    ]
  ],
  [
    "M-201",
    "How are trust boundaries, critical assets and credible threat scenarios identified before design decisions?",
    "Versioned data-flow diagrams, threat workshops and risk rationale linked to requirements.",
    [
      "No threat boundaries or critical assets are documented.",
      "Threat modelling occurs occasionally after design decisions.",
      "Defined modelling practice covers assets, trust boundaries, attackers and design assumptions.",
      "Threat models are updated and independently reviewed for sampled changes and interfaces.",
      "Findings from incidents, testing and architecture changes systematically improve threat models."
    ]
  ],
  [
    "M-202",
    "What review is triggered when a new interface, dependency or data flow is introduced?",
    "Interface change tickets, design review records and approved security requirements.",
    [
      "New interfaces have no security review.",
      "High-profile interfaces receive informal review.",
      "All material interface changes pass a documented security design review.",
      "Review samples demonstrate attack-surface analysis, issue tracking and closure evidence.",
      "Measured review outcomes improve design patterns and prevent recurring exposure."
    ]
  ],
  [
    "M-203",
    "How are code changes and security-relevant configuration changes examined before integration?",
    "Peer review records, secure coding rules, configuration diffs and exception approvals.",
    [
      "Changes are merged without recorded security review.",
      "Selected changes receive ad hoc peer review.",
      "Secure review rules and defined checklists apply to relevant repositories and configurations.",
      "Protected branches and sampled approvals demonstrate consistent reviews and issue resolution.",
      "Defect trends and review effectiveness are evaluated and used to improve controls."
    ]
  ],
  [
    "M-204",
    "How is integrity maintained from source through build, packaging, signing and release?",
    "Pipeline permissions, build provenance, signing records and reproducibility checks.",
    [
      "Build and release artefacts have no controlled integrity process.",
      "Teams manually check selected artefacts or access rights.",
      "Build roles, artefact provenance and integrity controls are documented and implemented.",
      "Sampled releases show verified artefact integrity, restricted approvals and traceable provenance.",
      "Compromise exercises and trend metrics improve supply-chain controls and recovery."
    ]
  ],
  [
    "M-205",
    "Which product-security tests establish acceptance, and how are failures handled before release?",
    "Test strategy, risk-to-test mapping, security test results and accepted deviations.",
    [
      "No defined security acceptance tests exist.",
      "Teams run discretionary tests for visible changes.",
      "A risk-based security test plan specifies scope, methods, thresholds and ownership.",
      "Independent test evidence and remediation verification support sampled release decisions.",
      "Test escapes and coverage trends lead to revised scenarios and acceptance thresholds."
    ]
  ],
  [
    "M-301",
    "How can researchers and customers report suspected product vulnerabilities securely?",
    "Published contact route, coordinated disclosure policy and intake response tickets.",
    [
      "No reachable vulnerability reporting channel exists.",
      "Reports arrive through general support with uncertain routing.",
      "Documented intake contacts, triage roles and acknowledgements are maintained.",
      "Sample reports show timely routing, protected communications and escalation.",
      "Exercises and response metrics improve accessibility and report handling."
    ]
  ],
  [
    "M-302",
    "How are vulnerability severity, exploitability and affected product versions established?",
    "Triage worksheets, affected-version analysis, exploit evidence and disposition approvals.",
    [
      "Reports are not consistently investigated.",
      "Triage relies on individual judgement without recorded criteria.",
      "A documented process records impact, product context, affected versions and priority.",
      "Cross-functional review checks high-severity conclusions and sampled evidence.",
      "Post-incident analysis refines triage criteria and reduces incorrect dispositions."
    ]
  ],
  [
    "M-303",
    "How are direct and transitive components inventoried across supported product versions?",
    "Versioned SBOM, suppliers, dependency graph, lifecycle decisions and reconciliation logs.",
    [
      "No component inventory is maintained.",
      "Inventories exist for selected builds but become stale.",
      "Release-linked inventories identify components, suppliers and relevant dependencies.",
      "Inventory completeness is periodically reconciled to build evidence and exceptions.",
      "Automated reconciliation and coverage analysis reduce unknown dependencies over time."
    ]
  ],
  [
    "M-304",
    "How are fixes prioritised, tested and distributed across supported versions?",
    "Fix tickets, supported-version matrix, regression tests and release advisories.",
    [
      "Vulnerability fixes are untracked or irregular.",
      "High-profile fixes are prioritised informally.",
      "Remediation decisions specify impact, priority, supported releases and verification.",
      "Sampled fixes demonstrate regression testing, deployment tracking and overdue escalation.",
      "Time-to-remediate trends and field feedback improve release and mitigation performance."
    ]
  ],
  [
    "M-305",
    "How are affected users informed about vulnerabilities and appropriate corrective actions?",
    "Advisory templates, recipient register, coordinated-release records and communication evidence.",
    [
      "There is no defined security advisory process.",
      "Important customers receive case-by-case messages.",
      "A documented advisory process defines audiences, content, approval and channels.",
      "Sampled advisories are accurate, traceable and coordinated with available fixes.",
      "Delivery metrics, support feedback and exercises improve warning effectiveness."
    ]
  ],
  [
    "M-401",
    "Which product functions must remain available, and what dependencies can prevent them?",
    "Critical-function analysis, availability assumptions, dependency maps and risk treatments.",
    [
      "Essential functions and dependencies are undocumented.",
      "Teams know critical functions but do not record dependency failures.",
      "Critical services, upstream dependencies and operating assumptions are documented.",
      "Failure-mode tests and design reviews confirm that dependencies are understood.",
      "Operational experience and resilience metrics reshape architecture and recovery priorities."
    ]
  ],
  [
    "M-402",
    "What procedures recover product function following corruption, outage or security compromise?",
    "Recovery runbooks, trusted images, backup handling and restoration test evidence.",
    [
      "No repeatable recovery procedure exists.",
      "Recovery depends on individual engineers and improvised steps.",
      "Documented recovery procedures identify trusted inputs, roles and acceptance checks.",
      "Periodic exercises verify restoration time, data integrity and safe operating states.",
      "Exercise findings and incident metrics improve recovery plans and tooling."
    ]
  ],
  [
    "M-403",
    "Which security events can the product detect, preserve and make available to authorised operators?",
    "Event catalogue, representative log samples, time-sync design and retention rules.",
    [
      "Security-relevant events are not reliably recorded.",
      "Limited diagnostic logs exist without clear security purpose.",
      "Event recording, protection, retention and operator access are specified.",
      "Sampled tests confirm event fidelity, access protection and useful incident reconstruction.",
      "Operational feedback and detection testing improve event coverage and signal quality."
    ]
  ],
  [
    "M-404",
    "How does the product behave when an update is interrupted, rejected or rolled back?",
    "Negative update tests, signing checks, recovery-image integrity and rollback records.",
    [
      "Update failure behaviour is undefined or untested.",
      "Occasional manual recovery checks are performed.",
      "Test cases cover interrupted, invalid and failed updates, with recovery requirements.",
      "Release evidence demonstrates repeatable negative testing and controlled rollback.",
      "Field failures and red-team outcomes improve recovery resilience and update design."
    ]
  ],
  [
    "M-405",
    "How can customers securely install, configure, operate and retire the product?",
    "Installation guide, hardening baseline, default credential rules and retirement instructions.",
    [
      "Secure-operation instructions are absent.",
      "Generic instructions cover only selected risks.",
      "Product-specific hardening, update and decommissioning instructions are maintained.",
      "Usability reviews and deployment samples confirm guidance is actionable and current.",
      "Support incidents and customer feedback drive revisions and safer defaults."
    ]
  ],
  [
    "M-501",
    "Can reviewers retrieve the exact design and software configuration relevant to a release?",
    "Version-controlled architecture, design records, build identifiers and change approvals.",
    [
      "Architecture and version records cannot be reconstructed.",
      "Documents exist but are inconsistent with released versions.",
      "Versioned technical records have owners, baselines and retention rules.",
      "Sampled releases can be reproduced against approved architecture and configuration references.",
      "Documentation quality metrics and review findings improve traceability and retrieval."
    ]
  ],
  [
    "M-502",
    "How are threats, controls, security tests and acceptance decisions linked to one another?",
    "Traceability matrix, risk IDs, requirement IDs, test evidence and exception records.",
    [
      "Risk findings are disconnected from design and test work.",
      "Some risks cite individual mitigations or tests.",
      "A defined traceability method links risks to requirements, controls and verification.",
      "Sampling confirms link validity, review decisions and evidence resolution.",
      "Coverage gaps and assurance outcomes are analysed to improve traceability completeness."
    ]
  ],
  [
    "M-503",
    "What must an assessor verify before accepting a requirement as implemented?",
    "Evidence acceptance criteria, reviewer records, test results and rejection examples.",
    [
      "Implementation claims are accepted without evidence.",
      "Reviewers request supporting material inconsistently.",
      "Evidence standards, reviewer independence and acceptance statuses are defined.",
      "Sampled claims have current, relevant and independently assessed evidence.",
      "False-positive and rejected-evidence trends refine assurance requirements."
    ]
  ],
  [
    "M-504",
    "How do security findings remain visible until resolved, accepted or formally deferred?",
    "Issue register, dispositions, due dates, owner approvals and closure evidence.",
    [
      "Findings are not consistently captured or revisited.",
      "Teams track urgent findings in informal lists.",
      "All findings use defined states, owners, priorities and closure criteria.",
      "Open and closed samples show authorised disposition and verification evidence.",
      "Ageing and recurrence analysis improves tracking, escalation and preventive measures."
    ]
  ],
  [
    "M-505",
    "When is a change significant enough to require renewed cybersecurity risk and assurance review?",
    "Change thresholds, architecture diffs, reopened risk assessments and release review minutes.",
    [
      "Security reassessment is not linked to product changes.",
      "Major changes prompt discretionary expert review.",
      "Defined change criteria trigger threat, requirement and evidence reassessment.",
      "Sampled changes demonstrate documented triggers, impact analysis and assurance updates.",
      "Change-related incidents and missed triggers improve thresholds and assessment efficiency."
    ]
  ]
];
export const SME_CONTENT=Object.fromEntries(entries.map(([id,question,evidence,levels])=>[id,{question,evidence,levels}]));
