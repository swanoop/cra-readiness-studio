# Publishing and release checklist

The active repository is **swanoop/cra-readiness-studio**. Its public application branding is **CRA Assurance Workbench**. Do not create another repository or rewrite history solely to change the application name.

## Deployment
The application is a static ES-module site and can be served over HTTPS by GitHub Pages using `main` and root `/`. A publishing environment should be configured using the repository's documented GitHub Pages settings; this file does not claim a live site is enabled.

For local evaluation run `python3 -m http.server 8765 --bind 127.0.0.1` and open `http://127.0.0.1:8765`.

## Release procedure
1. Back up the prior commit SHA and assess migration compatibility.
2. Run `npm test` and `node --check` across all application modules.
3. Test in a served browser: create product, edit requirements, link evidence, save/reload, export CSV, print A4 PDF, import v1 and v2 encrypted backups, and clear workspace safely.
4. Inspect desktop and mobile accessibility, including keyboard navigation and skip link.
5. Review regulatory text with qualified CRA reviewers and confirm referenced legal baseline dates.
6. Publish beta releases without implying certification. Record outstanding work in implementation status.

The browser's `localStorage` is tied to its origin. Moving the site between hostnames, protocols or paths may require the user to export/import a portable JSON backup. Never assume users' local records migrate automatically.

Do not publish third-party/client product evidence into the repository. Use fictional examples only.
