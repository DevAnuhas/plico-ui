# Architecture

Plico UI combines a Next.js App Router host with a client-rendered catalog and documentation site. The public presentation and installable library share catalog metadata and preview mappings. There is no database, billing integration, application authentication, or remote component-source service.

## Boundaries

- `src/app/[[...path]]/page.jsx` loads the client site. Its internal router handles the catalog, documentation, item pages, and full-screen previews.
- `public/brand/` contains the Plico UI mark, wordmark, and repository hero used by the website and README. Follow the [brand identity guide](../product/brand.md) when changing these assets.
- `src/site/site-app.js` owns the website presentation. `src/site/site.css` and local font/image assets provide its visual system.
- `src/library/catalog.json` defines the installable inventory. Each style variant has its own stable registry name.
- `src/components/plico/` contains one standalone TypeScript module per variant. Each module owns its implementation, styles, embedded assets, examples, and applicable helper exports.
- `src/library/preview-map.js` connects catalog previews and the twelve full-screen implementations to those same TypeScript modules.
- `scripts/build-registry.mjs` builds shadcn payloads in `public/r/` from the TypeScript sources. The installed component has a semantic `.tsx` name and no local source dependencies.
- `src/lib/library-server.js` resolves MCP lookups through the catalog and reads known registry JSON files. It does not accept arbitrary filesystem paths.

## Consumer interface

Every installed item exposes its reusable component as the default export, plus `Component`, `Demo`, and descriptive named aliases from `@/components/plico/{name}`. Screens that support a full route also expose `FullScreen`. A consumer's shadcn components alias determines the installation directory. An App Shell install produces `plico/app-shell.tsx` under that directory.

Registry metadata identifies the single TypeScript source with `meta.main` and `meta.primaryFile`. The Code panel and Manual installation view show that source. Installation commands provide pnpm, npm, yarn, and bun variants. Assets are embedded for portability. A shared notice installs separately at `licenses/plico-ui.txt`, outside the component directory.

## Agent interface

`/llms.txt` indexes all installable variants. `/mcp` provides stateless JSON-RPC over HTTP, with `list_components`, `get_component`, and `get_install_command`. It supports the MCP 2025-11-25 protocol and the documented older compatibility versions. Tools are read-only; they expose the same source bundles as the registry. Request hosts must match the configured site origin, Vercel deployment environment URLs, or the loopback development origins on port 4210. Browser Origin headers must also match the trusted request origin.

## Privacy and licensing

The repository's `private` package flag prevents accidental npm publication. `robots.txt` and metadata discourage indexing but do not control access. Vercel Deployment Protection must protect the site, registry, agent index, assets, and MCP endpoint together; see [deployment](../runbooks/deploy.md).

The project uses the MIT license. Required third-party attribution lives in the root notices and the installed shared notice, rather than component code or documentation controls. See [LICENSE](../../LICENSE) and [THIRD_PARTY_NOTICES](../../THIRD_PARTY_NOTICES).
