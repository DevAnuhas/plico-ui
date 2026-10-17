# Plico UI

A private React UI library for AI products, with live previews, documentation, a shadcn registry, and a read-only MCP endpoint. The catalog contains 106 entries and 157 style variants across components, blocks, illustrations, screens, and motion.

## Run locally

Use Node.js 24 and npm:

```sh
nvm use
npm ci
npm run dev
```

Open <http://127.0.0.1:4210>. Build and run the production app with `npm run build` and `npm start`. The app does not require a database or an application account.

## Install a component

Initialize shadcn in the receiving React project, then add this registry to its `components.json`:

```json
{
  "registries": {
    "@plico": "http://127.0.0.1:4210/r/{name}.json"
  }
}
```

```sh
npx shadcn@latest add @plico/button
```

```tsx
import { Button } from "@/components/plico/button";

export function Example() {
  return <Button>Continue</Button>;
}
```

See [registry usage](docs/runbooks/registry.md) for styles, full screens, protected hosting, and agent access.

## Commands

| Command                   | Purpose                                                   |
| ------------------------- | --------------------------------------------------------- |
| `npm run build`           | Regenerate the registry and build Next.js                 |
| `npm run registry:verify` | Check every registry file, import, asset, and notice      |
| `npm run verify:docs`     | Check documented imports and parse complete code examples |
| `npm run typecheck`       | Check TypeScript sources                                  |
| `npm run verify:api`      | Verify the running app's MCP and agent index              |

The [consumer smoke test](tests/registry-consumer/README.md) also installs components with the real shadcn CLI and builds a separate Next.js app.

## Project map

- `src/site/` — website, catalog, documentation, and preview presentation.
- `src/library/` — catalog metadata, reusable items, demos, and shared runtime.
- `registry/` — registry definitions.
- `public/r/` — generated shadcn registry JSON.
- `src/app/` — Next.js routes, MCP, and `llms.txt`.
- `docs/` — architecture and operating instructions.

Start with the [documentation map](docs/README.md). Keep this repository and its deployments private. [Private Vercel deployment](docs/runbooks/deploy.md) covers the required protection setting. Licensing is defined by [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES](THIRD_PARTY_NOTICES).
