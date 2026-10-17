"use client";
import * as React from "react";
import { PlicoDemo_d as PublicDemo } from "../../modules/demo-D34v7Pjy.jsx";
export { PlicoCore_a as Component } from "../../modules/demo-D34v7Pjy.jsx";
export { PlicoCore_a as ProjectFlow } from "../../modules/demo-D34v7Pjy.jsx";
const demoStyles =
  ".project-flow-demo{width:100%}.project-flow-demo .ui-pf[data-theme]{--ui-pf-fade:var(--preview);--ui-pf-dot:color-mix(in srgb, var(--text) 6%, var(--preview))}.stage .project-flow-demo{width:min(100%,600px)}.card__preview .project-flow-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .project-flow-demo .ui-pf{width:auto;height:106%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-project-flow" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ProjectFlowDemo };
export default Demo;
