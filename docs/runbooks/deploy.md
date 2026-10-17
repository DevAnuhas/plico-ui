# Private Vercel deployment

This app is ready to import into Vercel as a Next.js project. No deployment is created by the build command.

1. Keep the GitHub repository private and import it into Vercel.
2. Select Node.js 24. The repository's [`vercel.json`](../../vercel.json) runs `corepack pnpm install --frozen-lockfile` and `corepack pnpm build`, so Vercel uses the exact pnpm version pinned in `package.json`. Remove stale dashboard overrides for npm or other package-manager commands. Keep Next.js output defaults.
3. Set `NEXT_PUBLIC_SITE_URL` to the intended deployment origin. Local development uses the current browser origin.
4. Before making the deployment available, enable **Vercel Authentication for All Deployments**, including production. Standard Protection alone does not protect every production URL. Use a Vercel plan that supports the required protection scope.
5. For CLI and agent access, configure Protection Bypass for Automation in Vercel and pass its secret as a custom header. Follow [registry setup](registry.md). Never expose the secret with a `NEXT_PUBLIC_` variable.
6. Verify the root page, `/r/button.json`, `/llms.txt`, and `/mcp` without credentials from a signed-out client. All must be blocked by deployment protection. Then verify the protected registry with the authorized automation header.

The Next.js catch-all and API routes require no custom rewrite configuration. Registry JSON is generated during the build, and MCP registry files are included in the server's output tracing configuration.

Keep the explicit Corepack commands when changing build configuration. Vercel's lockfile-based package-manager detection can select a different pnpm version; Corepack reads the repository's pin. The install command rejects an out-of-date lockfile instead of resolving a different dependency graph. See [Vercel's package-manager documentation](https://vercel.com/docs/package-managers).

`robots.txt`, noindex metadata, a private GitHub repository, and an unlisted URL are not access controls. Keep deployment protection enabled while this remains a private experiment.

For a local production preview:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

Open <http://127.0.0.1:4210>. These local commands do not authenticate requests; bind the preview to loopback as configured in the package scripts.
