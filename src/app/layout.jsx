import { brand } from "@/lib/brand";
import "@/site/site.css";
export const metadata = {
  metadataBase: new URL(brand.siteUrl),
  applicationName: brand.name,
  title: { default: brand.name, template: `%s · ${brand.name}` },
  description: brand.description,
  icons: {
    icon: [{ url: "/brand/plico-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/plico-apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: brand.name,
    description: brand.description,
    images: [{ url: "/brand/plico-social.png", width: 1200, height: 630, alt: brand.tagline }],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
    images: ["/brand/plico-social.png"],
  },
  robots: { index: false, follow: false },
};
const initializeTheme = `(() => {
  try {
    const query = new URLSearchParams(location.search).get("theme");
    const stored = localStorage.getItem("theme");
    const theme = query === "light" || query === "dark" ? query : stored;
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
      if (query === theme) localStorage.setItem("theme", theme);
    }
    document.documentElement.classList.toggle("dark",
      theme === "dark" || (theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches));
  } catch {}
})();`;
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="plico-theme" dangerouslySetInnerHTML={{ __html: initializeTheme }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
