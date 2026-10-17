import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await readFile(path.join(root, "public/r/registry.json"), "utf8"));
const candidateDirectory = process.env.PLICO_TYPES_SOURCE_DIR && path.resolve(root, process.env.PLICO_TYPES_SOURCE_DIR);
const virtual = new Map();
const items = [];
for (const summary of catalog.items) {
  const item = JSON.parse(await readFile(path.join(root, "public/r", `${summary.name}.json`), "utf8"));
  const source = candidateDirectory ? [{ content: await readFile(path.join(candidateDirectory, `${item.name}.tsx`), "utf8") }] : item.files.filter((file) => file.path.endsWith(".tsx"));
  assert.equal(source.length, 1, `${item.name}: strict check requires exactly one TSX source.`);
  if (!candidateDirectory) assert(!item.files.some((file) => /\.(?:jsx?|mjs|cjs)$/.test(file.path)), `${item.name}: JavaScript escapes the strict TSX contract.`);
  assert(!/@ts-(?:nocheck|ignore|expect-error)\b/.test(source[0].content), `${item.name}: type suppression forbidden.`);
  const filename = path.join(root, "__registry_strict__", "src/parts/plico", `${item.name}.tsx`);
  virtual.set(filename, source[0].content);
  items.push({ name: item.name, filename });
}
const options = { strict: true, allowJs: false, noEmit: true, skipLibCheck: true, isolatedModules: true, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, esModuleInterop: true, resolveJsonModule: true };
const host = ts.createCompilerHost(options);
const baseGet = host.getSourceFile.bind(host), baseExists = host.fileExists.bind(host), baseRead = host.readFile.bind(host);
host.fileExists = (file) => virtual.has(path.normalize(file)) || baseExists(file);
host.readFile = (file) => virtual.get(path.normalize(file)) ?? baseRead(file);
host.getSourceFile = (file, languageVersion, onError, fresh) => virtual.has(path.normalize(file)) ? ts.createSourceFile(file, virtual.get(path.normalize(file)), languageVersion, true, ts.ScriptKind.TSX) : baseGet(file, languageVersion, onError, fresh);
const program = ts.createProgram([...virtual.keys()], options, host);
const checker = program.getTypeChecker();
const diagnostics = ts.getPreEmitDiagnostics(program);
const failures = [];
const counts = {};
const itemCounts = {};
const functionCounts = {};
function enclosingFunction(node) {
  const names = [];
  while (node) {
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) names.push(node.name?.getText() ?? "anonymous");
    if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
      const parent = node.parent;
      const named = node.name?.getText() ?? ((ts.isVariableDeclaration(parent) || ts.isPropertyAssignment(parent)) ? parent.name.getText() : undefined);
      const line = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart()).line + 1;
      names.push(named ?? `callback@${line}`);
    }
    node = node.parent;
  }
  return names.reverse().join(" > ") || "module";
}
function tokenAt(source, start) {
  let found = source;
  function find(node) { if (start < node.getFullStart() || start >= node.getEnd()) return; found = node; ts.forEachChild(node, find); }
  find(source); return found;
}
for (const diagnostic of diagnostics) {
  const item = diagnostic.file && items.find((entry) => entry.filename === diagnostic.file.fileName);
  const position = diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
  counts[diagnostic.code] = (counts[diagnostic.code] ?? 0) + 1;
  itemCounts[item?.name ?? "environment"] = (itemCounts[item?.name ?? "environment"] ?? 0) + 1;
  const functionName = diagnostic.file ? enclosingFunction(tokenAt(diagnostic.file, diagnostic.start ?? 0)) : "environment";
  const functionKey = `${item?.name ?? "environment"}:${functionName}`;
  functionCounts[functionKey] = (functionCounts[functionKey] ?? 0) + 1;
  failures.push({ item: item?.name ?? "environment", code: diagnostic.code, line: position ? position.line + 1 : null, column: position ? position.character + 1 : null, function: functionName, message });
}
function resolved(symbol) {
  const seen = new Set();
  while (symbol && symbol.flags & ts.SymbolFlags.Alias && !seen.has(symbol)) { seen.add(symbol); symbol = checker.getAliasedSymbol(symbol); }
  const assignment = symbol?.declarations?.find(ts.isExportAssignment);
  if (assignment && ts.isIdentifier(assignment.expression)) return resolved(checker.getSymbolAtLocation(assignment.expression));
  return symbol;
}
const publicContracts = [];
for (const item of items) {
  const source = program.getSourceFile(item.filename);
  const module = source && checker.getSymbolAtLocation(source);
  const exports = module && new Map(checker.getExportsOfModule(module).map((symbol) => [symbol.name, symbol]));
  if (!exports?.has("default") || !exports.has("Component") || !exports.has("Demo")) { failures.push({ item: item.name, contract: "Default reusable Component and named Demo exports are required." }); continue; }
  const component = resolved(exports.get("Component")), defaultExport = resolved(exports.get("default")), demo = resolved(exports.get("Demo"));
  if (component !== defaultExport) failures.push({ item: item.name, contract: "Default must reference the reusable Component binding." });
  if (component === demo) failures.push({ item: item.name, contract: "Demo must remain a distinct named example." });
  const declaration = component?.valueDeclaration ?? component?.declarations?.[0] ?? source;
  const type = checker.getTypeOfSymbolAtLocation(component, declaration);
  const signature = type.getCallSignatures()[0];
  if (!signature) { failures.push({ item: item.name, contract: "Reusable Component must be callable." }); continue; }
  const parameter = signature.parameters[0];
  const props = parameter && checker.getTypeOfSymbolAtLocation(parameter, parameter.valueDeclaration ?? declaration);
  if (props?.flags & ts.TypeFlags.Any) failures.push({ item: item.name, contract: "Public component props must not be any." });
  if (props?.flags & ts.TypeFlags.Unknown) failures.push({ item: item.name, contract: "Public component props must expose a concrete contract rather than unknown." });
  if (props && checker.getIndexTypeOfType(props, ts.IndexKind.String)) failures.push({ item: item.name, contract: "Public component props must not be a blanket string-indexed record." });
  publicContracts.push({ item: item.name, props: props ? checker.typeToString(props) : "no props", properties: props ? checker.getPropertiesOfType(props).map((property) => property.name) : [] });
}
const report = { passed: failures.length === 0, source: candidateDirectory ? "candidate source directory" : "installed registry payloads", items: items.length, compiler: ts.version, strict: true, allowJs: false, compilerDiagnostics: diagnostics.length, diagnosticsByCode: counts, diagnosticsByItem: itemCounts, diagnosticsByFunction: functionCounts, publicContracts, failures, scope: "Every complete TSX source is compiled under strict TypeScript. Default identity, named Demo and typed public component props are also checked. Dependency declaration files are skipped; library source is never skipped." };
if (process.env.PLICO_TYPES_REPORT) { const file = path.resolve(process.env.PLICO_TYPES_REPORT); await mkdir(path.dirname(file), { recursive: true }); await writeFile(file, `${JSON.stringify(report, null, 2)}\n`); }
console.log(JSON.stringify({ passed: report.passed, items: report.items, strict: true, compilerDiagnostics: diagnostics.length, diagnosticsByCode: counts, diagnosticsByItem: itemCounts, contractFailures: failures.filter((failure) => failure.contract), firstDiagnostics: failures.filter((failure) => failure.code).slice(0, 20) }, null, 2));
assert(report.passed, `${failures.length} strict source/public-contract failures. Set PLICO_TYPES_REPORT outside the repository for complete per-function diagnostics.`);
