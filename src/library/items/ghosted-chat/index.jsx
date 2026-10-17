"use client";
import * as React from "react";
import { PlicoDemo_s as PublicDemo } from "../../modules/demo-Cm2FVMWj.jsx";
export { GhostedChat as Component } from "./Component";
export { GhostedChat as GhostedChat } from "./Component";
const demoStyles =
  ".ghosted-chat-demo{width:100%}.stage .ghosted-chat-demo{width:min(100%,560px)}.card__preview .ghosted-chat-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .ghosted-chat-demo .ui-gc{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-ghosted-chat" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as GhostedChatDemo };
export default Demo;

export * from "./Component";
