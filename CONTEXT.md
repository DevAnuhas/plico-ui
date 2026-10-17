# Current context

Last updated: 2026-10-17

Plico UI is a private Next.js component library and documentation site. Its 106 catalog entries resolve to 157 installable variants; twelve screens also expose a full-screen export. All catalog items are accessible without an application login or purchase flow.

Version 0.2 installs one semantic TSX file per variant, with a default reusable component, a named Demo, and applicable named helpers and types. The shared MIT notice installs outside the component directory at `licenses/plico-ui.txt`. Canonical component source lives in `src/components/plico/`; registry payloads in `public/r/` are generated from it.

The repository uses Node.js 24, pnpm, and Prettier. The README presents the complete catalog and uses the Plico UI identity assets in `public/brand/`. Use the pinned package manager and frozen lockfile for reproducible builds.

The user hosts the application on Vercel. Keep deployment protection enabled for private deployments: a private GitHub repository does not protect hosted registry JSON. Follow the [deployment runbook](docs/runbooks/deploy.md) for hosting configuration.

Use the [documentation map](docs/README.md) for architecture, registry usage, agent access, and verification. Existing version 0.1 consumers should follow the [migration guide](docs/runbooks/migrate-v0.2.md). Catalog metadata in `src/library/catalog.json` is the canonical inventory.
