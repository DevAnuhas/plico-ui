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
  description: "React components, blocks, screens and motion for AI products.",
  tagline: "Agent-ready React UI for AI products.",
  url: origin,
  siteUrl: origin,
  mcpUrl: `${origin}/mcp`,
  repoUrl: "https://github.com/DevAnuhas/plico-ui",
};
