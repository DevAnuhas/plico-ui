import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "@babel/parser";

const fixture = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(fixture, "../..");
const registryDir = path.join(project, "public/r");
const token = randomBytes(32).toString("hex");
const env = { ...process.env, PATH: `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH ?? ""}`, CI: "1", NEXT_TELEMETRY_DISABLED: "1", PLICO_REGISTRY_TOKEN: token };
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const consumer = await mkdtemp(path.join(tmpdir(), "plico-registry-consumer-"));
const selected = ["app-shell", "button", "toaster", "stepper-form", "agent-chat", "task-board"];
const requests = [];
const steps = [];
let nextProcess;
let succeeded = false;

async function command(executable, args, { cwd = consumer, allowedFailure = false, extraEnv = {} } = {}) {
  const child = spawn(executable, args, { cwd, env: { ...env, ...extraEnv }, stdio: ["ignore", "pipe", "pipe"] });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk; });
  child.stderr.on("data", (chunk) => { output += chunk; });
  const code = await new Promise((resolve, reject) => { child.on("error", reject); child.on("exit", resolve); });
  assert(allowedFailure || code === 0, `${executable} ${args.join(" ")} exited ${code}:\n${output.slice(-14000)}`);
  return { code, output };
}

const registryServer = createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const match = /^\/r\/([a-z0-9-]+)\.json$/.exec(pathname);
  if (!match) { response.writeHead(404).end(); return; }
  if (request.headers["x-vercel-protection-bypass"] !== token) {
    requests.push({ path: pathname, status: 401 });
    response.writeHead(401, { "content-type": "application/json" }).end('{"error":"Unauthorized"}');
    return;
  }
  try {
    const body = await readFile(path.join(registryDir, `${match[1]}.json`));
    requests.push({ path: pathname, status: 200 });
    response.writeHead(200, { "content-type": "application/json" }).end(body);
  } catch {
    requests.push({ path: pathname, status: 404 });
    response.writeHead(404).end();
  }
});

function installedPath(file) {
  const aliases = { "@components/": "src/parts/", "@ui/": "src/parts/ui/", "@lib/": "src/lib/", "@hooks/": "src/hooks/", "~/": "" };
  const prefix = Object.keys(aliases).find((entry) => file.target?.startsWith(entry));
  assert(prefix, `Unknown target placeholder: ${file.target}`);
  return `${aliases[prefix]}${file.target.slice(prefix.length)}`;
}

function exportsOf(source, resolveAll) {
  const ast = parse(source, { sourceType: "module", plugins: ["jsx", "typescript"] });
  const names = [];
  for (const node of ast.program.body) {
    if (node.type === "ExportDefaultDeclaration") names.push("default");
    if (node.type === "ExportAllDeclaration") names.push(...(resolveAll?.(node.source.value) ?? []).filter((name) => name !== "default"));
    if (node.type !== "ExportNamedDeclaration") continue;
    if (node.declaration?.id?.name) names.push(node.declaration.id.name);
    for (const declaration of node.declaration?.declarations ?? []) if (declaration.id?.name) names.push(declaration.id.name);
    for (const specifier of node.specifiers ?? []) names.push(specifier.exported.name ?? specifier.exported.value);
  }
  return names;
}

function itemExports(item, file, seen = new Set()) {
  if (seen.has(file.target)) return [];
  seen.add(file.target);
  return exportsOf(file.content, (specifier) => {
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(file.target), specifier));
    const match = item.files.find((candidate) => [target, `${target}.jsx`, `${target}.tsx`, `${target}/index.jsx`].includes(candidate.target));
    assert(match, `${item.name}: facade re-export is absent from installed closure.`);
    return itemExports(item, match, seen);
  });
}

async function listFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(target));
    else files.push(target);
  }
  return files;
}

try {
  for (const entry of ["package.json", "components.json", "tsconfig.json", "next.config.mjs", "src"]) {
    await cp(path.join(fixture, entry), path.join(consumer, entry), { recursive: true });
  }
  await new Promise((resolve, reject) => {
    registryServer.once("error", reject);
    registryServer.listen(0, "127.0.0.1", () => { registryServer.off("error", reject); resolve(); });
  });
  const base = `http://127.0.0.1:${registryServer.address().port}/r`;
  const componentsFile = path.join(consumer, "components.json");
  const components = JSON.parse(await readFile(componentsFile, "utf8"));
  components.registries = { "@plico": { url: `${base}/{name}.json`, headers: { "x-vercel-protection-bypass": "${PLICO_REGISTRY_TOKEN}" } } };
  await writeFile(componentsFile, `${JSON.stringify(components, null, 2)}\n`);

  assert.equal((await fetch(`${base}/registry.json`)).status, 401);
  assert.equal((await fetch(`${base}/registry.json`, { headers: { "x-vercel-protection-bypass": "wrong" } })).status, 401);
  assert.equal((await fetch(`${base}/registry.json`, { headers: { "x-vercel-protection-bypass": token } })).status, 200);
  steps.push("Local catalog rejects missing/wrong header and accepts the expected header.");

  await command(npm, ["install", "--no-audit", "--no-fund"]);
  console.log("Consumer dependencies installed with their own node_modules.");
  const cli = ["exec", "--yes", "--package=shadcn@4.21.0", "--", "shadcn"];
  const cliVersion = (await command(npm, [...cli, "--version"])).output.trim();
  assert.match(cliVersion, /4\.21\.0/);
  const rejected = await command(npm, [...cli, "view", "@plico/button"], { allowedFailure: true, extraEnv: { PLICO_REGISTRY_TOKEN: "wrong" } });
  assert.notEqual(rejected.code, 0, "The real CLI unexpectedly read a private item with the wrong header.");
  steps.push("Pinned shadcn CLI rejects the wrong registry token.");
  await command(npm, [...cli, "view", "@plico/button"]);
  await command(npm, [...cli, "add", ...selected.map((name) => `@plico/${name}`), "--yes"]);
  console.log("Pinned shadcn CLI installed a component, a screen and an asset-bearing block through authenticated namespace headers.");
  steps.push("Pinned shadcn 4.21.0 view/add succeed through an environment-backed custom header.");

  const items = await Promise.all(selected.map(async (name) => JSON.parse(await readFile(path.join(registryDir, `${name}.json`), "utf8"))));
  let installedFiles = 0;
  const imports = [];
  for (const item of items) {
    const installed = [];
    for (const file of item.files) {
      const destination = path.join(consumer, installedPath(file));
      assert((await stat(destination)).isFile(), `CLI did not write ${file.target} through the nondefault alias.`);
      installed.push(await readFile(destination, "utf8"));
      installedFiles++;
    }
    if (item.name === "button") {
      const joined = installed.join("\n");
      assert(/Copyright/.test(joined), "Installed component payload lost its copyright notice.");
      assert(/Permission is hereby granted/.test(joined), "Installed component payload lost its MIT permission text.");
      assert(/THE SOFTWARE IS PROVIDED/.test(joined), "Installed component payload lost its MIT warranty text.");
    }
    const sourceFiles = item.files.filter((file) => /\.[cm]?[jt]sx?$/.test(file.path));
    assert.equal(sourceFiles.length, 1, `${item.name}: exactly one source file must be installed.`);
    const candidate = sourceFiles[0];
    assert(candidate, `${item.name}: cannot find a demo/component entry to render.`);
    assert.equal(candidate.target, `@components/plico/${item.name}.tsx`);
    assert(!/@ts-(?:nocheck|ignore|expect-error)\b/.test(candidate.content), `${item.name}: installed source must not suppress type checking.`);
    const exportNames = itemExports(item, candidate);
    const symbol = "default";
    assert(symbol && exportNames.includes(symbol), `${item.name}: missing expected exported render entry (${exportNames.join(", ")}).`);
    const localName = { "app-shell": "AppShell", button: "Button", toaster: "Toaster", "stepper-form": "StepperForm", "agent-chat": "AgentChat", "task-board": "TaskBoard" }[item.name];
    const specifier = `@/${installedPath(candidate).replace(/^src\//, "").replace(/\.[jt]sx?$/, "").replace(/\/index$/, "")}`;
    const named = { "app-shell": "Demo as AppShellDemo", button: "Demo as ButtonDemo", toaster: "toast", "stepper-form": "StepperField, StepperInput, Demo as StepperDemo", "agent-chat": "Demo as AgentChatDemo", "task-board": "Demo as TaskBoardDemo" }[item.name];
    imports.push(`import ${localName}, { ${named} } from ${JSON.stringify(specifier)};`);
  }
  const sourceFiles = await listFiles(path.join(consumer, "src/parts"));
  let embeddedAssets = 0;
  for (const file of sourceFiles) {
    const source = await readFile(file, "utf8");
    embeddedAssets += (source.match(/data:(?:image|font|application\/(?:font|x-font))/g) ?? []).length;
  }
  assert(embeddedAssets > 0, "Complex screen must carry its binary avatar/font assets into the consumer.");
  const preview = `"use client";
import { useState } from "react";
${imports.join("\n")}
export default function InstalledPreview() {
  const [status, setStatus] = useState("Ready");
  return <>
    <Button onClick={() => { toast.success("Saved", { description: "Typed helper API" }); setStatus("Saved"); }}>Registry smoke button</Button>
    <p>{status}</p>
    <section className="smoke-preview"><AppShell workspace="Registry test" onNavigate={(label: string) => setStatus(label)}><p>Strict App Shell consumer</p></AppShell></section>
    <StepperForm initialValues={{ name: "" }} onComplete={async (values) => { setStatus(values.name); }} steps={[{ id: "name", title: "Name", render: ({ values, setValues }) => <StepperField name="name" label="Workspace name"><StepperInput value={values.name} onChange={(event) => setValues({ name: event.target.value })} /></StepperField> }]} />
    <Toaster position="bottom-right" />
    <section className="smoke-preview"><AgentChat workspace="Registry test" onNavigate={(label: string) => setStatus(label)} /></section>
    <details><summary>Named demos</summary><AppShellDemo /><ButtonDemo /><StepperDemo /><AgentChatDemo /><TaskBoardDemo /></details>
  </>;
}
`;
  await writeFile(path.join(consumer, "src/app/installed-preview.tsx"), preview);
  steps.push("All installed target files exist through a nondefault components alias; MIT notice and embedded complex-screen assets survive installation.");

  await command(process.execPath, [path.join(consumer, "node_modules/typescript/bin/tsc"), "--noEmit"]);
  steps.push("Installed TSX and typed default/helper/Demo usage pass strict tsc with allowJs=false, without type suppressions.");
  await command(process.execPath, [path.join(consumer, "node_modules/next/dist/bin/next"), "build"]);
  console.log("Isolated consumer Next production build passed.");
  steps.push("Independent Next 16.4.2 production build imports and prerenders the installed free component and complex screen.");

  const portProbe = createServer();
  await new Promise((resolve, reject) => {
    portProbe.once("error", reject);
    portProbe.listen(0, "127.0.0.1", () => { portProbe.off("error", reject); resolve(); });
  });
  const port = portProbe.address().port;
  await new Promise((resolve) => portProbe.close(resolve));
  nextProcess = spawn(process.execPath, [path.join(consumer, "node_modules/next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: consumer, env, stdio: ["ignore", "pipe", "pipe"] });
  let serverOutput = "";
  nextProcess.stdout.on("data", (chunk) => { serverOutput += chunk; });
  nextProcess.stderr.on("data", (chunk) => { serverOutput += chunk; });
  let response;
  for (let attempt = 0; attempt < 80; attempt++) {
    try { response = await fetch(`http://127.0.0.1:${port}`); break; } catch { await new Promise((resolve) => setTimeout(resolve, 150)); }
  }
  assert(response, `Consumer production server failed to start: ${serverOutput}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Registry consumer smoke/);
  assert.match(html, /Registry smoke button/);
  assert(/task|board/i.test(html), "Rendered consumer response is missing screen markup.");
  steps.push("Consumer next start returns HTTP 200 with actual installed component and screen markup.");

  const report = {
    passed: true,
    completedAt: new Date().toISOString(),
    node: process.version,
    cli: cliVersion,
    items: selected,
    installedFiles,
    embeddedAssets,
    nondefaultComponentsAlias: "@/parts",
    independentConsumerDependencies: true,
    strict: true,
    allowJs: false,
    checks: steps,
    registryRequests: requests,
    limitations: "Local header-protected fixture proves CLI header forwarding and installation; no Vercel deployment was created. Production HTTP/markup checks do not replace native browser interaction or visual QA."
  };
  if (process.env.PLICO_SMOKE_REPORT) {
    const reportFile = path.resolve(process.env.PLICO_SMOKE_REPORT);
    await mkdir(path.dirname(reportFile), { recursive: true });
    await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`);
  }
  succeeded = true;
  console.log(JSON.stringify(report, null, 2));
} finally {
  nextProcess?.kill("SIGTERM");
  if (registryServer.listening) await new Promise((resolve) => registryServer.close(resolve));
  if (succeeded && process.env.KEEP_REGISTRY_SMOKE !== "1") await rm(consumer, { recursive: true, force: true });
  else console.log(`Consumer retained for inspection: ${consumer}`);
}
