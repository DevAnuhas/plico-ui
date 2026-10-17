"use client";
import * as React from "react";
import { PlicoDemo_g as PublicDemo } from "../../modules/demo.clean-CSd5ZCWu.jsx";
export { PlicoCore_d as Component } from "../../modules/demo.clean-CSd5ZCWu.jsx";
export { PlicoCore_d as CompactBreakdownClean } from "../../modules/demo.clean-CSd5ZCWu.jsx";
const demoStyles =
  ".cb-demo{grid-template-columns:minmax(0,360px);place-content:center;width:100%;display:grid}.card__preview .cb-demo{grid-template-columns:auto;place-content:center;position:absolute;inset:40px 0 18px}.card__preview .cb-demo .ui-cb{zoom:.54;width:340px;max-width:none}.stage:has(.cb-demo){height:480px}@media (width<=760px){.stage:has(.cb-demo){align-items:start;height:520px;padding:120px 16px 24px}}.card__preview .cb-demo .ui-cbc{zoom:.47;width:340px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-compact-breakdown-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as CompactBreakdownCleanDemo };
export default Demo;
