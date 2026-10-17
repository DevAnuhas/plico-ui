# Registry consumer smoke

From the project root, using Node 24 after `npm ci` and `npm run registry:build`:

```sh
node tests/registry-consumer/run.mjs
```

The harness copies this fixture into a fresh temporary directory and installs its own Next/React dependencies. It runs the real pinned `shadcn@4.21.0` CLI through npm exec, outside the deployed app's dependencies. npm registry access is required unless the packages are cached.

The CLI must reject a wrong token, then install `@plico/button`, `@plico/agent-chat`, and `@plico/task-board` using an environment-backed custom header. The fixture uses a nondefault `@/parts` components alias. Every installed file, the MIT notice, and embedded assets must survive. It renders the reusable Button, the Agent Chat FullScreen export, and the Task Board Demo. Its own production build and HTTP response must then succeed. The temporary consumer is removed after success; set `KEEP_REGISTRY_SMOKE=1` to inspect it. Failure retains it automatically.

Results are printed to stdout. Set `PLICO_SMOKE_REPORT` to a report path outside the repository to save them. Header authentication here is a local transport fixture, not proof of Vercel Deployment Protection. No deployment is created and no real credential is used. The fixture's preview module is generated from the actual installed exports during the run; this directory is not a standalone demo before the harness runs.
