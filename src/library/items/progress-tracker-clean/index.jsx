"use client";
import * as React from "react";
import { PlicoDemo_s as PublicDemo } from "../../modules/demo.clean-CQ9Mgt2p.jsx";
export { ProgressTracker as Component } from "./Component";
export { ProgressTracker as ProgressTrackerClean } from "./Component";
const demoStyles =
  ".progress-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .progress-demo{position:absolute;inset:0}.card__preview .progress-demo .ui-progress{zoom:.52}.card__preview .progress-demo .ui-progressc{zoom:.6}.stage .progress-demo .ui-progressc{zoom:1.12}@media (width<=760px){.stage .progress-demo:has(.ui-progressc){margin-top:64px}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-progress-tracker-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ProgressTrackerCleanDemo };
export default Demo;

export * from "./Component";
