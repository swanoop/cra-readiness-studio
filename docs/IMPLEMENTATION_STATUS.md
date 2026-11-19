# Implementation status — CRA Assurance Workbench 0.9.1-beta

## Implemented in this iteration
- Guided workflow and simplified navigation, with advanced modules under an expandable section
- Independent product and organisation branding; draft A4 executive or detailed report via browser print-to-PDF
- CSV registers for requirements, evidence, risk, actions, vulnerabilities and SBOM
- Rewritten 84 expanded editorial questions retaining original identifiers and legal references
- Version 2 encrypted backup with authenticated KDF metadata and backward-compatible v1 decrypt
- More complete offline SBOM component metadata and basic dependency extraction
- UTC-normalised date storage for incident planner and calendar-month final-report handling
- Updated official reference record, repository documentation and syntax/test coverage

## Preserved capabilities
118 editorial CRA assessment prompts, 25 SME maturity practices, 150 draft extended controls,
traceability, local records, technical file references, gap-to-action tracking and workspace import/export.

## Important limitations
- **Legal:** All prompts and mappings remain editorial aids pending expert review; no automated conformity determination
- **Maturity:** 750 generic extended rubric anchors remain draft. Do not represent these as a validated industry/ENISA model
- **SBOM:** Partial extraction of common CycloneDX and SPDX JSON structures; no complete JSON Schema validation, no BSI conformance score, no CVE matching
- **Storage:** The live workspace remains in browser localStorage. Encryption protects portable backup exports only; no IndexedDB or per-project at-rest encryption yet
- **Reporting:** Timezone and deadline tests cover common cases, but legal triggers, exceptions and actual submissions need review
- **QA:** Additional regression checks were added; full URL-served browser QA across Chromium, Firefox and WebKit, keyboard accessibility, axe and independent penetration testing remain outstanding
- **Documentation:** The A4 report is a draft assessment record, not an Annex VII compliant package, Annex V declaration or other regulatory filing

## Release bar
Remain in beta until independent product-security practitioners validate the editorial content and maturity rubrics,
testing covers all supported browser/backup paths, and security/accessibility reviews pass.
