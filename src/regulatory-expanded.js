// Independent CRA assessor questions; not quotations of legislation or automatic legal determinations.
// IDs remain stable for compatibility with existing saved assessments.
export const EXPANDED_REQUIREMENTS=[
  {
    "id": "SCO-01",
    "title": "Product scope: EU commercial supply decision",
    "ref": "Arts. 2–3",
    "guidance": "Which product versions are made available through commercial activity in the EU, and what evidence identifies the relevant supplier and market channels? Evidence to review: Supply-channel and intended-market analysis.",
    "domain": "Scope & applicability",
    "priority": "priority",
    "roles": [
      "manufacturer",
      "importer",
      "distributor",
      "steward",
      "other"
    ]
  },
  {
    "id": "SCO-02",
    "title": "Product boundary and separately marketed components",
    "ref": "Arts. 2–3",
    "guidance": "Where is the product boundary, and which firmware, software, accessories or separately marketed components are included or excluded? Evidence to review: Product decomposition and component offering records.",
    "domain": "Scope & applicability",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SCO-03",
    "title": "Remote processing and product dependency review",
    "ref": "Art. 3",
    "guidance": "Which remote data-processing services are necessary for the product to perform its intended functions, and who controls their security? Evidence to review: Remote processing architecture and product functional dependencies.",
    "domain": "Scope & applicability",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SCO-04",
    "title": "Direct and indirect connectivity assessment",
    "ref": "Art. 2",
    "guidance": "What wired, wireless, logical or indirect connections can expose the product to other devices or networks? Evidence to review: Wired, radio, logical and physical connection inventory.",
    "domain": "Scope & applicability",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SCO-05",
    "title": "Sector exclusion and overlap justification",
    "ref": "Art. 2",
    "guidance": "Does a sector-specific legislative regime exclude or modify CRA obligations for this product, and what precise legal provision supports that conclusion? Evidence to review: Signed analysis of any sector-specific exclusion.",
    "domain": "Scope & applicability",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SCO-06",
    "title": "Open-source and non-commercial distribution decision",
    "ref": "Art. 3; recitals",
    "guidance": "Do distribution, funding, hosting, support or development activities constitute a commercial context for any open-source component or product? Evidence to review: Business model, support and exploitation assessment.",
    "domain": "Scope & applicability",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SCO-07",
    "title": "Economic operator and own-brand role map",
    "ref": "Arts. 13, 19–24",
    "guidance": "Who manufactures, brands, imports, distributes or maintains the product, and which legal entity is accountable for each CRA obligation? Evidence to review: Entity and supply-chain role allocation.",
    "domain": "Scope & applicability",
    "priority": "standard",
    "roles": [
      "manufacturer",
      "importer",
      "distributor",
      "steward",
      "other"
    ]
  },
  {
    "id": "SCO-08",
    "title": "Initial market placement and transition decision",
    "ref": "Arts. 69, 71",
    "guidance": "When was each product version first placed on the EU market, and do later changes require a fresh substantial-modification assessment? Evidence to review: Version history and first placement record.",
    "domain": "Scope & applicability",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SEC-01",
    "title": "Documented product cybersecurity risk assessment",
    "ref": "Art. 13(2)",
    "guidance": "Does the current, product-specific cybersecurity risk assessment address intended use, reasonably foreseeable misuse, and lifecycle threats? Evidence to review: Product-specific risk assessment and acceptance criteria.",
    "domain": "Secure development & risk",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SEC-02",
    "title": "Security requirements derived from risk",
    "ref": "Art. 13; Annex I",
    "guidance": "Can each significant product threat be traced to a security requirement, implemented safeguard and verification result? Evidence to review: Traceability from threats to safeguards.",
    "domain": "Secure development & risk",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SEC-03",
    "title": "Foreseeable misuse and operating-context analysis",
    "ref": "Art. 13(2)",
    "guidance": "Which foreseeable user errors, misuse cases and deployment conditions materially change the product's security risk? Evidence to review: Misuse and deployment-environment analysis.",
    "domain": "Secure development & risk",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SEC-04",
    "title": "Attack surface and exposure modelling",
    "ref": "Annex I, Part I",
    "guidance": "Have all exposed interfaces, ports, services, maintenance channels and trust boundaries been inventoried and evaluated? Evidence to review: Interface inventory and exposure analysis.",
    "domain": "Secure development & risk",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SEC-05",
    "title": "Threat model and trust boundaries",
    "ref": "Art. 13(2)",
    "guidance": "Are the threat model, trust boundaries and data flows consistent with the released system architecture and remote dependencies? Evidence to review: Data flows and trust boundary assessment.",
    "domain": "Secure development & risk",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SEC-06",
    "title": "Secure development and peer-review practice",
    "ref": "Art. 13; Annex I",
    "guidance": "Where in development are security decisions reviewed, and what peer-review evidence covers critical code and configuration changes? Evidence to review: Engineering review and development plans.",
    "domain": "Secure development & risk",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SEC-07",
    "title": "Security verification acceptance criteria",
    "ref": "Annex I, Part I",
    "guidance": "Are security test acceptance criteria risk-based, measurable and approved before a product version is released? Evidence to review: Test specification and exit criteria.",
    "domain": "Secure development & risk",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SEC-08",
    "title": "Build pipeline and delivery integrity",
    "ref": "Annex I, Part I",
    "guidance": "Can a released build be traced to approved source, protected build systems, dependency versions and integrity checks? Evidence to review: Build provenance, signing and release review.",
    "domain": "Secure development & risk",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SEC-09",
    "title": "Third-party component acquisition diligence",
    "ref": "Art. 13(5)",
    "guidance": "What security criteria were used when accepting third-party components and their suppliers into the product? Evidence to review: Supplier/component risk assessment.",
    "domain": "Secure development & risk",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "SEC-10",
    "title": "Security risk reassessment following changes",
    "ref": "Art. 13(7)",
    "guidance": "What triggers a reassessment of cybersecurity risk after software, component, interface or deployment changes? Evidence to review: Change control, new threats and review records.",
    "domain": "Secure development & risk",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "PRO-01",
    "title": "Expected use period and support rationale",
    "ref": "Art. 13(8)",
    "guidance": "What is the reasonably expected product-use period, and what user, market and technical evidence supports the proposed security-support period? Evidence to review: Support policy and user expectations.",
    "domain": "Product support & lifecycle",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "PRO-02",
    "title": "Five-year support floor and permitted exception",
    "ref": "Art. 13(8)",
    "guidance": "Does the support-period determination address the CRA minimum and any legally justified exception without relying on an unsupported blanket rule? Evidence to review: Product expected-use justification.",
    "domain": "Product support & lifecycle",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "PRO-03",
    "title": "Vulnerability-handling capacity throughout support",
    "ref": "Art. 13(8)",
    "guidance": "Are people, supplier arrangements and vulnerability-handling resources available for the full declared support period? Evidence to review: Staffing and maintenance responsibilities.",
    "domain": "Product support & lifecycle",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "PRO-04",
    "title": "Security update distribution continuity",
    "ref": "Art. 13(9)",
    "guidance": "How will security updates remain accessible and authentic if the normal update distribution service changes or becomes unavailable? Evidence to review: Update archive and delivery method.",
    "domain": "Product support & lifecycle",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "PRO-05",
    "title": "Security update retention evidence",
    "ref": "Art. 13(9)",
    "guidance": "What historical security updates must remain available to users, and how is their publication and retention evidenced? Evidence to review: Issued update retention schedule.",
    "domain": "Product support & lifecycle",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "PRO-06",
    "title": "Support for modified software versions",
    "ref": "Art. 13(10)",
    "guidance": "Can users of modified or superseded software versions obtain feasible security support, migrations or alternatives where required? Evidence to review: Migration options and cost assessment.",
    "domain": "Product support & lifecycle",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "PRO-07",
    "title": "Unsupported archived version warnings",
    "ref": "Art. 13(11)",
    "guidance": "Are archived or unsupported product versions clearly identified with practical security warnings at the point of download? Evidence to review: User risk warnings and version archive labels.",
    "domain": "Product support & lifecycle",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "PRO-08",
    "title": "Clearly communicated support end date",
    "ref": "Art. 13(19)",
    "guidance": "Can a prospective customer find the declared support end date before purchasing or obtaining the product? Evidence to review: Purchase-time display and user notice.",
    "domain": "Product support & lifecycle",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "PRO-09",
    "title": "End-of-support transition and disposal guidance",
    "ref": "Arts. 13; Annex II",
    "guidance": "What safe migration, decommissioning and data-removal steps are communicated as the product approaches end of support? Evidence to review: Retirement communication and support plan.",
    "domain": "Product support & lifecycle",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-01",
    "title": "Recognition of actively exploited vulnerabilities",
    "ref": "Art. 14(1)",
    "guidance": "How does the product-security team distinguish credible evidence of active exploitation from a theoretical or merely published vulnerability? Evidence to review: Reliably evidenced exploitation and triage record.",
    "domain": "Article 14 reporting",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-02",
    "title": "Recognition of severe product-security incidents",
    "ref": "Art. 14(3), (5)",
    "guidance": "What documented impact criteria identify a severe incident affecting the security of the product, rather than ordinary operational faults? Evidence to review: Impact criteria and incident investigation.",
    "domain": "Article 14 reporting",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-03",
    "title": "Designated reporting contact and escalation",
    "ref": "Art. 14",
    "guidance": "Who can establish the regulatory awareness timestamp and escalate reportable events outside normal working hours? Evidence to review: Internal notification responsibility and routing.",
    "domain": "Article 14 reporting",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-04",
    "title": "Coordinated reporting platform process",
    "ref": "Arts. 14, 16",
    "guidance": "Who is authorised to submit CRA notifications through the EU reporting platform, and how is submission evidence retained? Evidence to review: Documented submission procedure.",
    "domain": "Article 14 reporting",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-05",
    "title": "Actively exploited vulnerability: 24-hour early warning",
    "ref": "Art. 14(2)(a)",
    "guidance": "Can the team prepare and submit an early warning within 24 hours of awareness of an actively exploited vulnerability? Evidence to review: Exercise of early warning from awareness time.",
    "domain": "Article 14 reporting",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-06",
    "title": "Actively exploited vulnerability: 72-hour notification",
    "ref": "Art. 14(2)(b)",
    "guidance": "How is the 72-hour exploited-vulnerability notification prepared, checked, submitted and linked to the initial warning? Evidence to review: Notification content and submission tracking.",
    "domain": "Article 14 reporting",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-07",
    "title": "Actively exploited vulnerability: final report timeline",
    "ref": "Art. 14(2)(c)",
    "guidance": "How is the final exploited-vulnerability report scheduled from corrective-measure availability, including any required updates? Evidence to review: Corrective measure available date and final record.",
    "domain": "Article 14 reporting",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-08",
    "title": "Severe incident: 24-hour early warning",
    "ref": "Art. 14(4)(a)",
    "guidance": "Can the team issue the 24-hour early warning for a qualifying severe incident from the recorded awareness time? Evidence to review: Timely incident warning template.",
    "domain": "Article 14 reporting",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-09",
    "title": "Severe incident: 72-hour notification",
    "ref": "Art. 14(4)(b)",
    "guidance": "Does the severe-incident process capture the facts and impact information needed for the 72-hour incident notification? Evidence to review: Initial incident notification record.",
    "domain": "Article 14 reporting",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-10",
    "title": "Severe incident: final reporting",
    "ref": "Art. 14(4)(c)",
    "guidance": "How is the severe-incident final report due date calculated from the 72-hour notification and tracked through approval? Evidence to review: Final report scheduled from notification date.",
    "domain": "Article 14 reporting",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "ART-11",
    "title": "Communication to affected users",
    "ref": "Art. 14(8)",
    "guidance": "How are affected users informed of the security issue, available mitigation and recommended protective action? Evidence to review: Impact notice and mitigating advice.",
    "domain": "Article 14 reporting",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-01",
    "title": "Product identification and version traceability",
    "ref": "Annex II",
    "guidance": "Can a user identify the exact product, model and affected software or firmware version from the supplied information? Evidence to review: Product identifier and relevant version.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-02",
    "title": "Manufacturer identity and contact information",
    "ref": "Annex II",
    "guidance": "Are the manufacturer's legal identity, postal contact and electronic contact methods complete and accessible? Evidence to review: Required company contact details.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-03",
    "title": "Security vulnerability reporting contact",
    "ref": "Annex II",
    "guidance": "Is a practical vulnerability-reporting channel published, monitored and tested, including for third-party researchers? Evidence to review: Usable product vulnerability contact.",
    "domain": "User information & instructions",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-04",
    "title": "Single point of contact supporting direct communication",
    "ref": "Art. 13(17)",
    "guidance": "Can customers communicate directly with the manufacturer about product security through an accessible single point of contact? Evidence to review: Communication method accessible to users.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-05",
    "title": "Intended purpose and safe deployment constraints",
    "ref": "Annex II",
    "guidance": "Do the user instructions define intended purpose, supported environments, prerequisites and important operating limitations? Evidence to review: Product intended-use and deployment boundaries.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-06",
    "title": "Secure installation and commissioning instructions",
    "ref": "Annex II",
    "guidance": "Can installers commission the product securely using documented initial credentials, hardening steps and verification checks? Evidence to review: Installation checklist and security configuration.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-07",
    "title": "Security update installation instructions",
    "ref": "Annex II",
    "guidance": "Are users told how to identify, obtain, validate and install security updates, including relevant precautions? Evidence to review: Update channels and user actions.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-08",
    "title": "Security relevant changes and update notifications",
    "ref": "Annex II",
    "guidance": "Do security-update notices identify affected versions, important fixes and any action users need to take? Evidence to review: Security update description and notices.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-09",
    "title": "Secure decommissioning and removal instructions",
    "ref": "Annex II",
    "guidance": "Do the instructions explain how to remove credentials, personal data and sensitive configuration when decommissioning? Evidence to review: Deletion and retirement procedures.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-10",
    "title": "Support period and support-end presentation",
    "ref": "Annex II; Art. 13",
    "guidance": "Where do customers see the support duration and end date, and is the information consistent across sales and product documents? Evidence to review: Support dates available before purchase.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-11",
    "title": "Known security limitations and restrictions",
    "ref": "Annex II",
    "guidance": "Are residual risks, unsupported configurations and known security limitations communicated in operationally useful terms? Evidence to review: Documented limitations and operational warnings.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "USE-12",
    "title": "Clear instructions in appropriate languages",
    "ref": "Art. 13(18)",
    "guidance": "Are the required user instructions available in the appropriate controlled language versions for the target EU markets? Evidence to review: Controlled user-information languages and editions.",
    "domain": "User information & instructions",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-01",
    "title": "General product description and intended use",
    "ref": "Annex VII",
    "guidance": "Does the technical file describe the product, its intended purpose and the exact assessed configuration? Evidence to review: Product description and intended purpose.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-02",
    "title": "Hardware and software version identification",
    "ref": "Annex VII",
    "guidance": "Can every hardware and software variant be tied to a controlled version and product identifier? Evidence to review: Product variants, versions and identifiers.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-03",
    "title": "Product system architecture and interactions",
    "ref": "Annex VII",
    "guidance": "Does a maintained architecture package show components, interfaces, trust boundaries and relevant dependencies? Evidence to review: Architecture block diagram and interfaces.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-04",
    "title": "Development and manufacturing processes",
    "ref": "Annex VII",
    "guidance": "Which development, manufacturing and release controls demonstrate that assessed security measures are applied consistently? Evidence to review: Development and production controls.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-05",
    "title": "Cybersecurity risk assessment and decisions",
    "ref": "Annex VII",
    "guidance": "Are product-specific cybersecurity risks, evaluation criteria, decisions and accepted residual risks recorded and traceable? Evidence to review: Risk scenarios, criteria and dispositions.",
    "domain": "Technical documentation",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-06",
    "title": "Annex I applicability and non-applicability rationale",
    "ref": "Annex VII",
    "guidance": "Is each applicable Annex I requirement addressed, with a documented rationale for any requirement considered inapplicable? Evidence to review: Essential requirements traceability.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-07",
    "title": "Safeguard design and implementation evidence",
    "ref": "Annex VII",
    "guidance": "Can a reviewer trace safeguard design decisions to implemented mechanisms and relevant product configurations? Evidence to review: Security requirements and implementation description.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-08",
    "title": "Security tests and verification results",
    "ref": "Annex VII",
    "guidance": "Do the records contain representative security verification results, deviations, retests and sign-off decisions? Evidence to review: Test reports and quality controls.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-09",
    "title": "Vulnerability handling policy and responsible function",
    "ref": "Annex VII",
    "guidance": "Is the vulnerability-handling lifecycle documented, assigned to responsible staff and supported by operational records? Evidence to review: Vulnerability lifecycle procedures.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-10",
    "title": "Software bill of materials documentation",
    "ref": "Annex I, Part II; Annex VII",
    "guidance": "Is a current software component inventory available for each relevant product version, with a documented generation process? Evidence to review: Component inventory and version evidence.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-11",
    "title": "Support period rationale and documentation",
    "ref": "Annex VII",
    "guidance": "Does the technical file justify the support period using expected usage, product characteristics and service arrangements? Evidence to review: Maintenance and expected-use analysis.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-12",
    "title": "User instructions and security guidance",
    "ref": "Annex VII; Annex II",
    "guidance": "Are the supplied security instructions and user documents version-controlled and linked to the assessed product release? Evidence to review: Controlled user-document set.",
    "domain": "Technical documentation",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "TEC-13",
    "title": "Conformity assessment records and declaration",
    "ref": "Annex VII; Annex V",
    "guidance": "Is the selected conformity-assessment route evidenced, and are the relevant assessment records and declaration controlled? Evidence to review: Module evidence and signed declaration.",
    "domain": "Technical documentation",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "CON-01",
    "title": "Product category based on core functionality",
    "ref": "Arts. 7–8; Annexes III–IV",
    "guidance": "Which Annex III or Annex IV product category, if any, matches the product's core functionality and documented intended purpose? Evidence to review: Category rationale and technical description.",
    "domain": "Conformity & CE",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "CON-02",
    "title": "Qualifying standards and common specification coverage",
    "ref": "Arts. 27, 32",
    "guidance": "Which published harmonised standards, common specifications or qualifying certification schemes are applicable and fully covered? Evidence to review: Coverage matrix and published references.",
    "domain": "Conformity & CE",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "CON-03",
    "title": "Conformity route for default products",
    "ref": "Art. 32(1)",
    "guidance": "Where a product falls into the default category, why is the proposed conformity-assessment procedure appropriate? Evidence to review: Selected assessment module and eligibility.",
    "domain": "Conformity & CE",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "CON-04",
    "title": "Conformity route for Class I products",
    "ref": "Art. 32(2)",
    "guidance": "For an important Class I product, does complete use of applicable harmonised standards or equivalent qualifying routes permit internal control? Evidence to review: Standards coverage and route justification.",
    "domain": "Conformity & CE",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "CON-05",
    "title": "Conformity route for Class II products",
    "ref": "Art. 32(3)",
    "guidance": "For an important Class II product, which notified-body or eligible certification route is planned and why? Evidence to review: Third-party procedure or approved pathway.",
    "domain": "Conformity & CE",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "CON-06",
    "title": "Critical product conformity analysis",
    "ref": "Arts. 8, 32",
    "guidance": "For a critical product, what conformity route is required under the currently applicable delegated and implementing measures? Evidence to review: Relevant certification or assessment decision.",
    "domain": "Conformity & CE",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "CON-07",
    "title": "EU declaration content completeness",
    "ref": "Art. 28; Annex V",
    "guidance": "Does the EU declaration include every applicable Annex V element and the correct manufacturer's signatory? Evidence to review: Declaration content and signature.",
    "domain": "Conformity & CE",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "CON-08",
    "title": "CE marking and notified body number",
    "ref": "Arts. 29–30",
    "guidance": "Is CE marking placed appropriately, and is a notified-body identification number included where legally required? Evidence to review: Marking placement and associated records.",
    "domain": "Conformity & CE",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "CON-09",
    "title": "Cross-legislation conformity declaration coordination",
    "ref": "Arts. 12, 28, 31",
    "guidance": "Which other applicable EU product laws affect the declaration of conformity and the coordinated assessment record? Evidence to review: Review of overlapping applicable EU acts.",
    "domain": "Conformity & CE",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "MAR-01",
    "title": "Production repeatability of conformity controls",
    "ref": "Art. 13(14)",
    "guidance": "What production and change controls prevent an assessed product version from drifting away from its approved configuration? Evidence to review: Change and production assurance plan.",
    "domain": "Market & operator duties",
    "priority": "priority",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "MAR-02",
    "title": "Manufacturer identity displayed on product",
    "ref": "Art. 13(15)–(16)",
    "guidance": "Can a user locate the required manufacturer and product identification on the product, packaging or accompanying documents? Evidence to review: Marking, contact and product identification.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "MAR-03",
    "title": "Defect corrective measures, recall and withdrawal",
    "ref": "Art. 13(21)",
    "guidance": "Is there a documented process for corrective measures, withdrawal or recall when a product is non-conforming or unsafe? Evidence to review: Corrective action and recall process.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "MAR-04",
    "title": "Market surveillance information readiness",
    "ref": "Art. 13(22)",
    "guidance": "Can the responsible organisation retrieve accurate technical evidence and respond promptly to market-surveillance requests? Evidence to review: Authority response and evidence retrieval.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "MAR-05",
    "title": "Supply chain operator record retention",
    "ref": "Art. 23",
    "guidance": "Can the supply chain identify who supplied the product and to whom it was supplied for the relevant retention period? Evidence to review: Inbound/outbound operator tracing.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "manufacturer",
      "importer",
      "distributor",
      "steward",
      "other"
    ]
  },
  {
    "id": "MAR-06",
    "title": "Response to cessation of operations",
    "ref": "Art. 13(23)",
    "guidance": "How will users and competent authorities be informed and supported if a manufacturer ceases operations? Evidence to review: Business cessation user notice plan.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "manufacturer"
    ]
  },
  {
    "id": "MAR-07",
    "title": "Importer due diligence before market release",
    "ref": "Art. 19",
    "guidance": "Before an importer makes a product available, how does it verify the manufacturer has met the relevant CRA conditions? Evidence to review: Importer verification record.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "importer"
    ]
  },
  {
    "id": "MAR-08",
    "title": "Importer corrective action and notification",
    "ref": "Art. 19",
    "guidance": "What triggers an importer's corrective actions, risk notifications and cooperation with the manufacturer and authorities? Evidence to review: Non-conformity escalation and remedy tracking.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "importer"
    ]
  },
  {
    "id": "MAR-09",
    "title": "Distributor supply and marking due diligence",
    "ref": "Art. 20",
    "guidance": "How does a distributor check mandatory markings, instructions and product documentation before supply? Evidence to review: Distribution acceptance checks.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "distributor"
    ]
  },
  {
    "id": "MAR-10",
    "title": "Distributor correction and cooperation obligations",
    "ref": "Art. 20",
    "guidance": "How will a distributor handle a security non-conformity, initiate corrective actions and cooperate with market surveillance? Evidence to review: Market surveillance support workflow.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "distributor"
    ]
  },
  {
    "id": "MAR-11",
    "title": "Authorised representative mandate and cooperation",
    "ref": "Art. 21",
    "guidance": "Does the authorised representative have a written mandate that defines duties, documentation access and authority cooperation? Evidence to review: Written mandate and responsibilities.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "representative"
    ]
  },
  {
    "id": "MAR-12",
    "title": "Open-source software steward obligations",
    "ref": "Art. 24",
    "guidance": "Which documented measures demonstrate an open-source software steward's applicable vulnerability-handling and reporting obligations? Evidence to review: Steward compliance programme and reporting readiness.",
    "domain": "Market & operator duties",
    "priority": "standard",
    "roles": [
      "steward"
    ]
  }
];
