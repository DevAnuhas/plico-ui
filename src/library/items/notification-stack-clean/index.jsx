"use client";
import * as React from "react";
import { PlicoDemo_d as PublicDemo } from "../../modules/demo.clean-gBQjVTxc.jsx";
export { NotificationStack as Component } from "./Component";
export { NotificationStack as NotificationStackClean } from "./Component";
const demoStyles =
  ".notice-demo{grid-template-columns:minmax(0,380px);place-content:center;width:100%;display:grid}.card__preview .notice-demo{grid-template-columns:auto;position:absolute;inset:0}.card__preview .notice-demo .ui-ns,.card__preview .notice-demo .ui-nsc{zoom:.62;width:380px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-notification-stack-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as NotificationStackCleanDemo };
export default Demo;

export * from "./Component";
