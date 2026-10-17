import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const origin = process.env.PLICO_TEST_URL || "http://127.0.0.1:4210";
const catalog = JSON.parse(
  await readFile(new URL("../src/library/catalog.json", import.meta.url), "utf8"),
);
let nextId = 1;
async function rpc(method, params = {}, headers = {}) {
  const response = await fetch(`${origin}/mcp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      ...headers,
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: nextId++, method, params }),
  });
  return { response, body: await response.json() };
}
const llms = await fetch(`${origin}/llms.txt`);
assert.equal(llms.status, 200);
const text = await llms.text();
assert(text.startsWith("# Plico UI"));
for (const item of catalog.items) assert(text.includes(`/r/${item.registryItem}.json`));
const initialize = await rpc("initialize", {
  protocolVersion: "2025-11-25",
  capabilities: {},
  clientInfo: { name: "plico-check", version: "1" },
});
assert.equal(initialize.body.result.protocolVersion, "2025-11-25");
const notification = await fetch(`${origin}/mcp`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
});
assert.equal(notification.status, 202);
assert.equal(await notification.text(), "");
const list = await rpc("tools/list");
assert.equal(list.body.result.tools.length, 3);
const items = await rpc("tools/call", {
  name: "list_components",
  arguments: { limit: 1 },
});
assert.equal(items.body.result.structuredContent.total, catalog.items.length);
assert.equal(items.body.result.structuredContent.items.length, 1);
const first = catalog.items.find((item) => item.registryItem === "button") || catalog.items[0];
const command = await rpc("tools/call", {
  name: "get_install_command",
  arguments: { name: first.name },
});
assert.equal(
  command.body.result.structuredContent.install,
  `npx shadcn@latest add ${origin}/r/${first.registryItem}.json`,
);
const source = await rpc("tools/call", {
  name: "get_component",
  arguments: { name: first.name },
});
assert(source.body.result.structuredContent.files.length > 0);
assert(
  source.body.result.structuredContent.files.every((file) => typeof file.content === "string"),
);
const missing = await rpc("tools/call", {
  name: "get_component",
  arguments: { name: "../../etc/passwd" },
});
assert.equal(missing.body.result.isError, true);
const method = await rpc("unknown-method");
assert.equal(method.body.error.code, -32601);
const protocol = await rpc("ping", {}, { "MCP-Protocol-Version": "unsupported" });
assert.equal(protocol.response.status, 400);
const denied = await rpc("ping", {}, { Origin: "https://untrusted.invalid" });
assert.equal(denied.response.status, 403);
const spoofedHost = await rpc(
  "ping",
  {},
  {
    Host: "untrusted.invalid",
    "X-Forwarded-Host": "untrusted.invalid",
    Origin: "http://untrusted.invalid",
  },
);
assert.equal(spoofedHost.response.status, 403);
const spoofedIndex = await fetch(`${origin}/llms.txt`, {
  headers: { "X-Forwarded-Host": "untrusted.invalid" },
});
assert.equal(spoofedIndex.status, 403);
const malformed = await fetch(`${origin}/mcp`, { method: "POST", body: "{" });
assert.equal(malformed.status, 400);
const large = await fetch(`${origin}/mcp`, {
  method: "POST",
  body: "x".repeat(65537),
});
assert.equal(large.status, 413);
assert.equal((await fetch(`${origin}/mcp`)).status, 405);
console.log(
  `API checks passed: ${catalog.items.length} library entries, registry discovery, MCP lifecycle/tools, source reading and request boundaries.`,
);
