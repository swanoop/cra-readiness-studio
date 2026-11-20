# Publishing and release checklist

Repository: **swanoop/cra-readiness-studio**. Application branding: **CRA Assurance Workbench**.

## GitHub Pages

Expected live URL: **https://swanoop.github.io/cra-readiness-studio/**.

GitHub Actions records a successful **pages build and deployment** for main (commit `2b2a544`, 19 November 2026). The automated verification and the development PR use their own checks; a draft PR does **not** change the live demo until merged to main. Confirm the public URL and browser behaviour after every merge. The repository slug is retained to avoid breaking existing Pages links.

## Before a beta merge

1. Export a recovery backup and record the prior commit SHA.
2. Require all Node unit, source syntax and Playwright browser jobs to pass.
3. Exercise localStorage-to-vault migration, unlock, incorrect password, encrypted backup compatibility, import/export, scope changes and release snapshot comparison.
4. Check both full-size and narrow-width browser navigation, screen readers, keyboard focus and report pagination.
5. Require independent CRA/legal editorial review before any external conformity claim.
6. Inspect `SECURITY.md`, document known gaps, and ensure the sample has no real user data.

Browser storage is scoped to origin, not a portable user account. Always export an encrypted recovery backup before moving hosting origin or clearing site data. Do not store client secrets in the public GitHub repository.
