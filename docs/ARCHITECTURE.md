# Architecture and trust boundaries

**CRA Assurance Workbench** is a static ES-module application designed for local use. It does not require a backend, account, cloud API or analytics service.

## Modules
| File | Purpose |
| --- | --- |
| `index.html`, `assets/styles.css` | Accessible application shell, compact navigation, focused assessment layout |
| `src/app.js` | UI state, workflows, views and user input handling |
| `src/data.js`, `src/regulatory-expanded.js` | Editorial CRA assessment catalogue, with stable IDs |
| `src/professional-maturity.js` | Extended draft maturity catalogue; not a validated standard |
| `src/engine.js` | Scope screening, assessment metrics, release-review checks and Article 14 dates |
| `src/store.js` | Local workspace storage, backup schema validation and legacy import |
| `src/secure-backup.js` | Portable backup encryption v2 / legacy v1 decryption |
| `src/sbom.js` | Best-effort offline CycloneDX and SPDX package/relationship extraction |
| `src/exports.js` | CSV escaping and A4 executive/detailed report templates |
| `tests/` | Engine, parsing, encryption, export, and lightweight UI regression tests |

## Data and trust flow
User-entered product data and uploaded SBOM → validation → in-memory app state → browser-local storage.
The user may export ordinary JSON, password-protected JSON, CSV registers or print an HTML report to PDF.

Browser localStorage is plaintext. Password encryption applies to portable files only and is **not** equivalent to at-rest encryption of the live workspace. The application does not transmit records to the European Commission, ENISA or any vendor.

## Assurance boundary
Assessment answers, imported SBOM metadata and evidence references are unverified user input until reviewed by an accountable assessor.
The tool does not claim Annex VII completeness, standards conformity, live vulnerability enrichment or security certification.
All printable reports include an assessment-draft disclaimer.

## Future engineering
IndexedDB project persistence with optional at-rest encryption, a formal domain content schema, independent editorial review, and a complete Playwright cross-browser/accessibility matrix remain planned.
