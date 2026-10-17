# Verification

Use Node.js 24. Run these checks after changing the installable library or registry:

```sh
npm run registry:build
npm run registry:verify
npm run registry:typecheck
npm run verify:docs
npm run verify:library
npm run typecheck
npm run build
```

The registry verifier checks catalog coverage, the standalone `.tsx` source contract, semantic file targets, embedded assets, exports, and the shared notice. The registry type checker compiles every installed source under strict TypeScript with JavaScript disabled. `public/r/` is generated output; change component sources and rebuild rather than patching generated JSON by hand.

The documentation verifier parses complete JSX/TS examples and resolves their library imports through the canonical component exports, including helper functions and TypeScript types. Application-specific placeholders such as an example agent client are outside that check.

With the app running on port 4210, run:

```sh
npm run verify:api
```

The API check exercises the agent index, MCP initialization, notifications, tool discovery, pagination, source retrieval, installation URLs, malformed requests, input bounds, and origin restrictions. Set `PLICO_TEST_URL` if testing a different origin.

Run the [real CLI consumer smoke](../../tests/registry-consumer/README.md) when installation structure, dependencies, aliases, assets, or license handling changes. It installs representative items into a separate application, checks header-based access, builds that application, and verifies its HTTP output.

For site changes, inspect the production app in a browser. Check the home page, each catalog section, both component styles, the single-source Code view, all four package-manager commands and their copy controls, a full-screen route, documentation pages, search, themes, and the mobile menu. Confirm that previews have no missing assets and that the browser console has no runtime errors. Animation and pointer-driven components need interactive checks; a successful production build alone does not validate their behavior.

Check changed files for whitespace errors before committing:

```sh
git diff --check
```
