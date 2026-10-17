import {
  findItem,
  itemSummary,
  libraryItems,
  readRegistryItem,
  requestOrigin,
} from "@/lib/library-server";

export const runtime = "nodejs";
const versions = ["2025-11-25", "2025-06-18", "2025-03-26"];
const tools = [
  {
    name: "list_components",
    description:
      "List or search Plico UI components, blocks, screens, illustrations and motion effects.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        section: {
          type: "string",
          enum: ["components", "blocks", "screens", "illustrations", "motion"],
        },
        style: { type: "string", enum: ["classic", "clean"] },
        limit: { type: "integer", minimum: 1, maximum: 100 },
        offset: { type: "integer", minimum: 0 },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_component",
    description:
      "Read an exact library item and its installable source files. Set includeSource=false for metadata only.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" },
        includeSource: { type: "boolean" },
      },
      required: ["name"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_install_command",
    description: "Get the shadcn CLI command and registry URL for a library item.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string" } },
      required: ["name"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
];
const json = (body, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const error = (id, code, message, status = 200) =>
  json({ jsonrpc: "2.0", id: id ?? null, error: { code, message } }, status);
async function readMessage(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Invalid JSON");
  const chunks = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 65536) {
      await reader.cancel();
      throw new Error("Request too large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}
export async function POST(request) {
  const origin = requestOrigin(request);
  if (!origin || (request.headers.get("origin") && request.headers.get("origin") !== origin))
    return json({ error: "Origin is not allowed" }, 403);
  const protocol = request.headers.get("mcp-protocol-version");
  if (protocol && !versions.includes(protocol))
    return error(null, -32600, "Unsupported protocol version", 400);
  let message;
  try {
    message = await readMessage(request);
  } catch (e) {
    return error(
      null,
      -32700,
      e.message === "Request too large" ? e.message : "Invalid JSON",
      e.message === "Request too large" ? 413 : 400,
    );
  }
  if (
    !message ||
    Array.isArray(message) ||
    message.jsonrpc !== "2.0" ||
    typeof message.method !== "string"
  )
    return error(message?.id, -32600, "Invalid request", 400);
  if (!Object.hasOwn(message, "id"))
    return new Response(null, {
      status: 202,
      headers: { "Cache-Control": "no-store" },
    });
  const ok = (result) => json({ jsonrpc: "2.0", id: message.id, result });
  if (message.method === "initialize")
    return ok({
      protocolVersion: versions.includes(message.params?.protocolVersion)
        ? message.params.protocolVersion
        : versions[0],
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: "plico-ui", version: "0.2.0" },
      instructions:
        "Read library metadata and source with the provided tools. Install selected items using the shadcn CLI registry URL.",
    });
  if (message.method === "ping") return ok({});
  if (message.method === "tools/list") return ok({ tools });
  if (message.method !== "tools/call") return error(message.id, -32601, "Method not found");
  const name = message.params?.name;
  const args = message.params?.arguments || {};
  const result = (data) =>
    ok({
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    });
  const fail = (text) => ok({ content: [{ type: "text", text }], isError: true });
  if (name === "list_components") {
    const query =
      typeof args.query === "string" ? args.query.trim().toLowerCase().slice(0, 200) : "";
    const items = libraryItems.filter(
      (item) =>
        (!query ||
          `${item.name} ${item.title} ${item.description}`.toLowerCase().includes(query)) &&
        (!args.section || item.section === args.section) &&
        (!args.style || item.style === args.style),
    );
    const offset = Number.isInteger(args.offset) ? Math.max(0, args.offset) : 0;
    const limit = Number.isInteger(args.limit) ? Math.max(1, Math.min(100, args.limit)) : 40;
    return result({
      total: items.length,
      offset,
      items: items.slice(offset, offset + limit).map((item) => itemSummary(item, origin)),
    });
  }
  if (name === "get_component" || name === "get_install_command") {
    if (typeof args.name !== "string") return fail("A component name is required.");
    const item = findItem(args.name);
    if (!item) return fail("Component not found. Use list_components to discover valid names.");
    const data = itemSummary(item, origin);
    if (name === "get_component" && args.includeSource !== false) {
      const registry = await readRegistryItem(item.registryItem);
      data.files = registry.files;
      data.dependencies = registry.dependencies || [];
      data.registryDependencies = registry.registryDependencies || [];
    }
    return result(data);
  }
  return error(message.id, -32602, "Unknown tool");
}
export function GET() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
