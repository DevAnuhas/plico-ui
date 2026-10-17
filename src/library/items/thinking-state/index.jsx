"use client";
import * as React from "react";
import { PlicoDemo_a as PublicDemo } from "../../modules/demo-CnnmXlmZ.jsx";
export { PlicoCore_o as Component } from "../../modules/component-DWcBqJQY.jsx";
export { PlicoCore_o as ThinkingState } from "../../modules/component-DWcBqJQY.jsx";
const demoStyles =
  ".thinking-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .thinking-demo{place-items:start center;padding:18px 24px;position:absolute;inset:0}.card__preview .thinking-demo .ui-think{zoom:.7}.stage .thinking-demo{align-self:start;margin-top:56px}@media (width<=760px){.stage .thinking-demo{margin-top:16px}}.card__preview .thinking-demo:has(.ui-thinkc){padding:44px 24px 0}.card__preview .thinking-demo .ui-thinkc{zoom:.56}@media (width<=760px){.stage .thinking-demo:has(.ui-thinkc){margin-top:72px}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-thinking-state" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ThinkingStateDemo };
export default Demo;
