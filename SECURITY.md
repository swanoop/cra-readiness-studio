# Security policy

CRA Assurance Workbench is beta software and **not an approved repository or hosted service for sensitive client security records**.

## Vulnerability disclosure

Use GitHub private vulnerability reporting if enabled. Do not publish exploitable details, passwords, customer system information or restricted evidence in a public issue. If private reporting is unavailable, first request a secure private reporting contact from the repository maintainer.

Include the affected commit/version, a minimal fictional reproduction and impact. No paid bounty or response-time guarantee is offered.

## Storage and encryption

The initial workspace uses **plaintext localStorage** for backward compatibility. The user can migrate explicitly to an **encrypted IndexedDB vault**. Migration encrypts, writes and verifies a readable vault before deleting the legacy key. New encrypted backups and the vault use AES-256-GCM with PBKDF2-HMAC-SHA256 at 600,000 iterations. Historical encrypted backup v1 files can still be decrypted.

The passphrase has no recovery service. An unlocked page, malicious browser extension, compromised same-origin script, vulnerable browser or device can expose data. Plain JSON, CSV and printed PDF exports are not encrypted. Browser site-data removal and origin changes can irreversibly remove local records. Create an encrypted recovery backup stored outside this browser.

This application does not provide authentication, user isolation across shared browser profiles, security-event monitoring or signed attestations. Assessment outputs are drafts, not independently validated legal conclusions.
