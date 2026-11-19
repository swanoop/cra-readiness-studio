# Changelog

## 0.9.1-beta — 19 November 2026

- Renamed application interface to **CRA Assurance Workbench**; repository address and historical backup formats unchanged
- Simplified assessment navigation, task-focused overview and progress indicators
- Added branded executive/detailed A4 print-to-PDF report layouts and per-register CSV exports
- Rewrote 84 repetitive assessment prompts as specific assessor questions, preserving IDs
- Added encrypted backup format v2 (PBKDF2-HMAC-SHA256 600,000 iterations, AES-256-GCM and authenticated metadata); v1 readable
- Extended offline SBOM parsing with nested components, dependencies, hashes and preliminary SPDX 3 JSON-LD support
- Clarified Article 14 timezone persistence and one-month reporting deadline logic
- Updated source references, test coverage and repository contribution/security documentation

**Remaining beta gates:** expert regulatory review, complete maturity rubric rewrite, cross-browser/accessibility tests,
IndexedDB/at-rest encryption, SBOM schema conformance validation and independent security review.
