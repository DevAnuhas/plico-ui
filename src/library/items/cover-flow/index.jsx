"use client";
import * as React from "react";
import { PlicoDemo_c as PublicDemo } from "../../modules/demo-C2jfF4UB.jsx";
export { CoverFlow as Component } from "./Component";
export { CoverFlow as CoverFlow } from "./Component";
const demoStyles =
  ".cf-demo{grid-template-columns:minmax(0,1fr);width:100%;max-width:980px;margin:0 auto;display:grid}.cf-demo__gradient{width:100%;height:100%}.card__preview .cf-demo{place-content:center;max-width:none;padding-top:26px;position:absolute;inset:0}.card__preview .cf-demo .ui-cf{zoom:.62;pointer-events:none}.card__preview .cf-demo .ui-cf__footer{display:none}.stage:has(.cf-demo){height:580px;padding-left:0;padding-right:0}@media (width<=760px){.stage:has(.cf-demo){height:520px}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-cover-flow" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as CoverFlowDemo };
export default Demo;

export * from "./Component";
