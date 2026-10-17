"use client";
import * as React from "react";
import { PlicoDemo_S as PublicDemo } from "../../modules/demo-fp335z0j.jsx";
export { PlicoCore_v as Component } from "../../modules/demo-fp335z0j.jsx";
export { PlicoCore_v as CitedAnswer } from "../../modules/demo-fp335z0j.jsx";
const demoStyles =
  ".ca-demo{grid-template-columns:min(440px,100%);place-content:start center;width:100%;height:640px;display:grid}.card__preview .ca-demo{grid-template-columns:auto;height:auto;position:absolute;inset:44px 0 0}.card__preview .ca-demo .ui-ca{zoom:.5;width:440px;max-width:none}.stage:has(.ca-demo){height:740px}@media (width<=760px){.ca-demo{height:auto}.stage:has(.ca-demo){align-items:start;height:1040px;padding:120px 16px 24px}}.card__preview .ca-demo .ui-cac{zoom:.5;width:440px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-cited-answer" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as CitedAnswerDemo };
export default Demo;
