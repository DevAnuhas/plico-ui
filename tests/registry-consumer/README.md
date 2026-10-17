# Registry consumer smoke

From the project root, using Node 24 after `pnpm install --frozen-lockfile` and `pnpm registry:build`:

```sh
pnpm verify:consumer
```

The harness copies this fixture, its own `pnpm-lock.yaml`, and its workspace configuration into a fresh temporary directory. It installs the fixture's pinned Next.js, React, and `shadcn@4.21.0` dependencies with `pnpm install --frozen-lockfile`, then runs the real CLI with `pnpm exec shadcn`. The fixture stays independent of the app's dependencies and is excluded from the root workspace. Package registry access is required unless the packages are cached.

The CLI must reject a wrong token, then install App Shell, Button, Toaster, Stepper Form, Agent Chat and Task Board using an environment-backed custom header. Each item must install one semantic TSX source, plus its separate notice when required. The fixture uses a nondefault `@/parts` components alias and flat imports such as `@/parts/plico/app-shell`.

The receiving app uses `strict: true` and `allowJs: false`. It renders reusable default exports, named Demos, and real helpers (`toast`, `StepperField`, `StepperInput`), including a controlled form callback. Installed files and embedded assets must survive, then strict `tsc`, a production Next build and HTTP output must pass. No type checking suppressions or blanket prop casts are used in the fixture. The temporary consumer is removed after success; set `KEEP_REGISTRY_SMOKE=1` to inspect it. Failure retains it automatically.

Results are printed to stdout. Set `PLICO_SMOKE_REPORT` to a report path outside the repository to save them. Header authentication here is a local transport fixture, not proof of Vercel Deployment Protection. No deployment is created and no real credential is used. The fixture's preview module is generated from the actual installed exports during the run; this directory is not a standalone demo before the harness runs.
