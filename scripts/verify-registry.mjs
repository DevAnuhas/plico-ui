import assert from "node:assert/strict";
import { readFile, readdir, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "@babel/parser";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = path.join(root, "public/r");
const readJSON = async (file) => JSON.parse(await readFile(file, "utf8"));
const exists = async (file) => stat(file).then(() => true, () => false);
const catalogPath = [path.join(registryDir, "registry.json"), path.join(root, "registry.json")];
const catalogFile = (await Promise.all(catalogPath.map(exists))).findIndex(Boolean);
assert(catalogFile !== -1, "Build the registry before verifying it.");
const catalog = await readJSON(catalogPath[catalogFile]);
assert(Array.isArray(catalog.items) && catalog.items.length, "Built catalog must contain items.");
assert(typeof catalog.name === "string" && catalog.name, "Catalog needs a name.");
assert(typeof catalog.homepage === "string" && /^https?:\/\//.test(catalog.homepage), "Catalog needs an HTTP(S) homepage.");

// Validate this project's static payload against the relevant published contract.
// This is deliberately not presented as a general-purpose JSON Schema validator.
const itemTypes = new Set(["registry:lib", "registry:block", "registry:component", "registry:ui", "registry:hook", "registry:theme", "registry:page", "registry:file", "registry:style", "registry:base", "registry:font", "registry:item"]);
function checkItemShape(item) {
  assert(item && typeof item === "object" && !Array.isArray(item), "Registry item must be an object.");
  assert(typeof item.name === "string" && item.name, "Registry item needs a string name.");
  assert(itemTypes.has(item.type), `${item.name}: invalid registry type ${item.type}`);
  for (const key of ["title", "description", "author", "docs"]) {
    assert(item[key] === undefined || typeof item[key] === "string", `${item.name}: ${key} must be a string.`);
  }
  for (const key of ["dependencies", "devDependencies", "registryDependencies", "categories"]) {
    assert(item[key] === undefined || (Array.isArray(item[key]) && item[key].every((value) => typeof value === "string")), `${item.name}: ${key} must be a string array.`);
  }
  if (item.files !== undefined) {
    assert(Array.isArray(item.files), `${item.name}: files must be an array.`);
    for (const file of item.files) {
      assert(file && typeof file === "object" && typeof file.path === "string", `${item.name}: file needs a path.`);
      assert(itemTypes.has(file.type) && file.type !== "registry:font", `${item.name}: invalid file type.`);
      assert(file.content === undefined || typeof file.content === "string", `${item.name}: file content must be a string.`);
      assert(file.target === undefined || typeof file.target === "string", `${item.name}: file target must be a string.`);
      if (["registry:file", "registry:page"].includes(file.type)) assert(typeof file.target === "string", `${item.name}: file/page requires a target.`);
    }
  }
}

function visit(node, callback) {
  if (!node || typeof node !== "object") return;
  if (typeof node.type === "string") callback(node);
  for (const [key, value] of Object.entries(node)) {
    if (["loc", "start", "end", "extra", "comments", "tokens"].includes(key)) continue;
    if (Array.isArray(value)) value.forEach((child) => visit(child, callback));
    else if (value && typeof value === "object") visit(value, callback);
  }
}

function packageName(specifier) {
  return specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];
}

function dependencyName(dependency) {
  return dependency.startsWith("@") ? dependency.slice(0, dependency.indexOf("@", 1) < 0 ? undefined : dependency.indexOf("@", 1)) : dependency.split("@")[0];
}

function sources(code, filename) {
  const ast = parse(code, { sourceType: "module", plugins: ["jsx", "typescript"], sourceFilename: filename });
  const imports = [];
  const assets = [];
  visit(ast, (node) => {
    if (["ImportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"].includes(node.type) && node.source?.value) imports.push(node.source.value);
    if (node.type === "ImportExpression" && node.source?.type === "StringLiteral") imports.push(node.source.value);
    if (node.type === "CallExpression" && (node.callee?.type === "Import" || node.callee?.name === "require") && node.arguments?.[0]?.type === "StringLiteral") imports.push(node.arguments[0].value);
    if (node.type === "StringLiteral" && /^\/(?:assets|avatars|logos|fonts)\//.test(node.value)) assets.push(node.value);
    if (["StringLiteral", "TemplateElement"].includes(node.type)) {
      const value = node.value?.raw ?? node.value;
      if (typeof value === "string") {
        for (const match of value.matchAll(/url\(\s*["']?(\/(?:assets|avatars|logos|fonts)\/[^\s)'"?#]+)/g)) assets.push(match[1]);
      }
    }
  });
  return { imports, assets };
}

const names = new Set();
const targets = new Map();
const manifest = await readJSON(path.join(root, "registry/library-manifest.json"));
const inventory = new Map(manifest.entries.map((entry) => [entry.sourceSlug, entry]));
assert.equal(inventory.size, manifest.entries.length, "Source inventory contains duplicate names.");
let filesChecked = 0;
let modulesChecked = 0;
let importChecks = 0;
let localAssetChecks = 0;
let mitItems = 0;
for (const summary of catalog.items) {
  checkItemShape(summary);
  assert(/^[a-z0-9][a-z0-9-]*$/.test(summary.name), `Unsafe item name ${summary.name}`);
  assert(!names.has(summary.name), `Duplicate catalog item ${summary.name}`);
  names.add(summary.name);
  const item = await readJSON(path.join(registryDir, `${summary.name}.json`));
  checkItemShape(item);
  assert.equal(item.name, summary.name, "Catalog and item names differ.");
  assert.equal(item.type, summary.type, `${item.name}: catalog and item types differ.`);
  assert(item.files?.length, `${item.name}: missing installable files.`);
  assert(inventory.has(item.name), `${item.name}: missing source inventory entry.`);
  assert(!item.envVars || Object.keys(item.envVars).length === 0, `${item.name}: library source must not install secret/environment values.`);
  const fileTargets = new Map();
  for (const file of item.files) {
    assert(typeof file.content === "string" && file.content.length, `${item.name}/${file.path}: missing embedded content.`);
    assert(!path.isAbsolute(file.path) && !file.path.split("/").includes(".."), `${item.name}: unsafe source path.`);
    assert.equal(await readFile(path.join(root, file.path), "utf8"), file.content, `${item.name}/${file.path}: registry differs from canonical source.`);
    assert(typeof file.target === "string" && /^(?:@(?:components|ui|lib|hooks)\/|~\/)/.test(file.target), `${item.name}/${file.path}: explicit portable target required.`);
    assert(!file.target.split("/").includes("..") && !file.target.includes("\\"), `${item.name}: unsafe destination ${file.target}`);
    assert(!fileTargets.has(file.target), `${item.name}: duplicate destination ${file.target}`);
    fileTargets.set(file.target, file);
    const prior = targets.get(file.target);
    assert(!prior || prior === file.content, `${item.name}: conflicts with another item's destination ${file.target}`);
    targets.set(file.target, file.content);
    filesChecked++;
  }
  assert(fileTargets.has(item.meta?.entrypoint), `${item.name}: metadata entrypoint is absent from installed files.`);
  const declared = new Set(["react", "react-dom", ...(item.dependencies ?? []).map(dependencyName), ...(item.devDependencies ?? []).map(dependencyName)]);
  for (const file of item.files) {
    if (!/\.[cm]?[jt]sx?$/.test(file.path)) continue;
    modulesChecked++;
    const { imports, assets } = sources(file.content, file.path);
    for (const specifier of imports) {
      assert(typeof specifier === "string", `${item.name}: import must be a string.`);
      assert(!/^(?:https?:|file:|\/)/.test(specifier), `${item.name}/${file.path}: nonportable import ${specifier}`);
      if (specifier.startsWith(".")) {
        const destination = path.posix.normalize(path.posix.join(path.posix.dirname(file.target), specifier));
        const candidates = [destination, ...[".js", ".jsx", ".ts", ".tsx", ".mjs"].map((ext) => destination + ext), ...["index.js", "index.jsx", "index.ts", "index.tsx"].map((name) => `${destination}/${name}`)];
        assert(candidates.some((candidate) => fileTargets.has(candidate)), `${item.name}/${file.path}: import ${specifier} is absent from this item's installed closure.`);
      } else {
        assert(!specifier.startsWith("@/"), `${item.name}/${file.path}: source contains an unbound consumer alias ${specifier}`);
        assert(declared.has(packageName(specifier)), `${item.name}/${file.path}: undeclared dependency ${specifier}`);
      }
      importChecks++;
    }
    for (const asset of assets) {
      assert(fileTargets.has(`~/public${asset}`), `${item.name}/${file.path}: public asset ${asset} will not exist in a clean consumer.`);
      localAssetChecks++;
    }
  }
  // Any installed MIT notice must retain its copyright, permission and warranty text.
  const installedText = item.files.map((file) => file.content).join("\n");
  if (inventory.get(item.name).sourceKind === "mit-source" || item.meta?.license === "MIT" || /MIT License|Permission is hereby granted/.test(installedText)) {
    assert(/Copyright/.test(installedText) && /Permission is hereby granted/.test(installedText) && /THE SOFTWARE IS PROVIDED/.test(installedText), `${item.name}: incomplete MIT notice.`);
    mitItems++;
  }
}
assert.deepEqual([...names].sort(), [...inventory.keys()].sort(), "Catalog does not exactly cover the source inventory.");
const generatedNames = (await readdir(registryDir)).filter((file) => file.endsWith(".json") && !["registry.json", "index.json"].includes(file)).map((file) => file.slice(0, -5));
assert.deepEqual(generatedNames.sort(), [...names].sort(), "Catalog does not exactly cover generated item JSON.");

const report = {
  passed: true,
  validator: "Project structural checks based on published shadcn registry/item schemas, plus install-closure assertions; not a general-purpose JSON Schema validator",
  items: names.size,
  files: filesChecked,
  modules: modulesChecked,
  imports: importChecks,
  installedPublicAssetReferences: localAssetChecks,
  itemsWithRetainedMITNotice: mitItems,
  scope: "Static catalog/schema, safe destinations, file/import/dependency closure, local asset references and retained notices. Native rendering and real CLI install are separate consumer smoke checks."
};
if (process.env.PLICO_VERIFY_REPORT) {
  const reportFile = path.resolve(process.env.PLICO_VERIFY_REPORT);
  await mkdir(path.dirname(reportFile), { recursive: true });
  await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`);
}
console.log(JSON.stringify(report, null, 2));
