# CRA Readiness Studio

A local-first cybersecurity assurance workspace for products with digital elements under **Regulation (EU) 2024/2847 (Cyber Resilience Act)**.

**Release:** 0.9.0-beta · **Theme:** deep navy, forest green and teal · **Hosting:** static files, no runtime installation.

The workspace connects product applicability, security assessment, maturity, vulnerabilities, component inventory, evidence, risk treatment, remediation, version reviews and technical documentation into a single traceable product record.

## Included modules

| Capability | Implemented scope |
| --- | --- |
| Product applicability | EU market, operator role, digital-product, commercial supply and exclusion screening; reviewer rationale and preliminary category |
| CRA assessment | **118 editorial prompts in 11 domains** with internal legal references, status, rationale and reviewer |
| Professional maturity | **150 controls in 15 domains**, each with five defined maturity descriptions (**750 assessment anchors**) |
| SME maturity | **25 additional practices** with current/target levels |
| Technical traceability | Linked requirements, risk scenarios, evidence, accepted evidence and actions |
| Evidence review | References, descriptions, requirement IDs and manual review/acceptance states |
| STRIDE risks | Threat scenario, inherent and residual likelihood/impact and risk acceptance |
| Remediation | Kanban workflow, ownership, due dates and action generation from recorded gaps |
| Vulnerability management | Local vulnerability register, affected components, exploit evidence, severity, status and release flags |
| SBOM | Offline imports of CycloneDX JSON and SPDX JSON; component inventory (not a CVE scanner) |
| Article 14 planning | Local calculation of staged reporting dates, subject to human confirmation of reportability |
| Product release | Version-labelled assessment snapshots, changed requirement outcomes and unresolved review conditions |
| Annex VII documentation | Technical documentation reference register and printable draft assessment file |
| Portability | Plain JSON and password-encrypted JSON backups (AES-256-GCM, PBKDF2); CSV assessment export |

## Run locally

Requirements: a modern browser. No cloud account, API key, framework, database or build process is required.

- **Windows:** run `START-WINDOWS.bat` with Python 3 installed.
- **macOS/Linux:** run `sh start-local.sh` with Python 3 installed.
- Open the localhost address printed by the script.
- **Optional tests:** Node.js 20+ and `npm test`.

Keep **all** files together when publishing, particularly `index.html`, `src/`, `assets/` and `.nojekyll`. There are no embedded links to external websites in the application and no outbound network requests from its runtime code. Legal references are displayed as statute names and article/annex identifiers, not website links.

## Evidence, security and legal boundaries

- **The app does not certify a product or declare CRA conformity.** Assessment coverage, security maturity, accepted evidence references and unresolved risks are distinct metrics.
- The catalogue contains **118 review prompts** but is **not a legally verified, one-to-one reproduction of any previous questionnaire or a warranty of complete regulatory applicability**. It requires clause-level expert review before formal use.
- The **150-control/750-anchor professional maturity model** is a newly authored operational framework, not the text of an official third-party model. Likewise, the 25-practice SME assessment is an internal model.
- The app does **not** perform security scanning, vulnerability-feed lookup, SBOM completeness verification, conformity assessment, regulatory notification, or independent evidence verification.
- Working data is stored in browser `localStorage`, which is **not encrypted at rest** and is not intended for sensitive client evidence. Encrypted JSON exports protect the exported file, not the live browser workspace.
- Static publishing exposes app source files. Do **not** publish customer evidence, imported SBOMs, credentials, or workspace backup files in a public repository.
- Legacy schema-1 imports retain original answers separately for review, without claiming a reliable automatic mapping to the new regulatory catalogue.

**Regulatory baseline for review:** Regulation (EU) 2024/2847, Implementing Regulation (EU) 2025/2392, and the Commission's CRA implementation guidance dated 27 July 2026. Article 14 reporting began applying on 11 September 2026; the main CRA requirements generally apply from 11 December 2027. This statement reflects sources checked in October 2026 and must be reviewed as laws and guidance evolve.

## Verification

`npm test` verifies the catalogue structure, representative assessment logic, backup validation, encryption roundtrips, reporting deadlines, SBOM parsing, escaping, no external-link/legacy-brand strings in app source, and simulated rendering of all modules.

**Status:** 18 tests passed in the build environment. An in-memory Chromium browser test passed representative user flows and produced current desktop, mobile and maturity screenshots. URL-served ES-module verification, cross-browser QA, accessibility review, a security assessment and expert legal content review have **not** been completed for this beta release; direct browser navigation to localhost/file URLs was blocked by the environment.

## Publishing

See [`docs/PUBLISHING.md`](docs/PUBLISHING.md) for the new-repository workflow. Use a **new repository with new Git history**; no merges, forks or pull requests against any existing product repository are needed.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — data flow, trust boundaries and modules.
- [`docs/IMPLEMENTATION_STATUS.md`](docs/IMPLEMENTATION_STATUS.md) — verified features and release gates.
- [`docs/PUBLISHING.md`](docs/PUBLISHING.md) — clean-repository publication.
