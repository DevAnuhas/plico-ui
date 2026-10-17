const origin =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:4210");
export const brand = {
  name: "Plico UI",
  slug: "plico-ui",
  namespace: "@plico",
  markPath: "M4 4h16l8 8v8H12v8H4V4Zm8 8v4h8v-4h-8Zm8-8h-2l-8 8h2l8-8Z",
  description: "React components, blocks, screens and motion for AI products.",
  tagline: "Agent-ready React UI for AI products.",
  url: origin,
  siteUrl: origin,
  mcpUrl: `${origin}/mcp`,
  repoUrl: "https://github.com/DevAnuhas/plico-ui",
};
