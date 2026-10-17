import { readFile } from "node:fs/promises";
import path from "node:path";
import catalog from "@/library/catalog.json";

export const libraryItems = catalog.items;
const allowedOrigins = new Set([
  "http://localhost:4210",
  "http://127.0.0.1:4210",
  "http://[::1]:4210",
]);
for (const value of [
  process.env.NEXT_PUBLIC_SITE_URL,
  ...[
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ]
    .filter(Boolean)
    .map((host) => `https://${host}`),
]) {
  if (!value) continue;
  try {
    const url = new URL(value);
    if (["http:", "https:"].includes(url.protocol)) allowedOrigins.add(url.origin);
  } catch {
    // Invalid deployment configuration must not grant an origin access.
  }
}
export function requestOrigin(request) {
  const url = new URL(request.url);
  const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || url.host)
    .split(",")[0]
    .trim();
  const forwarded = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwarded === "https" || forwarded === "http" ? `${forwarded}:` : url.protocol;
  if (!/^[a-zA-Z0-9.:[\]-]+$/.test(host)) return null;
  try {
    const origin = new URL(`${protocol}//${host}`).origin;
    return allowedOrigins.has(origin) ? origin : null;
  } catch {
    return null;
  }
}
export function findItem(name) {
  return libraryItems.find((item) => item.name === name || item.registryItem === name);
}
export async function readRegistryItem(name) {
  const item = findItem(name);
  if (!item || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.registryItem)) return null;
  const content = await readFile(
    path.join(process.cwd(), "public", "r", `${item.registryItem}.json`),
    "utf8",
  );
  return JSON.parse(content);
}
export function itemSummary(item, origin) {
  return {
    name: item.name,
    title: item.title,
    description: item.description,
    section: item.section,
    style: item.style,
    url: `${origin}/${item.section}/${item.slug}`,
    registry: `${origin}/r/${item.registryItem}.json`,
    install: `npx shadcn@latest add ${origin}/r/${item.registryItem}.json`,
  };
}
