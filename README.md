# CRA Assurance Workbench
**Evidence-led product cybersecurity assessment · Local-first · EU Cyber Resilience Act**

An offline-first assessment workspace for manufacturers, product security engineers and assurance reviewers working with **Regulation (EU) 2024/2847**. The workbench brings scope, assessor decisions, evidence, risks, corrective actions, incident planning and reporting into one product record.

> **Beta 0.9.1.** This is an assessor aid, not a certified legal interpretation, vulnerability scanner, declaration of conformity, or regulatory notification service. Use fictional or non-sensitive data for evaluation. The user remains responsible for verifying applicable law and every conclusion.

## Working with an assessment

1. **Product & scope:** describe the product, operator role, intended use, applicable market and preliminary category. Record the rationale; the category is not automatically determined.
2. **Assessment:** review the 118 editorial CRA prompts. Record status, rationale and reviewer rather than treating a percentage as a conformity conclusion.
3. **Evidence:** add the references, links to requirements and review states that substantiate decisions.
4. **Risks & actions:** track security risks, gaps, owners, deadlines and resolution.
5. **Release review:** inspect gaps and missing technical file references before recording a release decision.
6. **Reports & exports:** export individual CSV registers, an executive or detailed branded A4 report (browser **Print → Save as PDF**) and a complete JSON backup.

Advanced modules are available for SBOM import, draft maturity planning, incident timelines, traceability, vulnerabilities and technical documentation.

## Start locally

Requires a modern desktop browser and Python 3 or another static HTTP server. No npm dependencies are required to run the web interface.

```bash
git clone https://github.com/swanoop/cra-readiness-studio.git
cd cra-readiness-studio
python3 -m http.server 8765 --bind 127.0.0.1
```

Open **http://127.0.0.1:8765**. The application stores records in this browser's localStorage. Create a product or import the fictional `examples/industrial-gateway.json` through **Data & settings**.

To run the test suite:

```bash
npm test
```

## Portable and private by design

The application does not call external APIs. JSON backups remain compatible with historical workspace schema 1 through a review-only migration, and the on-disk browser workspace keeps its original storage key for existing users.

Password-protected backups use **AES-256-GCM**, fresh random salt/nonce and PBKDF2-HMAC-SHA256 at **600,000 iterations** for version 2. Historical 250,000-iteration version 1 backup files remain readable. This protects exported files; it does **not** encrypt the live localStorage workspace. Do not store client secrets or sensitive records without an approved organisational storage policy.

## SBOM and reporting scope

SBOM import is local and intentionally **not a full schema validator**. It extracts CycloneDX JSON, SPDX 2.x JSON and preliminary SPDX 3.x JSON-LD package information, direct dependency links, hashes, suppliers and licences. The field-presence indicator is informative; it is **not** a BSI TR-03183-2 compliance score.

The Article 14 planner calculates 24-hour and 72-hour milestones and applies the distinct final-report triggers for exploited vulnerabilities and severe incidents. Dates entered in the browser are normalised to UTC for stored records. The tool does not verify reporting triggers or transmit reports to ENISA.

## Regulatory baseline and content limitations

- Regulation (EU) 2024/2847: essential CRA requirements and Annexes
- Implementing Regulation (EU) 2025/2392: technical descriptions of important and critical product categories
- Commission communication **C(2026) 5252**, Annex, 27 July 2026: non-binding CRA implementation guidance
- ENISA Single Reporting Platform and official Commission reporting guidance

See [research and source record](docs/RESEARCH_SOURCES.md) and [implementation status](docs/IMPLEMENTATION_STATUS.md). The main Annex I references are retained, and 84 additional prompts have been rewritten as product-specific assessor questions. Every regulatory mapping still requires an independent legal/editorial review before production use.

The concise 25-practice maturity track is shown first. The 150-control, 750-anchor **extended draft rubric is experimental**, is not derived from an official ENISA maturity model, and has not yet been independently validated.

## Security and contributions

See [SECURITY.md](SECURITY.md), [CONTRIBUTING.md](CONTRIBUTING.md) and [CHANGELOG.md](CHANGELOG.md). Licensed under [Apache-2.0](LICENSE).

**Not suitable for autonomous conformity judgments, regulated client records, or reliance as legal advice.**
