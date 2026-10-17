/** Build the portable Plico UI registry from its canonical TypeScript components. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  require = createRequire(path.join(root, "package.json"));
const parser = await import(require.resolve("@babel/parser"));
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "registry/library-manifest.json"), "utf8"),
);
const out = path.join(root, "public/r");
fs.mkdirSync(out, { recursive: true });
function exportedAPI(source) {
  const ast = parser.parse(source, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    }),
    runtime = new Set(),
    types = new Set(),
    typeNames = new Set();
  for (const node of ast.program.body) {
    const d = node.type === "ExportNamedDeclaration" ? node.declaration : node;
    if (d && /^TS(?:TypeAlias|Interface)/.test(d.type)) typeNames.add(d.id.name);
  }
  for (const node of ast.program.body) {
    if (node.type === "ExportDefaultDeclaration") runtime.add("default");
    if (node.type !== "ExportNamedDeclaration") continue;
    if (node.declaration) {
      const d = node.declaration,
        target =
          node.exportKind === "type" || /^TS(?:TypeAlias|Interface)/.test(d.type) ? types : runtime;
      if (d.id) target.add(d.id.name);
      for (const variable of d.declarations || [])
        if (variable.id.type === "Identifier") target.add(variable.id.name);
    }
    for (const spec of node.specifiers || []) {
      const name = spec.exported.name || spec.exported.value;
      (node.exportKind === "type" || spec.exportKind === "type" || typeNames.has(spec.local.name)
        ? types
        : runtime
      ).add(name);
    }
  }
  return {
    runtime: [...runtime].sort(),
    types: [...types].sort(),
    external: [
      ...new Set(
        ast.program.body.filter((n) => n.type === "ImportDeclaration").map((n) => n.source.value),
      ),
    ],
  };
}
const noticePath = "registry/notices/plico-ui.txt",
  notice = fs.readFileSync(path.join(root, noticePath), "utf8"),
  items = [];
for (const entry of manifest.entries) {
  const name = entry.sourceSlug,
    canonical = `src/components/plico/${name}.tsx`,
    content = fs.readFileSync(path.join(root, canonical), "utf8"),
    api = exportedAPI(content);
  entry.exports = api.runtime;
  entry.typeExports = api.types;
  if (
    api.external.some(
      (source) => source.startsWith(".") || source.startsWith("/") || source.startsWith("@/"),
    )
  )
    throw new Error(`Component ${name} is not self-contained`);
  if (
    !api.runtime.includes("Component") ||
    !api.runtime.includes("Demo") ||
    !api.runtime.includes("default")
  )
    throw new Error(`Incomplete public exports: ${name}`);
  const target = `@components/plico/${name}.tsx`,
    files = [
      { path: canonical, type: "registry:component", target, content },
      {
        path: noticePath,
        type: "registry:file",
        target: "~/licenses/plico-ui.txt",
        content: notice,
      },
    ],
    type = ["blocks", "screens"].includes(entry.section) ? "registry:block" : "registry:component",
    dependencies = [
      ...new Set(
        api.external
          .filter((x) => !["react", "react-dom"].includes(x))
          .map((x) =>
            x
              .split("/")
              .slice(0, x.startsWith("@") ? 2 : 1)
              .join("/"),
          ),
      ),
    ].sort();
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type,
    title: entry.title + (entry.variant === "clean" ? " · Clean" : ""),
    description: `${entry.title} for React. Includes a reusable client component and named interactive demo.`,
    dependencies,
    registryDependencies: [],
    files,
    meta: {
      namespace: "@plico",
      section: entry.section,
      slug: entry.slug,
      variant: entry.variant,
      entrypoint: target,
      main: target,
      primaryFile: target,
      exports: api.runtime,
      ...(api.types.length ? { typeExports: api.types } : {}),
      react: ">=19",
      license: "MIT",
    },
  };
  fs.writeFileSync(path.join(out, name + ".json"), JSON.stringify(item, null, 2) + "\n");
  items.push({ ...item, files: files.map(({ content, ...file }) => file) });
}
function siteHomepage() {
  const candidates = [
    { value: process.env.NEXT_PUBLIC_SITE_URL, production: false },
    { value: process.env.VERCEL_PROJECT_PRODUCTION_URL, production: true },
  ];
  for (const { value, production } of candidates) {
    if (!value?.trim()) continue;
    try {
      const raw = value.trim(),
        url = new URL(production && !/^https?:\/\//i.test(raw) ? "https://" + raw : raw);
      if (
        !["http:", "https:"].includes(url.protocol) ||
        !url.hostname ||
        url.username ||
        url.password
      )
        continue;
      if (production) url.protocol = "https:";
      url.search = "";
      url.hash = "";
      return url.toString().replace(/\/$/, "");
    } catch {}
  }
  return "http://127.0.0.1:4210";
}
fs.writeFileSync(
  path.join(root, "registry/library-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "@plico",
  homepage: siteHomepage(),
  items,
};
fs.writeFileSync(
  path.join(root, "registry/registry.json"),
  JSON.stringify(registry, null, 2) + "\n",
);
fs.writeFileSync(path.join(out, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
const coverage = {
  entries: new Set(manifest.entries.map((item) => item.section + "/" + item.slug)).size,
  variants: manifest.entries.length,
  fullScreenMappings: manifest.entries
    .filter((item) => item.section === "screens")
    .map((item) => ({
      slug: item.slug,
      entry: `src/components/plico/${item.sourceSlug}.tsx`,
      export: "FullScreen",
    })),
  registryFiles: items.reduce((sum, item) => sum + item.files.length, 0),
  items: items.map((item) => ({
    name: item.name,
    files: item.files.length,
    sha256: createHash("sha256")
      .update(fs.readFileSync(path.join(out, item.name + ".json")))
      .digest("hex"),
  })),
};
fs.writeFileSync(
  path.join(root, "registry/coverage.json"),
  JSON.stringify(coverage, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      entries: coverage.entries,
      variants: coverage.variants,
      fullScreenMappings: coverage.fullScreenMappings.length,
      registryFiles: coverage.registryFiles,
    },
    null,
    2,
  ),
);
