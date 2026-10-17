"use client";
import * as React from "react";
import { PlicoDemo_h as PublicDemo } from "../../modules/demo.clean-DRkQ7w4o.jsx";
export { PlicoCore_u as Component } from "../../modules/demo.clean-DRkQ7w4o.jsx";
export { PlicoCore_u as AiAnswerClean } from "../../modules/demo.clean-DRkQ7w4o.jsx";
const demoStyles =
  ".answer-demo{grid-template-columns:minmax(0,640px);place-content:center;width:100%;display:grid}.card__preview .answer-demo{grid-template-columns:auto;align-content:start;padding-top:44px;position:absolute;inset:0;-webkit-mask:linear-gradient(#000 70%,#0000 96%);mask:linear-gradient(#000 70%,#0000 96%)}.card__preview .answer-demo .ui-ans,.card__preview .answer-demo .ui-ansc{zoom:.44;width:640px;max-width:none}.stage:has(.answer-demo){align-items:start;height:780px;padding:48px 32px}@media (width<=760px){.stage:has(.answer-demo){height:980px;padding:52px 12px 16px}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-ai-answer-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AiAnswerCleanDemo };
export default Demo;
