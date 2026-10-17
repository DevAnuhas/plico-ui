"use client";
import * as React from "react";
import { PlicoDemo_l as PublicDemo } from "../../modules/demo-CcNPpld_.jsx";
export { DecisionInbox as Component } from "./Component";
export { DecisionInbox as DecisionInbox } from "./Component";
const demoStyles =
  ".decision-demo{grid-template-columns:minmax(0,440px);place-content:center;width:100%;display:grid}.card__preview .decision-demo{grid-template-columns:auto;position:absolute;inset:0}.card__preview .decision-demo .ui-di{zoom:.56;width:440px;max-width:none}.card__preview .decision-demo .ui-dic{zoom:.6;width:440px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-decision-inbox" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as DecisionInboxDemo };
export default Demo;

export * from "./Component";
