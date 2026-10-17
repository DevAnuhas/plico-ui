"use client";
import * as React from "react";
import { PlicoDemo_b as PublicDemo } from "../../modules/demo-B_Bc7Zla.jsx";
export { IntegrationBeam as Component } from "./Component";
export { IntegrationBeam as IntegrationBeam } from "./Component";
const demoStyles =
  '.integration-beam-demo{width:100%}.integration-beam-demo .ui-ib{width:min(100%,620px);margin:0 auto}.stage .integration-beam-demo,.card__preview .integration-beam-demo{--ib-demo-dot:#00000013;border-radius:inherit;background-image:radial-gradient(circle, var(--ib-demo-dot) 1px, transparent 1.4px);background-position:50%;background-size:18px 18px;place-items:center;width:auto;padding:52px 24px;display:grid;position:absolute;inset:0;overflow:hidden}.stage .integration-beam-demo:before,.card__preview .integration-beam-demo:before{content:"";background:radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, var(--preview) 100%);pointer-events:none;position:absolute;inset:0}:where(.dark,[data-theme=dark]) .integration-beam-demo{--ib-demo-dot:#ffffff0f}.card__preview .integration-beam-demo{padding:40px 0 8px}.card__preview .integration-beam-demo .ui-ib{zoom:.52;width:520px}@media (width<=760px){.stage:has(.integration-beam-demo){height:460px;min-height:0}.stage .integration-beam-demo{padding:56px 16px 40px}}\n';
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-integration-beam" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as IntegrationBeamDemo };
export default Demo;

export * from "./Component";
