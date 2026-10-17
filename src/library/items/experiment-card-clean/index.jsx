"use client";
import * as React from "react";
import { PlicoDemo_g as PublicDemo } from "../../modules/demo.clean-BWn0UMw5.jsx";
export { PlicoCore_p as Component } from "../../modules/demo.clean-BWn0UMw5.jsx";
export { PlicoCore_p as ExperimentCardClean } from "../../modules/demo.clean-BWn0UMw5.jsx";
const demoStyles =
  ".xc-demo{grid-template-columns:min(340px,100%);place-content:start center;width:100%;height:320px;display:grid}.card__preview .xc-demo{grid-template-columns:auto;height:auto;position:absolute;inset:50px 0 0}.card__preview .xc-demo .ui-xc{zoom:.52;width:340px;max-width:none}.stage:has(.xc-demo){height:500px}@media (width<=760px){.xc-demo{height:auto}.stage:has(.xc-demo){align-items:start;height:560px;padding:120px 16px 24px}}.card__preview .xc-demo .ui-xcc{zoom:.52;width:340px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-experiment-card-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ExperimentCardCleanDemo };
export default Demo;
