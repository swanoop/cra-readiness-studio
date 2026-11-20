# Architecture, persistence and trust boundaries

**Static ES-module application.** The browser loads local HTML, CSS and JavaScript without a backend or external application API. The GitHub Pages installation serves the same static files as a local Python HTTP server.

| Module | Responsibility |
| --- | --- |
| `src/app.js` | UI navigation, persistence coordination and event handlers |
| `src/pages.js` | Page rendering and per-view controls, independent from controller |
| `src/data.js`, `src/regulatory-expanded.js` | Stable editorial CRA assessment IDs and applicability |
| `src/sme-maturity-content.js` | 25 individually authored core maturity rubrics |
| `src/professional-maturity.js` | Experimental legacy 150-control rubric |
| `src/engine.js` | Screening, evidence metrics, snapshots, risk flags and reporting dates |
| `src/store.js` | Legacy localStorage, schema validation and backup conversion |
| `src/vault.js` | IndexedDB encrypted persistence, explicit migration and read-back verification |
| `src/password-dialog.js` | Masked and confirmed passphrase entry |
| `src/secure-backup.js` | AES-GCM encryption, PBKDF2 and historic backup read |
| `src/sbom.js` | Offline best-effort SBOM import |
| `src/exports.js` | CSV injection protection and printable A4 reports |
| `tests/` | Unit, no-network smoke and Playwright cross-browser regression |

## Data flow

1. User data enters in the browser and is validated or HTML-escaped before output.
2. The legacy default persists the complete schema-2 workspace in localStorage.
3. Explicit vault migration encrypts and writes the schema-2 workspace to IndexedDB, verifies decryption, then removes the localStorage key.
4. Each subsequent save serialises an immutable snapshot and queues an authenticated AES-256-GCM write. Reload starts locked and requires passphrase entry.
5. JSON, encrypted JSON, CSV or print output is initiated by the user. Plaintext exports must be protected separately.

The password is retained only in memory while the vault is unlocked. Browser crypto protects data **at rest**, not against same-origin malicious JavaScript, extensions, compromised endpoints or loss of origin storage. XSS protection, CSP, dependency integrity, browser updates and threat review remain important.

## Assessment snapshot semantics

Version-2 snapshots capture independent copies of profile decisions, requirements, risk records, actions, evidence, vulnerability inventory, components, technical file references and incident data. Earlier one-page snapshots are read for compatibility and retain their reduced information. Snapshots are logical local records, **not digitally signed immutable audit logs**; the browser user can modify or replace the entire backup.

## Known boundaries

There is no user authentication, remote collaboration, server-side access control, CVE enrichment, standards-equivalence engine, automatic CRA conformity ruling or regulatory notification submission. The historical extended maturity rubric requires independent review. Browser test coverage is not an independent penetration test.
