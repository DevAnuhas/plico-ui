"use client";
import * as React from "react";
import { PlicoDemo_c as PublicDemo } from "../../modules/demo-CU49Fdlm.jsx";
export { EnrichmentOrbit as Component } from "./Component";
export { EnrichmentOrbit as EnrichmentOrbit } from "./Component";
const demoStyles =
  ".enrichment-orbit-demo{width:100%}.stage .enrichment-orbit-demo{width:min(100%,560px)}.card__preview .enrichment-orbit-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .enrichment-orbit-demo .ui-eo{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-enrichment-orbit" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as EnrichmentOrbitDemo };
export default Demo;

export * from "./Component";
