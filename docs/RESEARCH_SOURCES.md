# Regulatory baseline and market comparison
Reviewed: **19 November 2026**. Sources and notes are reference material, not legal advice.

## Official legislative and interpretive sources
- **Regulation (EU) 2024/2847** (Cyber Resilience Act) — https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R2847
- **Implementing Regulation (EU) 2025/2392** (important and critical product category descriptions) — https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj
- **Commission Communication C/2026/6013**, published in the Official Journal on 17 November 2026, non-binding; content previously approved in July as C(2026) 5252 — https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52026XC06013
- **Commission CRA conformity assessment overview** — https://digital-strategy.ec.europa.eu/en/policies/cra-conformity-assessment
- **Commission CRA reporting obligations** — https://digital-strategy.ec.europa.eu/en/policies/cra-reporting

Key verification points: main obligations apply from 11 December 2027, while Article 14 reporting applies from 11 September 2026 to manufacturers. Early warning is within 24h of awareness and follow-up is within 72h; final reports use different triggers for exploited vulnerabilities (14 days after corrective measure available) and severe incidents (one month after the 72h notification). Critical categories require stricter conformity assessment; categories are determined by core functionality and applicable technical descriptions, not by a free-text label alone.

## Security and SBOM guidance
- **OWASP Password Storage Cheat Sheet**, PBKDF2-HMAC-SHA256 >=600,000 where PBKDF2 is used — https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- **BSI TR-03183-2 (SBOM), v2.1.0** — https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-2.pdf
  The current workbench only reports indicative field presence and does not establish conformity with BSI's minimum data fields or supported version requirements.

## Commercial product review
- **ONEKEY Compliance Wizard** — https://www.onekey.com/feature/onekey-compliance-wizard — guided questionnaires, dashboards, evidence and export workflows
- **Cybellum product security platform** — https://cybellum.com/platform/ — product inventories/SBOM, vulnerability triage, security assurance and regulatory evidence

**Product differentiation:** transparent, browser-local assessment with explicit reviewer decisions and clean document exports for smaller engineering teams; avoid unsupported claims of scanning, automated vulnerability intelligence, legal conformity or certification.

## Next validation steps
Have an external CRA reviewer inspect each editorial requirement and role mapping, especially exception handling,
conformity pathways and the harmonised-standard status. Re-evaluate these sources upon major regulatory guidance changes.
