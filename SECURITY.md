# Security policy

CRA Assurance Workbench is beta software and **not an approved repository for sensitive client security records**.

If you discover a security issue, use GitHub private vulnerability reporting for this repository if enabled.
Do not include exploit details, passwords or client data in a public issue. If private reporting is unavailable,
request an appropriate private contact method from the maintainer without disclosing the vulnerability publicly.

Include the affected version, reproducible steps, impact and a minimal fictional test case. No paid vulnerability
programme or response-time guarantee is offered.

Browser data uses localStorage and is not encrypted at rest. The optional portable backup is encrypted using
AES-256-GCM with a password-derived key. Never treat exported or downloaded files as protected automatically.
