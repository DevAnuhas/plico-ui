import assert from "node:assert/strict";
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "@babel/parser";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await readFile(path.join(root, "src/library/catalog.json"), "utf8"));
const entries = new Map(catalog.items.map((item) => [item.registryItem, item]));
const chunkDirectory = path.join(root, "src/site/chunks");
const snippets = [];
const issues = [];
const virtualFiles = new Map();

function walk(node, visitor) {
  if (!node || typeof node !== "object") return;
  if (typeof node.type === "string") visitor(node);
  for (const [key, value] of Object.entries(node)) {
    if (["loc", "start", "end", "extra", "comments"].includes(key)) continue;
    if (Array.isArray(value)) value.forEach((child) => walk(child, visitor));
    else if (value && typeof value === "object") walk(value, visitor);
  }
}

for (const filename of (await readdir(chunkDirectory)).filter((name) => name.startsWith("docs") && name.endsWith(".js")).sort()) {
  const file = path.join(chunkDirectory, filename);
  const source = await readFile(file, "utf8");
  const ast = parse(source, { sourceType: "module", plugins: ["jsx", "typescript"] });
  walk(ast, (node) => {
    const code = node.type === "StringLiteral" ? node.value : node.type === "TemplateLiteral" && node.expressions.length === 0 ? node.quasis[0]?.value.cooked : null;
    if (code?.includes("@/components/plico/") && /\bimport\s/.test(code)) snippets.push({ file: path.relative(root, file), line: node.loc.start.line, code });
  });
}
assert(snippets.length > 0, "No documented library snippets were found.");

for (const [index, snippet] of snippets.entries()) {
  let ast;
  try {
    ast = parse(snippet.code, { sourceType: "module", plugins: ["jsx", "typescript"] });
  } catch (error) {
    issues.push({ file: snippet.file, line: snippet.line, parseError: error.message });
    continue;
  }
  const filename = path.join(root, "__docs_import_checks__", `snippet-${index}.tsx`);
  const declarations = [];
  for (const node of ast.program.body) {
    if (node.type !== "ImportDeclaration" || !node.source.value.startsWith("@/components/plico/")) continue;
    const name = node.source.value.slice("@/components/plico/".length);
    const entry = entries.get(name);
    if (!entry) {
      issues.push({ file: snippet.file, line: snippet.line, module: node.source.value, missingModule: true });
      continue;
    }
    const target = path.join(root, entry.entryPoint);
    let relative = path.relative(path.dirname(filename), target).split(path.sep).join("/");
    if (!relative.startsWith(".")) relative = `./${relative}`;
    declarations.push(`${snippet.code.slice(node.start, node.source.start)}${JSON.stringify(relative)}${snippet.code.slice(node.source.end, node.end)}`);
  }
  if (declarations.length) virtualFiles.set(filename, { text: `${declarations.join("\n")}\nexport {};\n`, snippet });
}

// TypeScript follows real re-exports, including type declarations through export *.
// Only import declarations enter this virtual program; example app/API placeholders
// do not get mistaken for library type failures. Every complete snippet is parsed above.
const options = { allowJs: false, noEmit: true, skipLibCheck: true, strict: true, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, esModuleInterop: true };
const host = ts.createCompilerHost(options);
const baseGetSourceFile = host.getSourceFile.bind(host);
const baseFileExists = host.fileExists.bind(host);
const baseReadFile = host.readFile.bind(host);
host.fileExists = (file) => virtualFiles.has(path.normalize(file)) || baseFileExists(file);
host.readFile = (file) => virtualFiles.get(path.normalize(file))?.text ?? baseReadFile(file);
host.getSourceFile = (file, languageVersion, onError, shouldCreateNewSourceFile) => {
  const virtual = virtualFiles.get(path.normalize(file));
  return virtual ? ts.createSourceFile(file, virtual.text, languageVersion, true, ts.ScriptKind.TSX) : baseGetSourceFile(file, languageVersion, onError, shouldCreateNewSourceFile);
};
const program = ts.createProgram([...virtualFiles.keys()], options, host);
const checker = program.getTypeChecker();
let importsChecked = 0;
let symbolsChecked = 0;
for (const [filename, { snippet }] of virtualFiles) {
  const sourceFile = program.getSourceFile(filename);
  assert(sourceFile, "Virtual documentation module was not loaded.");
  for (const node of sourceFile.statements.filter(ts.isImportDeclaration)) {
    importsChecked++;
    const symbol = checker.getSymbolAtLocation(node.moduleSpecifier);
    if (!symbol) {
      issues.push({ file: snippet.file, line: snippet.line, module: node.moduleSpecifier.text, unresolvedFacade: true });
      continue;
    }
    const available = new Map(checker.getExportsOfModule(symbol).map((entry) => [entry.name, entry]));
    const missing = [];
    if (node.importClause?.name) {
      symbolsChecked++;
      if (!available.has("default")) missing.push({ name: "default", typeOnly: node.importClause.isTypeOnly });
    }
    if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
      for (const specifier of node.importClause.namedBindings.elements) {
        symbolsChecked++;
        const name = (specifier.propertyName ?? specifier.name).text;
        if (!available.has(name)) missing.push({ name, typeOnly: node.importClause.isTypeOnly || specifier.isTypeOnly });
      }
    }
    if (missing.length) issues.push({ file: snippet.file, line: snippet.line, module: node.moduleSpecifier.text.replace(/^.*\/src\/library\//, "@/components/plico/").replace(/\.tsx$/, ""), missing, available: [...available.keys()] });
  }
}

const report = { passed: issues.length === 0, snippets: snippets.length, importsChecked, symbolsChecked, checker: "Babel parses complete JSX/TypeScript snippets; TypeScript resolves actual facade exports, including exported types and export-star chains.", issues, scope: "Documented library import names and complete-snippet syntax. Application API placeholders, example state behavior and native rendering are outside this check." };
if (process.env.PLICO_DOCS_REPORT) {
  const reportFile = path.resolve(process.env.PLICO_DOCS_REPORT);
  await mkdir(path.dirname(reportFile), { recursive: true });
  await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`);
}
console.log(JSON.stringify(report, null, 2));
assert(report.passed, `${issues.length} documented snippet/import problems; see the report above.`);
