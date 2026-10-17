<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project workflow

Read `README.md`, `CONTEXT.md`, and `docs/README.md` before changing behavior. Use the `frontend-patterns` skill for React architecture and the `shadcn` skill for registry changes when those skills are available.

Keep the project private. Do not publish packages, create public repositories, disable deployment protection, or deploy publicly as part of routine development. Keep credentials out of generated registry bundles and browser-visible configuration.

## Library changes

Treat `src/library/catalog.json` as the installable inventory. Preserve stable registry names and facade exports. Run the registry build and verifier after editing library sources; run the real consumer smoke test for installation, alias, asset, or license changes. Retain all required third-party notices and installed LICENSE files.

Do not edit generated `public/r/` files directly. Keep browser preview behavior aligned with the installable component. Verify visible behavior in the production app after changing presentation or interactions.

## Documentation

Use the `maintain-project-docs` skill whenever documentation is created, reorganized, or routed. Read `CONTEXT.md` and `docs/README.md` before changing documented behavior or architecture. Update the canonical source instead of duplicating facts, link related documents, and create ADRs only for durable decisions with meaningful tradeoffs.
