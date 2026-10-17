import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "package.json"));
const esbuild = await import(require.resolve("esbuild"));
const React = (await import(require.resolve("react"))).default;
const { renderToStaticMarkup } = await import(require.resolve("react-dom/server"));
const entries = JSON.parse(fs.readFileSync(path.join(root, "registry/library-manifest.json"), "utf8")).entries;
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "plico-library-api-"));
try {
  const target = path.join(temp, "api.mjs");
  await esbuild.build({
    stdin: { contents: entries.map((entry, index) => `export * as Item${index} from ${JSON.stringify(path.join(root, entry.publicEntry))};`).join("\n"), resolveDir: root, sourcefile: "library-api.jsx" },
    outfile: target, bundle: true, platform: "node", format: "esm", jsx: "automatic",
    plugins: [{ name: "react", setup(build) { build.onResolve({ filter: /^react(?:\/.*)?$/ }, args => ({ path: require.resolve(args.path), external: true })); } }],
  });
  const compiled = await import(pathToFileURL(target).href);
  const items = new Map(entries.map((entry, index) => [entry.sourceSlug, compiled[`Item${index}`]]));
  let exportedSymbols = 0;
  for (const entry of entries) {
    const item = items.get(entry.sourceSlug);
    for (const name of entry.exports) { assert(name in item, `${entry.sourceSlug}: missing runtime export ${name}`); exportedSymbols++; }
    assert.equal(item.default, item.Demo, `${entry.sourceSlug}: default demo contract`);
    assert.equal(typeof item.Component, "function", `${entry.sourceSlug}: component function`);
  }
  for (const name of ["autonomy-dial", "autonomy-dial-clean"]) {
    const item = items.get(name);
    for (const risk of ["safe", "risky", "destructive"]) for (const level of [0, 1, 2]) for (const pinned of [[], ["action"]]) {
      const expected = pinned.length > 0 || level === 0 || (level === 1 && risk !== "safe");
      assert.equal(item.asksFirst({ id: "action", risk }, level, pinned), expected);
    }
  }
  for (const name of ["inline-diff", "inline-diff-clean"]) {
    const { diffWords } = items.get(name);
    assert.deepEqual(diffWords("same", "same"), [{ type: "equal", text: "same" }]);
    assert.deepEqual(diffWords("hello world", "hello team"), [{ type: "equal", text: "hello " }, { type: "change", remove: "world", insert: "team" }]);
  }
  for (const name of ["date-range-picker", "date-range-picker-clean"]) {
    const presets = items.get(name).defaultPresets;
    const range = presets.find(preset => preset.id === "7d").range(new Date(2026, 9, 17));
    assert.equal(range.start.getDate(), 11); assert.equal(range.end.getDate(), 17);
  }
  for (const name of ["stepper-form", "stepper-form-clean"]) {
    const item = items.get(name);
    for (const helper of ["StepperField", "StepperInput", "StepperTags", "StepperChoices", "StepperReview"]) {
      assert.equal(typeof item[helper], "function", `${name}: ${helper}`);
      assert.notEqual(item[helper], item.Component, `${name}: helper must retain its own implementation`);
    }
    assert.match(renderToStaticMarkup(React.createElement(item.StepperInput, { placeholder: "Workspace" })), /<input/);
    assert.match(renderToStaticMarkup(React.createElement(item.StepperReview, { rows: [] })), /ui-sf/);
  }
  for (const name of ["data-table", "data-table-clean"]) {
    const item = items.get(name);
    assert.notEqual(item.TextColumnIcon, item.TagColumnIcon);
    assert.match(renderToStaticMarkup(React.createElement(item.TextColumnIcon)), /M3 4h10M3 7h10/);
    assert.match(renderToStaticMarkup(React.createElement(item.TagColumnIcon)), /M3 3h4v4H3z/);
  }
  for (const name of ["toaster", "toaster-clean"]) {
    const item = items.get(name);
    assert.match(renderToStaticMarkup(React.createElement(item.Component)), /aria-label="Notifications \(F8\)"/);
    assert.equal(typeof item.toast, "function");
    for (const method of ["success", "error", "info", "loading", "promise", "dismiss"]) assert.equal(typeof item.toast[method], "function");
    assert.equal(item.toast.success("Saved", { id: "api-check" }), "api-check");
    assert.equal(item.toast.success("Updated", { id: "api-check" }), "api-check");
    const input = Promise.resolve("done");
    assert.equal(item.toast.promise(input, { loading: "Working", success: "Done", error: "Failed" }, { id: "api-promise" }), input);
    await input;
  }
  const typedHelpers = { "profile-menu": ["SettingsIcon", "LogoutIcon"], "message-actions": ["MessageText"], "tips-panel": ["Kbd"], "tool-call-card": ["ToolCallGroup"], "comment-thread": ["AssistantMark"], "shimmer-loader": ["Skeleton", "ShimmerText"], "model-wheel": ["defaultModels"] };
  for (const [name, helpers] of Object.entries(typedHelpers)) for (const variant of [name, name + "-clean"].filter(key => items.has(key))) for (const helper of helpers) assert(helper in items.get(variant), `${variant}: typed helper ${helper}`);
  console.log(JSON.stringify({ passed: true, variants: entries.length, exportedRuntimeSymbols: exportedSymbols, checks: ["all facade exports", "policy boundaries", "diff helper output", "date presets", "distinct Stepper helpers", "column icons", "store-backed Toaster and promise identity", "typed helper visibility"] }, null, 2));
} finally { fs.rmSync(temp, { recursive: true, force: true }); }
