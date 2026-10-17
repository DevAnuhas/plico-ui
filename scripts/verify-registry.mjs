import assert from "node:assert/strict";
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "@babel/parser";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = path.join(root, "public/r");
const readJSON = async (file) => JSON.parse(await readFile(file, "utf8"));
const catalog = await readJSON(path.join(directory, "registry.json"));
const inventory = await readJSON(path.join(root, "src/library/catalog.json"));
assert(Array.isArray(catalog.items) && catalog.items.length, "Registry needs a catalog.");
const names = new Set();
let files = 0, imports = 0, mitItems = 0, embeddedAssets = 0;
function walk(node, visitor) {
  if (!node || typeof node !== "object") return;
  if (typeof node.type === "string") visitor(node);
  for (const [key, value] of Object.entries(node)) {
    if (["loc", "start", "end", "extra", "comments", "tokens"].includes(key)) continue;
    if (Array.isArray(value)) value.forEach((child) => walk(child, visitor));
    else if (value && typeof value === "object") walk(value, visitor);
  }
}
function packageName(value) { return value.startsWith("@") ? value.split("/").slice(0, 2).join("/") : value.split("/")[0]; }
function dependencyName(value) { const suffix = value.indexOf("@", value.startsWith("@") ? 1 : 0); return suffix < 0 ? value : value.slice(0, suffix); }
for (const summary of catalog.items) {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(summary.name), "Registry names must be semantic slugs.");
  assert(!names.has(summary.name), `Duplicate item ${summary.name}`);
  names.add(summary.name);
  const item = await readJSON(path.join(directory, `${summary.name}.json`));
  assert.equal(item.name, summary.name);
  assert(["registry:component", "registry:ui", "registry:block"].includes(item.type), `${item.name}: unsupported item type.`);
  assert.equal(item.type, summary.type);
  assert(Array.isArray(item.files), `${item.name}: missing files.`);
  assert(!Object.keys(item.envVars ?? {}).length, `${item.name}: source must not install secrets.`);
  const code = item.files.filter((file) => /\.[cm]?[jt]sx?$/.test(file.path));
  assert.equal(code.length, 1, `${item.name}: install exactly one self-contained TSX file.`);
  assert.equal(path.posix.basename(code[0].path), `${item.name}.tsx`, `${item.name}: semantic source filename required.`);
  assert.equal(code[0].target, `@components/plico/${item.name}.tsx`, `${item.name}: flat documented target required.`);
  assert.equal(item.meta?.main, code[0].target, `${item.name}: main must point to the complete source.`);
  assert.equal(item.meta?.primaryFile, code[0].target, `${item.name}: source panel must show the complete source.`);
  const targets = new Set();
  for (const file of item.files) {
    assert(typeof file.content === "string" && file.content.length, `${item.name}: missing embedded content.`);
    assert(!path.isAbsolute(file.path) && !file.path.split("/").includes(".."), `${item.name}: unsafe path.`);
    assert.equal(await readFile(path.join(root, file.path), "utf8"), file.content, `${item.name}: payload differs from canonical source.`);
    assert(typeof file.target === "string" && /^(?:@(?:components|ui|lib|hooks)\/|~\/)/.test(file.target), `${item.name}: portable target required.`);
    assert(!file.target.split("/").includes("..") && !file.target.includes("\\") && !targets.has(file.target), `${item.name}: unsafe or duplicate target.`);
    targets.add(file.target); files++;
    if (file !== code[0]) {
      assert.equal(file.type, "registry:file", `${item.name}: only a separate notice may accompany TSX.`);
      assert(/Copyright/.test(file.content) && /Permission is hereby granted/.test(file.content) && /THE SOFTWARE IS PROVIDED/.test(file.content), `${item.name}: incomplete separate MIT notice.`);
    }
  }
  if (item.meta?.license === "MIT") { assert(item.files.some((file) => file !== code[0]), `${item.name}: preserve its separate MIT notice.`); mitItems++; }
  assert(!/@ts-(?:nocheck|ignore|expect-error)\b/.test(code[0].content), `${item.name}: TypeScript suppression forbidden.`);
  assert(!/Permission is hereby granted|THE SOFTWARE IS PROVIDED/.test(code[0].content), `${item.name}: license text belongs in a separate notice.`);
  const declared = new Set(["react", "react-dom", ...(item.dependencies ?? []).map(dependencyName)]);
  const ast = parse(code[0].content, { sourceType: "module", plugins: ["jsx", "typescript"] });
  const dependencyImports = [];
  walk(ast, (node) => {
    if ((node.type === "TSTypeAliasDeclaration" || node.type === "TSInterfaceDeclaration") && /Props$/.test(node.id?.name ?? "")) {
      assert.notEqual(node.typeAnnotation?.type, "TSAnyKeyword", `${item.name}: public Props cannot be any.`);
      if (node.typeAnnotation?.type === "TSTypeReference" && node.typeAnnotation.typeName?.name === "Record") assert.notEqual(node.typeAnnotation.typeParameters?.params?.[1]?.type, "TSAnyKeyword", `${item.name}: blanket dynamic Props record is forbidden.`);
    }
    if (["ImportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"].includes(node.type) && node.source) dependencyImports.push(node.source.value);
    if (node.type === "ImportExpression" && node.source?.type === "StringLiteral") dependencyImports.push(node.source.value);
    if (node.type === "CallExpression" && (node.callee?.type === "Import" || node.callee?.name === "require") && node.arguments[0]?.type === "StringLiteral") dependencyImports.push(node.arguments[0].value);
    if (node.type === "StringLiteral" && /^\/(?:assets|avatars|logos|fonts)\//.test(node.value)) assert.fail(`${item.name}: undeployed public asset path.`);
  });
  for (const specifier of dependencyImports) {
    assert(!/^(?:\.|\/|@\/|https?:|file:)/.test(specifier), `${item.name}: not self-contained; imports ${specifier}`);
    assert(declared.has(packageName(specifier)), `${item.name}: undeclared package ${specifier}`); imports++;
  }
  assert(!/url\(\s*["']?\/(?:assets|avatars|logos|fonts)\//.test(code[0].content), `${item.name}: undeployed CSS asset.`);
  embeddedAssets += (code[0].content.match(/data:(?:image|font|application\/(?:font|x-font))/g) ?? []).length;
}
assert.deepEqual([...names].sort(), inventory.items.map((item) => item.registryItem).sort(), "Registry and installable catalog differ.");
const generated = (await readdir(directory)).filter((name) => name.endsWith(".json") && name !== "registry.json").map((name) => name.slice(0, -5));
assert.deepEqual([...names].sort(), generated.sort(), "Generated JSON and catalog differ.");
const report = { passed: true, items: names.size, files, tsxFiles: names.size, packageImports: imports, mitItems, embeddedAssets, scope: "One complete semantic TSX per item, flat targets, asset portability, no blanket Props/suppression escapes and separate notices. Strict compilation and public prop types are checked separately." };
if (process.env.PLICO_VERIFY_REPORT) { const file = path.resolve(process.env.PLICO_VERIFY_REPORT); await mkdir(path.dirname(file), { recursive: true }); await writeFile(file, `${JSON.stringify(report, null, 2)}\n`); }
console.log(JSON.stringify(report, null, 2));
