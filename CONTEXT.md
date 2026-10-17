# Current context

Last updated: 2026-10-17

Plico UI is a private Next.js library site. Its 106 catalog entries resolve to 157 installable variants; twelve screens also expose a full-screen export. All catalog items are accessible without an application login or purchase flow.

The registry includes the files, local imports, embedded assets, and applicable third-party notices needed by consumers. Real CLI installation and a separate consumer production build have passed. The application is prepared for Vercel; no hosted deployment is part of this repository's setup.

Keep deployment protection enabled for every deployment, including production. A private GitHub repository does not protect deployed source JSON. Follow the [deployment runbook](docs/runbooks/deploy.md) before hosting.

Use the [documentation map](docs/README.md) for architecture, registry usage, agent access, and verification. Catalog metadata in `src/library/catalog.json` is the canonical inventory; generated files under `public/r/` must be regenerated after library changes.
