"use client";
import * as React from "react";
import { PlicoDemo_y as PublicDemo } from "../../modules/demo.clean-Do8sBWBG.jsx";
export { PlicoCore_h as Component } from "../../modules/demo.clean-Do8sBWBG.jsx";
export { PlicoCore_h as CitedAnswerClean } from "../../modules/demo.clean-Do8sBWBG.jsx";
const demoStyles =
  ".ca-demo{grid-template-columns:min(440px,100%);place-content:start center;width:100%;height:640px;display:grid}.card__preview .ca-demo{grid-template-columns:auto;height:auto;position:absolute;inset:44px 0 0}.card__preview .ca-demo .ui-ca{zoom:.5;width:440px;max-width:none}.stage:has(.ca-demo){height:740px}@media (width<=760px){.ca-demo{height:auto}.stage:has(.ca-demo){align-items:start;height:1040px;padding:120px 16px 24px}}.card__preview .ca-demo .ui-cac{zoom:.5;width:440px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-cited-answer-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as CitedAnswerCleanDemo };
export default Demo;
