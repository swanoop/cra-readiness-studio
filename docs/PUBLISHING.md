# Publish with a clean, unrelated Git history

## Step 1 — Create a new repository

In your GitHub account, create an **empty repository** named `cra-readiness-studio` and set it to **Public** if you want a public demo. Do not initialise it with a README, licence or .gitignore: the package includes those project files as appropriate. You do not need to make changes to any existing repository.

## Step 2 — Extract and push this package

Unzip the archive. Open PowerShell or Terminal **inside the extracted project folder**, where you can see `index.html` and `src/`. From that folder run:

```bash
git init -b main
git add .
git commit -m "Initial CRA Readiness Studio beta release"
git remote add origin https://github.com/swanoop/cra-readiness-studio.git
git push -u origin main
```

This creates a **fresh root commit**. It does not retain or copy another repository's Git history. `git` must be installed and you must be authenticated to push.

## Step 3 — Enable public Pages hosting

In the **new** repo select **Settings → Pages → Build and deployment → Deploy from a branch**, then choose **main** and **/(root)**, Save. The expected project URL will follow the pattern `https://swanoop.github.io/cra-readiness-studio/`.

## Step 4 — Verify before publishing broadly

- Confirm the Pages build succeeded and `index.html`, `src/` and `assets/` are served.
- Create one fictional product and test scoping, assessment, maturity, risks, evidence and action links.
- Import a small non-sensitive SBOM and test vulnerability records.
- Export and re-import a normal JSON backup and a password-encrypted backup; separately verify reports and print preview.
- Check mobile layout, keyboard access and major browsers.
- Keep sample assessments and backup files out of the Git history.

Only after the independent site is operating as expected should you change visibility of any older repo. Making a repository private does not erase previously published code, clones, forks or cached copies and can change GitHub Pages availability.
