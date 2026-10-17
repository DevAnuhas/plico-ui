# Architecture

Plico UI combines a Next.js App Router host with a client-rendered catalog and documentation site. The public presentation and installable library share catalog metadata and preview mappings. There is no database, billing integration, application authentication, or remote component-source service.

## Boundaries

- `src/app/[[...path]]/page.jsx` loads the client site. Its internal router handles the catalog, documentation, item pages, and full-screen previews.
- `src/site/site-app.js` owns the website presentation. `src/site/site.css` and local font/image assets provide its visual system.
- `src/library/catalog.json` defines the installable inventory. Each style variant has its own stable registry name.
- `src/library/items/` contains component, demo, and facade modules. `src/library/preview-map.js` connects catalog previews and the twelve full-screen implementations.
- `scripts/build-registry.mjs` builds complete installation bundles in `public/r/`. Shared runtime files and item-level notices are included where required.
- `src/lib/library-server.js` resolves MCP lookups through the catalog and reads known registry JSON files. It does not accept arbitrary filesystem paths.

## Consumer interface

Every installed item exposes `Component`, `Demo`, a default export, and a descriptive component alias from `@/components/plico/{name}`. Screens that support a full route also expose `FullScreen`. A consumer's shadcn aliases determine the actual installation directory; internal imports are rewritten by the CLI.

Registry metadata identifies the facade with `meta.main` and the primary implementation with `meta.primaryFile`. Source panels show individual files rather than pretending a multi-file bundle is one TSX module. Assets required by installable components are embedded for portability.

## Agent interface

`/llms.txt` indexes all installable variants. `/mcp` provides stateless JSON-RPC over HTTP, with `list_components`, `get_component`, and `get_install_command`. It supports the MCP 2025-11-25 protocol and the documented older compatibility versions. Tools are read-only; they expose the same source bundles as the registry. Request hosts must match the configured site origin, Vercel deployment environment URLs, or the loopback development origins on port 4210. Browser Origin headers must also match the trusted request origin.

## Privacy and licensing

The repository's `private` package flag prevents accidental npm publication. `robots.txt` and metadata discourage indexing but do not control access. Vercel Deployment Protection must protect the site, registry, agent index, assets, and MCP endpoint together; see [deployment](../runbooks/deploy.md).

The project is private and is not offered under a blanket open-source license. Files with third-party MIT terms retain their notices, including a separately installed LICENSE file because CLI transforms can strip leading source comments. See the root license and third-party notices before redistribution.
