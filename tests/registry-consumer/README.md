# Registry consumer smoke

From the project root, using Node 24 after `npm ci` and `npm run registry:build`:

```sh
node tests/registry-consumer/run.mjs
```

The harness copies this fixture into a fresh temporary directory and installs its own Next/React dependencies. It runs the real pinned `shadcn@4.21.0` CLI through npm exec, outside the deployed app's dependencies. npm registry access is required unless the packages are cached.

The CLI must reject a wrong token, then install App Shell, Button, Toaster, Stepper Form, Agent Chat and Task Board using an environment-backed custom header. Each item must install one semantic TSX source, plus its separate notice when required. The fixture uses a nondefault `@/parts` components alias and flat imports such as `@/parts/plico/app-shell`.

The receiving app uses `strict: true` and `allowJs: false`. It renders reusable default exports, named Demos, and real helpers (`toast`, `StepperField`, `StepperInput`), including a controlled form callback. Installed files and embedded assets must survive, then strict `tsc`, a production Next build and HTTP output must pass. No type checking suppressions or blanket prop casts are used in the fixture. The temporary consumer is removed after success; set `KEEP_REGISTRY_SMOKE=1` to inspect it. Failure retains it automatically.

Results are printed to stdout. Set `PLICO_SMOKE_REPORT` to a report path outside the repository to save them. Header authentication here is a local transport fixture, not proof of Vercel Deployment Protection. No deployment is created and no real credential is used. The fixture's preview module is generated from the actual installed exports during the run; this directory is not a standalone demo before the harness runs.
