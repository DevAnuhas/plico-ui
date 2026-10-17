"use client";
import * as React from "react";
import { PlicoDemo_c as PublicDemo } from "../../modules/demo-D_fnjW-9.jsx";
export { ChangeSummary as Component } from "./Component";
export { ChangeSummary as ChangeSummary } from "./Component";
const demoStyles =
  ".change-demo{grid-template-columns:minmax(0,480px);place-content:center;width:100%;display:grid}.card__preview .change-demo{grid-template-columns:auto;position:absolute;inset:0}.card__preview .change-demo .ui-cs{zoom:.6;width:480px;max-width:none}.card__preview .change-demo .ui-csc{zoom:.62;width:480px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-change-summary" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ChangeSummaryDemo };
export default Demo;

export * from "./Component";
