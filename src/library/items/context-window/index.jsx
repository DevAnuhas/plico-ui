"use client";
import * as React from "react";
import { PlicoDemo__ as PublicDemo } from "../../modules/demo-jxSKfjMs.jsx";
export { PlicoCore_m as Component } from "../../modules/demo-jxSKfjMs.jsx";
export { PlicoCore_m as ContextWindow } from "../../modules/demo-jxSKfjMs.jsx";
const demoStyles =
  ".cw-demo{grid-template-columns:min(360px,100%);place-content:start center;width:100%;height:440px;display:grid}.card__preview .cw-demo{grid-template-columns:auto;height:auto;position:absolute;inset:42px 0 0}.card__preview .cw-demo .ui-cw{zoom:.5;width:360px;max-width:none}.stage:has(.cw-demo){height:560px}@media (width<=760px){.cw-demo{height:auto}.stage:has(.cw-demo){align-items:start;height:680px;padding:120px 16px 24px}}.card__preview .cw-demo .ui-cwc{zoom:.5;width:360px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-context-window" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ContextWindowDemo };
export default Demo;
