# CRA Assurance Workbench

**Local-first, evidence-led product cybersecurity assessment for the EU Cyber Resilience Act**

[**Try the browser demo (GitHub Pages)**](https://swanoop.github.io/cra-readiness-studio/) · [Sample fictional product](examples/industrial-gateway.json) · [Reporting issues](../../issues)

> **0.11.0-beta · Experimental assessor aid.** This software does not establish legal conformity, substitute for a notified body, submit regulatory notifications, or scan for vulnerabilities. Regulatory mappings and maturity content require independent specialist review. Use fictional or non-sensitive assessment data when evaluating this public beta.

## Guided six-stage workflow

1. **Product & scope:** record product facts, intended purpose, primary operator role and applicability rationale.
2. **Assess requirements:** record human decisions against applicable editorial CRA prompts. For a manufacturer, 112 of 118 checklist prompts currently appear.
3. **Evidence:** record document references, reviewer states and requirement relationships.
4. **Risks & actions:** maintain product risks, treatment decisions, owners and verification tasks.
5. **Release review:** inspect unresolved conditions and capture reproducible snapshots of assessment evidence and decisions.
6. **Reports & exports:** generate branded A4 executive/detailed print reports, six CSV registers and JSON backups.

Advanced pages provide SBOM inspection, vulnerability tracking, Article 14 notification planning, technical documentation, traceability and optional process maturity assessment.

The **Article 14 planner** independently records the manufacturer's awareness time with UTC normalisation and displays 24-hour/72-hour milestones and the separate final-report triggers. It is an evidence and planning record, not ENISA's Single Reporting Platform. ENISA's reporting portal does collect awareness time; its October 2026 guidance described a counter calculated from the 24-hour submission rather than awareness. Confirm current portal behaviour and statutory triggers before reliance.

## Try it

The project is a static ES-module application with no backend and no external runtime APIs. The published GitHub Pages deployment is built from the **main** branch. The development pull request is not automatically the public demo.

To run a local copy:
```bash
git clone https://github.com/swanoop/cra-readiness-studio.git
cd cra-readiness-studio
python3 -m http.server 8765 --bind 127.0.0.1
```
Open `http://127.0.0.1:8765`. Select **Data & settings → Load fictional demonstration**, or import `examples/industrial-gateway.json`. The demonstration uses invented organisations, vulnerabilities and evidence.

## Local security model

By default, an existing legacy workspace stays in the browser's **unencrypted localStorage** until explicitly migrated. Go to **Data & settings → Enable encrypted IndexedDB vault** and choose a unique passphrase of at least 16 characters to migrate. The app first writes, decrypts and checks the new encrypted record, then deletes the legacy plaintext key. Once enabled, the vault is locked after reload; unlock with the passphrase. Passphrases are not transmitted or persisted, and there is **no password recovery**.

The vault and encrypted export files use AES-256-GCM with PBKDF2-HMAC-SHA256 (600,000 iterations, random salt/nonce); version 1 encrypted backups remain importable. An unlocked same-origin script can still access plaintext in memory; malicious extensions, a compromised browser, and loss of site storage remain risks. Encrypted storage does not make the application a secure shared evidence repository. Unencrypted JSON backups, CSV and printed reports are **not** protected automatically. Keep a separately stored encrypted backup and do not use live client secrets.

## Quality assurance

```bash
npm test
npm install
npx playwright install chromium firefox webkit
npm run test:browser
```

The GitHub Actions verification pipeline runs Node unit tests, source syntax checks and Chromium/Firefox/WebKit browser tests. The tests exercise page rendering, import, modal password entry, HTML escaping, CSV, offline behaviour and encrypted vault migration. Passing tests do not replace an independent security or accessibility review.

## Assessment content and limitations

- Binding basis: [Regulation (EU) 2024/2847](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R2847).
- Product category descriptions: Implementing Regulation (EU) 2025/2392.
- Non-binding Commission implementation guidance: [Communication C/2026/6013, Official Journal 17 November 2026](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52026XC06013), replacing the provisional July reference.
- The 25-practice **core maturity instrument** has original, individually written questions, evidence suggestions and five anchors per practice. This is **not** an official ENISA maturity model, an ENISA crosswalk or a conformity score.
- The historical 150-control extended maturity catalogue is retained as **experimental** for data compatibility; it is not independently validated.
- SBOM parsing covers selected CycloneDX and SPDX structures, but is not a complete schema validator or vulnerability intelligence service.

See [maturity method](docs/MATURITY_METHOD.md), [research sources](docs/RESEARCH_SOURCES.md), [implementation status](docs/IMPLEMENTATION_STATUS.md), [architecture](docs/ARCHITECTURE.md) and [security policy](SECURITY.md).

## Repository name

The GitHub repository retains the historical `cra-readiness-studio` slug to preserve GitHub Pages URLs and existing references. The product's user-facing name is **CRA Assurance Workbench**.

Apache-2.0 licensed. See [CONTRIBUTING.md](CONTRIBUTING.md) and [CHANGELOG.md](CHANGELOG.md).
