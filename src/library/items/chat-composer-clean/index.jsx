"use client";
import * as React from "react";
import { PlicoDemo_k as PublicDemo } from "../../modules/demo.clean-CA_ipDzE.jsx";
export { PlicoCore_c as Component } from "../../modules/demo.clean-CA_ipDzE.jsx";
export { PlicoCore_c as ChatComposerClean } from "../../modules/demo.clean-CA_ipDzE.jsx";
const demoStyles =
  ".chat-composer-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .chat-composer-demo{--ui-cc-span:2100;width:calc(100% - 8px)}.card__preview .chat-composer-demo .ui-ccc{zoom:.74;width:420px;max-width:none}.stage .chat-composer-demo .ui-ccc{zoom:1.2143;width:560px;max-width:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-chat-composer-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ChatComposerCleanDemo };
export default Demo;
