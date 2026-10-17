import { libraryItems, itemSummary, requestOrigin } from "@/lib/library-server";
export const runtime = "nodejs";
export function GET(request) {
  const origin = requestOrigin(request);
  if (!origin) return new Response("Host is not allowed", { status: 403 });
  const lines = [
    "# Plico UI",
    "",
    "> React components, blocks, screens, illustrations and motion effects.",
    "",
    `Website: ${origin}`,
    `MCP endpoint: ${origin}/mcp`,
    "MCP transport: stateless Streamable HTTP, protocol 2025-11-25.",
    "Registry namespace: @plico",
    "",
    "Install an item with: npx shadcn@latest add <registry URL>",
    "Protected deployments require the hosting bypass header in the registry configuration.",
    "",
  ];
  for (const section of ["components", "blocks", "screens", "illustrations", "motion"]) {
    lines.push(`## ${section}`, "");
    for (const item of libraryItems.filter((item) => item.section === section)) {
      const summary = itemSummary(item, origin);
      lines.push(`- [${item.title} (${item.style})](${summary.registry}): ${item.description}`);
    }
    lines.push("");
  }
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
