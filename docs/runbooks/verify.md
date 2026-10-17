# Verification

Use Node.js 24. Run these checks after changing the installable library or registry:

```sh
npm run registry:build
npm run registry:verify
npm run verify:docs
npm run typecheck
npm run build
```

The registry verifier checks all catalog variants, local import resolution, file targets, embedded asset references, and required notices. `public/r/` is generated output; change library sources and rebuild rather than patching generated JSON by hand.

The documentation verifier parses complete JSX/TS examples and resolves their library imports through the actual facade exports, including helper functions and TypeScript types. Application-specific placeholders such as an example agent client are outside that check.

With the app running on port 4210, run:

```sh
npm run verify:api
```

The API check exercises the agent index, MCP initialization, notifications, tool discovery, pagination, source retrieval, installation URLs, malformed requests, input bounds, and origin restrictions. Set `PLICO_TEST_URL` if testing a different origin.

Run the [real CLI consumer smoke](../../tests/registry-consumer/README.md) when installation structure, dependencies, aliases, assets, or license handling changes. It installs representative items into a separate application, checks header-based access, builds that application, and verifies its HTTP output.

For site changes, inspect the production app in a browser. Check the home page, each catalog section, both component styles, source file selection, a full-screen route, all documentation pages, search, themes, and the mobile menu. Confirm that previews have no missing assets and that the browser console has no runtime errors. Animation and pointer-driven components need interactive checks; a successful production build alone does not validate their behavior.

Check changed files for whitespace errors before committing:

```sh
git diff --check
```
