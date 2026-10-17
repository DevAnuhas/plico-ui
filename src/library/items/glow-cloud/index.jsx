"use client";
import * as React from "react";
import { PlicoDemo_h as PublicDemo } from "../../modules/demo-Cm8kSHcX.jsx";
export { GlowCloud as Component } from "./Component";
export { GlowCloud as GlowCloud } from "./Component";
const demoStyles =
  ".glow-cloud-demo{width:min(100%,360px);display:grid}.stage .glow-cloud-demo,.card__preview .glow-cloud-demo{width:auto;position:absolute;inset:0;overflow:hidden}.stage .glow-cloud-demo>*,.card__preview .glow-cloud-demo>*{aspect-ratio:auto;height:100%}.stage .glow-cloud-demo svg{max-width:min(380px,78%)}.card__preview .glow-cloud-demo svg{width:175px;max-width:175px}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-glow-cloud" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as GlowCloudDemo };
export default Demo;

export * from "./Component";
