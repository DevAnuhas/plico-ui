"use client";
import dynamic from "next/dynamic";
const Site = dynamic(() => import("@/site/site-app"), {
  ssr: false,
  loading: () => <div className="site-loading" aria-label="Loading library" />,
});
export default function ClientSite() {
  return <Site />;
}
