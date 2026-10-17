# Update an existing component installation

Version 0.2 installs each component as a standalone TypeScript file. Registry names and import paths remain stable.

For example, reinstall App Shell from your registry:

```sh
pnpm dlx shadcn@latest add @plico/app-shell
```

The new source is `components/plico/app-shell.tsx` under your configured shadcn components alias. It replaces the previous module directory as the import target. The CLI adds the new file; it does not delete the previous `components/plico/app-shell/` directory.

1. Move any local customizations into the new `.tsx` file.
2. Update default imports that expected the configured example to a named `Demo` import.
3. Build the receiving application.
4. Remove the old component directory once nothing imports files inside it. Keep the shared `licenses/plico-ui.txt` notice.

```tsx
// Reusable UI
import AppShell from "@/components/plico/app-shell";

// Configured examples and full screens
import { Demo, FullScreen } from "@/components/plico/app-shell";
```

Named component and helper exports remain available. The default export now renders the reusable component rather than its example.
