# Architecture and security boundaries

The application is static ES modules and CSS, with no runtime dependencies, backend, authentication provider or external web traffic.

| File / module | Responsibility |
| --- | --- |
| `index.html` | Application shell |
| `assets/styles.css` | Responsive navy/green/teal user interface |
| `src/data.js` | Core review prompts, documents, 25-practice SME maturity set |
| `src/regulatory-expanded.js` | Supplemental CRA prompts, together giving 118 across 11 domains |
| `src/professional-maturity.js` | 150 controls, 15 domains, 5 maturity anchors per control |
| `src/engine.js` | Scope screening, metrics, release findings, snapshots, reporting dates |
| `src/sbom.js` | Offline JSON component parsing |
| `src/secure-backup.js` | Web Crypto based AES-256-GCM encrypted backup format |
| `src/store.js` | JSON validation, local storage and migration-preserving imports |
| `src/app.js` | Application UI, review inputs, exports and user interactions |
| `tests/` | Domain, security, schema and UI-render unit tests |

## Data flow

User-entered product records and imported SBOM metadata → validation → in-memory workspace → browser-local storage. On demand, the user may export a regular JSON backup, a password-encrypted backup, CSV tables or a printable summary. There is no automatic cloud sync or transmission of product details.

## Security and quality constraints

- `localStorage` is plaintext under the user's browser origin and can be lost when browser data is cleared. Use fictional/sample data on public demo sites.
- AES-GCM backup uses a random salt, 250,000 PBKDF2-HMAC-SHA-256 iterations, a random nonce and an authenticated ciphertext. No password recovery service exists; losing the password makes the export unrecoverable.
- JSON import validates known structure and identifiers, but users must still review source provenance and content.
- Printable reports repeat user-supplied content; no legal conformity or evidence sufficiency is inferred.
- Vulnerability status and incident reportability are manual, and SBOM imports do not perform CVE lookup.
- Historical data import is isolated, with no invented regulatory equivalence mapping.
- The site has no external hyperlinks, tracking pixels, fonts, API calls, or sponsored branding.

Before sensitive industrial client use, add secure authentication, access control, versioned audit events, encryption at rest, trusted evidence storage, backup recovery controls and independent penetration/security testing in an appropriately governed deployment.
