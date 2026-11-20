# Implementation status — CRA Assurance Workbench 0.11.0-beta

## Implemented in the development pull request

- Masked passphrase modal, confirmation and basic strength screening; no `window.prompt` for encryption
- Consistent sidebar labels and accurate role-scoped requirement counts/progress status
- Formally published non-binding Commission CRA guidance baseline (OJ C/2026/6013)
- Page rendering separated from the application controller
- Node regression tests and three-browser Playwright workflow introduced
- A fictional product showing risk, evidence, actions, vulnerabilities, SBOM components, incident case and release history
- Expanded version-2 release snapshots preserving independent record copies
- Explicit encrypted IndexedDB migration with decrypt verification and a locked-on-reload workspace
- 25 original maturity questions, evidence suggestions and five individually authored assessment anchors
- Legacy v1/v2 encrypted backup read compatibility retained
- Browser demo documentation and maintenance/security guidance updated

## Unresolved beta limitations and further validation

- Legal prompts, scope mappings and CRA category interpretation remain editorial and require independent subject-matter validation
- The legacy 150-control maturity catalogue still uses experimental generic anchors
- No verified one-to-one ENISA SME maturity mapping
- IndexedDB is local and encrypted only while stored; unlocked browser memory and malicious same-origin JavaScript are outside its protection
- Vault passphrase recovery is not available; browser/OS storage cleaning can destroy records
- Snapshots are reproducible logical baselines, not cryptographically signed tamper-proof records
- SBOM importer is best-effort; no complete standards-conformance validation or live vulnerability matching
- CI browser coverage does not constitute independent penetration testing, accessibility certification or real-world legal assurance
- The repository slug remains unchanged to preserve the GitHub Pages address

## Intended release bar

Merge only after automated unit and browser checks pass. Keep the **beta** designation until an independent security review, human regulatory mapping review and manual accessibility QA are complete.
