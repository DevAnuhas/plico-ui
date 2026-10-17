# Registry and agent access

Initialize the receiving project with `pnpm dlx shadcn@latest init` (or the equivalent command for its package manager). Add an `@plico` registry to its `components.json`, preserving the project's other settings.

## Local registry

```json
{
  "registries": {
    "@plico": "http://127.0.0.1:4210/r/{name}.json"
  }
}
```

```sh
pnpm dlx shadcn@latest add @plico/button
npx shadcn@latest add @plico/button
yarn dlx shadcn@latest add @plico/button
bunx --bun shadcn@latest add @plico/button
```

An item's page shows its exact name and installation command. Classic and Clean variants have separate names. Install one style at a time when they export equivalent UI.

```tsx
import Button, { Demo as ButtonDemo } from "@/components/plico/button";
import { FullScreen } from "@/components/plico/agent-chat";
```

Use the default export, `Component`, or a descriptive named alias for reusable UI; `Demo` renders the configured example. `FullScreen` renders supported complete screens. The target follows the receiving project's configured shadcn components alias; `@/components` is the default example here. Each item installs one standalone `.tsx` component and a shared notice at `licenses/plico-ui.txt`.

## Protected deployment

After configuring [private Vercel hosting](deploy.md), use the deployment's origin and an environment-backed automation bypass header:

```json
{
  "registries": {
    "@plico": {
      "url": "https://YOUR-PRIVATE-DEPLOYMENT/r/{name}.json",
      "headers": {
        "x-vercel-protection-bypass": "${PLICO_REGISTRY_TOKEN}"
      }
    }
  }
}
```

Set `PLICO_REGISTRY_TOKEN` in the consuming shell or agent environment. Do not store its value in `components.json`, source code, command history, or the repository. A bypass secret grants access to the protected deployment; keep it with the same care as other access credentials.

## Agents

The machine-readable entry points are:

- `/llms.txt` — complete catalog and installation links.
- `/mcp` — read-only Streamable HTTP MCP endpoint.

Configure an MCP client that supports the 2025-11-25 protocol and HTTP headers. Use the same deployment-protection header for a protected host. The tools list components with optional query, section, style, pagination, retrieve source by catalog name, and produce installation commands. They do not write to the receiving project; the agent uses the shadcn CLI to install the returned registry name.

The Code tab and Manual installation view expose the same TypeScript component installed by the CLI. Keep the shared notice with redistributed components. For existing v0.1 installations, follow the [migration guide](migrate-v0.2.md).
