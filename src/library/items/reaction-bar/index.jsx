"use client";
import * as React from "react";
import { PlicoDemo_d as PublicDemo } from "../../modules/demo-DlJqXDIq.jsx";
export { ReactionBar as Component } from "./Component";
export { ReactionBar as ReactionBar } from "./Component";
const demoStyles =
  ".reaction-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .reaction-demo{position:absolute;inset:0}.card__preview .reaction-demo .ui-rb{zoom:.9}.stage .reaction-demo .ui-rbc{zoom:1.3}.card__preview .reaction-demo .ui-rbc{zoom:1.15}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-reaction-bar" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ReactionBarDemo };
export default Demo;

export * from "./Component";
