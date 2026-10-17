"use client";
import * as React from "react";
import { PlicoDemo_r as PublicDemo } from "../../modules/demo-BvRPen0m.jsx";
export { PlicoCore_s as Component } from "../../modules/component-DwKackPh.jsx";
export { PlicoCore_s as ChatComposer } from "../../modules/component-DwKackPh.jsx";
const demoStyles =
  ".chat-composer-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .chat-composer-demo{--ui-cc-span:2100;width:calc(100% - 8px)}.card__preview .chat-composer-demo .ui-ccc{zoom:.74;width:420px;max-width:none}.stage .chat-composer-demo .ui-ccc{zoom:1.2143;width:560px;max-width:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-chat-composer" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ChatComposerDemo };
export default Demo;
