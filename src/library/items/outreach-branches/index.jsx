"use client";
import * as React from "react";
import { PlicoDemo_g as PublicDemo } from "../../modules/demo-DE0jF2h1.jsx";
export { PlicoCore_u as Component } from "../../modules/demo-DE0jF2h1.jsx";
export { PlicoCore_u as OutreachBranches } from "../../modules/demo-DE0jF2h1.jsx";
const demoStyles =
  ".outreach-branches-demo{width:100%}.stage .outreach-branches-demo{width:min(100%,560px)}.card__preview .outreach-branches-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .outreach-branches-demo .ui-ob{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-outreach-branches" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as OutreachBranchesDemo };
export default Demo;
