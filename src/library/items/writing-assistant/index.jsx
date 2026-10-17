"use client";
import * as React from "react";
import { PlicoDemo_s as PublicDemo } from "../../modules/demo-DmFQrpJF.jsx";
export { PlicoCore_a as Component } from "../../modules/demo-DmFQrpJF.jsx";
export { PlicoCore_a as WritingAssistant } from "../../modules/demo-DmFQrpJF.jsx";
const demoStyles =
  ".writing-assistant-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .writing-assistant-demo{position:absolute;inset:0}.card__preview .writing-assistant-demo .ui-wa{zoom:.44}.card__preview .writing-assistant-demo:has(.ui-wac){inset:44px 0 0}.card__preview .writing-assistant-demo .ui-wac{zoom:.42}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-writing-assistant" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as WritingAssistantDemo };
export default Demo;
