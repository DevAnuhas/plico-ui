"use client";
import * as React from "react";
import { PlicoDemo_c as PublicDemo } from "../../modules/demo-B2j7cOwX.jsx";
export { PlicoCore_s as Component } from "../../modules/component-C_OhOiCe.jsx";
export { PlicoCore_s as BreakdownChart } from "../../modules/component-C_OhOiCe.jsx";
const demoStyles =
  ".breakdown-demo{grid-template-columns:minmax(0,560px);place-content:center;width:100%;display:grid}.stage:has(.breakdown-demo){height:800px}.stage .breakdown-demo{align-self:start;margin-top:24px}.card__preview .breakdown-demo{grid-template-columns:auto;place-content:start center;padding-top:40px;position:absolute;inset:0;-webkit-mask-image:linear-gradient(#000 78%,#0000);mask-image:linear-gradient(#000 78%,#0000)}.card__preview .breakdown-demo .ui-bc,.card__preview .breakdown-demo .ui-bcc{zoom:.52;width:560px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-breakdown-chart" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as BreakdownChartDemo };
export default Demo;
