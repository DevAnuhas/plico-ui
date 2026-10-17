import { brand } from "@/lib/brand";
import "@/site/site.css";
export const metadata = {
  title: { default: brand.name, template: `%s · ${brand.name}` },
  description: brand.description,
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
        <script
          id="plico-theme"
          dangerouslySetInnerHTML={{ __html: initializeTheme }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
